#!/usr/bin/env python3
import os
import re
import json
import argparse
from pathlib import Path
from urllib.parse import urlparse, parse_qs, urlunparse
import requests
from bs4 import BeautifulSoup

GOOGLE_DOC_HOST = "docs.google.com"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; RodareSearchBot/1.0; +https://example.com)"
}

def is_google_doc_iframe(src: str) -> bool:
    if not src:
        return False
    try:
        u = urlparse(src)
        return (GOOGLE_DOC_HOST in u.netloc) and u.path.startswith("/document/")
    except Exception:
        return False

def build_gdoc_export_url(src: str) -> str | None:
    """
    Supports:
      - /document/d/<DOC_ID>/...  -> /document/d/<DOC_ID>/export?format=txt
      - /document/d/e/<EXPORT_ID>/pub?... -> same path but add ?output=txt
    """
    try:
        u = urlparse(src)
        path = u.path

        # Pattern A: /document/d/<DOC_ID>/*
        m = re.search(r"/document/d/([^/]+)/", path)
        if m and "/document/d/e/" not in path:
            doc_id = m.group(1)
            return f"https://{GOOGLE_DOC_HOST}/document/d/{doc_id}/export?format=txt"

        # Pattern B: /document/d/e/<EXPORT_ID>/pub
        if "/document/d/e/" in path:
            # Ensure it ends with /pub (or similar), then add output=txt
            # Keep original path, replace query with output=txt
            query = "output=txt"
            return urlunparse(("https", GOOGLE_DOC_HOST, path, "", query, ""))

        return None
    except Exception:
        return None

def fetch_gdoc_text(export_url: str, timeout=12) -> str:
    try:
        r = requests.get(export_url, headers=HEADERS, timeout=timeout)
        if r.status_code == 200 and r.text.strip():
            return r.text
        else:
            print(f"[WARN] Unable to fetch Google Doc text ({r.status_code}): {export_url}")
            return ""
    except Exception as e:
        print(f"[WARN] Error fetching Google Doc: {export_url} -> {e}")
        return ""

def extract_visible_text(el) -> str:
    # Remove unwanted tags
    for bad in el.find_all([
        "script", "style", "noscript", "code", "pre", "meta", "link"
    ]):
        bad.decompose()

    # Remove inline event handler attributes (onclick, onload, etc.)
    for tag in el.find_all(True):  # all tags
        atts = list(tag.attrs.keys())
        for a in atts:
            if a.lower().startswith("on"):  # onclick, onerror, etc.
                del tag[a]

    text = el.get_text(" ", strip=True)

    # Strip weird JS-like tokens that sometimes sneak through
    text = re.sub(r"[;{}()=<>]+", " ", text)
    text = re.sub(r"\b(function|var|let|const|return|if|else|new|document|window)\b", " ", text, flags=re.I)
    text = re.sub(r"\s+", " ", text)

    return text.strip()

def process_html_file(html_path: Path, site_root: Path) -> list[dict]:
    items = []
    html = html_path.read_text(encoding="utf-8", errors="ignore")
    soup = BeautifulSoup(html, "lxml")

    # Prefer per-post entries (div.post). If none, index the entire page.
    posts = soup.select(".post")
    if not posts:
        # Single entry for whole page
        title = (soup.title.string.strip() if soup.title and soup.title.string else html_path.stem)
        text = extract_visible_text(soup)
        gdoc_text = ""

        for iframe in soup.find_all("iframe"):
            src = iframe.get("src")
            if is_google_doc_iframe(src):
                export_url = build_gdoc_export_url(src)
                if export_url:
                    gdoc_text += "\n" + fetch_gdoc_text(export_url)

        rel_url = "/" + str(html_path.relative_to(site_root)).replace(os.sep, "/")
        items.append({
            "title": title,
            "url": rel_url,
            "text": (text + "\n" + gdoc_text).strip()
        })
        return items

    # Many posts on the same page
    for post in posts:
        # Title priority: h2 inside post -> page <title> -> filename
        h2 = post.find(["h1", "h2", "h3"])
        title = h2.get_text(" ", strip=True) if h2 else (soup.title.string.strip() if soup.title and soup.title.string else html_path.stem)

        text = extract_visible_text(post)
        gdoc_text = ""

        # Find embedded Google Docs just in this post
        for iframe in post.find_all("iframe"):
            src = iframe.get("src")
            if is_google_doc_iframe(src):
                export_url = build_gdoc_export_url(src)
                if export_url:
                    gdoc_text += "\n" + fetch_gdoc_text(export_url)

        rel_url = "/" + str(html_path.relative_to(site_root)).replace(os.sep, "/")
        items.append({
            "title": title,
            "url": rel_url,   # You could add an anchor if you add ids to each post
            "text": (text + "\n" + gdoc_text).strip()
        })

    return items

def main():
    ap = argparse.ArgumentParser(description="Generate search.json with Google Docs text included.")
    ap.add_argument("--root", default=".", help="Site root to scan (default: .)")
    ap.add_argument("--out", default="search.json", help="Output JSON path (default: search.json)")
    ap.add_argument("--include", nargs="*", default=[".html", ".htm"], help="File extensions to include")
    ap.add_argument("--exclude", nargs="*", default=["/node_modules/", "/.git/"], help="Folders to exclude (substring match)")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    all_items = []

    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if not any(str(path).lower().endswith(ext) for ext in args.include):
            continue
        pstr = str(path)
        if any(ex in pstr for ex in args.exclude):
            continue
        try:
            items = process_html_file(path, root)
            all_items.extend(items)
            print(f"[OK] {path} -> {len(items)} item(s)")
        except Exception as e:
            print(f"[ERROR] {path}: {e}")

    # Write JSON
    out_path = Path(args.out)
    out_path.write_text(json.dumps(all_items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nWrote {len(all_items)} records to {out_path}")

if __name__ == "__main__":
    main()
