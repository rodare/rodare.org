import os
import json
from bs4 import BeautifulSoup

# SETTINGS
ROOT_DIR = "."  # Folder to scan
OUTPUT_FILE = "search.json"
EXCLUDED_FILES = {"search.html", "search.json"}  # Add more if needed

def get_html_files(root_dir):
    """Return list of HTML file paths excluding unwanted files."""
    html_files = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(".html") and filename not in EXCLUDED_FILES:
                html_files.append(os.path.join(dirpath, filename))
    return html_files

def extract_text_from_html(file_path):
    """Extract title, visible text, and URL from an HTML file."""
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        soup = BeautifulSoup(f, "html.parser")

    # Remove unwanted tags (menus, scripts, etc.)
    for tag in soup(["script", "style", "noscript", "iframe", "header", "footer", "nav"]):
        tag.extract()

    title = soup.title.string.strip() if soup.title else os.path.basename(file_path)
    text = " ".join(soup.stripped_strings)

    # Make a relative URL
    rel_url = os.path.relpath(file_path, ROOT_DIR).replace("\\", "/")

    return {
        "title": title,
        "text": text,
        "url": rel_url
    }

def main():
    files = get_html_files(ROOT_DIR)
    print(f"Found {len(files)} HTML files to index.")

    search_data = [extract_text_from_html(file) for file in files]

    with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
        json.dump(search_data, out, ensure_ascii=False, indent=2)

    print(f"Search index created: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
