/*
  highlight-search.js (final version)
  - Keeps live search working
  - On ?highlight=...:
      * Expands .more in the right post
      * Highlights ALL visible matches, scrolls to the first one
      * If only Google Docs iframe → just scrolls to <h2>
  - Skips forbidden tags like script/style/code/pre
*/

/* ==== Utilities ==== */
function removeDiacritics(s) {
  return s && s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : (s || '');
}
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function slugify(text) {
  return removeDiacritics(String(text || ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function pulse(mark) {
  if (!mark) return;
  mark.style.transition = 'background-color 0.6s';
  mark.style.backgroundColor = '#ffeb79';
  setTimeout(() => { mark.style.backgroundColor = ''; }, 1400);
}
function scrollToCentered(el) {
  if (!el) return;
  try {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch {}
}
function ensurePostIds() {
  document.querySelectorAll('.post').forEach(post => {
    const h2 = post.querySelector('h2');
    if (h2) {
      const slug = 'post-' + slugify(h2.textContent || '');
      if (!post.id) post.id = slug;
    }
  });
}
function expandIfHidden(moreEl) {
  if (!moreEl) return Promise.resolve();
  const comp = window.getComputedStyle(moreEl);
  if (comp.display !== 'none' && comp.visibility !== 'hidden') return Promise.resolve();
  const post = moreEl.closest('.post');
  if (!post) { moreEl.style.display = 'block'; return Promise.resolve(); }
  const readBtn = post.querySelector('.read');
  if (readBtn) try { readBtn.click(); } catch {}
  return new Promise(resolve => setTimeout(resolve, 220));
}
async function expandPost(post) {
  if (!post) return;
  const more = post.querySelector('.more');
  await expandIfHidden(more);
}
function postContainsGDoc(post) {
  return !!post && !!post.querySelector("iframe[src*='docs.google.com']");
}

/* ==== Highlighting ==== */
function findNormalizedIndexInOriginal(original, term) {
  const mapping = [];
  const normalizedChars = [];
  for (let i = 0; i < original.length; i++) {
    const origChar = original[i];
    const norm = removeDiacritics(origChar) || origChar;
    for (let j = 0; j < norm.length; j++) {
      normalizedChars.push(norm[j]);
      mapping.push(i);
    }
  }
  const normalized = normalizedChars.join('').toLowerCase();
  const normalizedTerm = removeDiacritics(term).toLowerCase();
  const pos = normalized.indexOf(normalizedTerm);
  if (pos === -1) return null;
  const startOrig = mapping[pos];
  const endOrig = mapping[pos + normalizedTerm.length - 1] + 1;
  return { start: startOrig, end: endOrig };
}
function tryHighlightInTextNode(textNode, term) {
  const original = textNode.nodeValue;
  if (!original || !original.trim()) return null;
  const found = findNormalizedIndexInOriginal(original, term);
  if (!found) return null;
  const before = document.createTextNode(original.slice(0, found.start));
  const mark = document.createElement('mark');
  mark.textContent = original.slice(found.start, found.end);
  const after = document.createTextNode(original.slice(found.end));
  const parent = textNode.parentNode;
  parent.replaceChild(after, textNode);
  parent.insertBefore(mark, after);
  parent.insertBefore(before, mark);
  return mark;
}
function highlightAllMatches(container, term) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      let el = node.parentElement;
      const forbidden = ["SCRIPT","STYLE","IFRAME","NOSCRIPT","INPUT","TEXTAREA","CODE","PRE"];
      while (el) {
        if (forbidden.includes(el.tagName)) return NodeFilter.FILTER_REJECT;
        el = el.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node, firstMark = null;
  while ((node = walker.nextNode())) {
    const mark = tryHighlightInTextNode(node, term);
    if (mark && !firstMark) firstMark = mark; // keep first match for scrolling
  }
  return firstMark;
}


/* ==== Live search ==== */
let searchIndex = [];
document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const resultsDiv = document.getElementById('results');
  if (searchBox && resultsDiv) {
    fetch('search.json').then(r => r.json()).then(data => { searchIndex = data || []; });
    searchBox.addEventListener('input', function () {
      const query = this.value.trim();
      resultsDiv.innerHTML = '';
      if (!query) return;
      const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
      const results = searchIndex.filter(item =>
        regex.test(item.title) || regex.test(item.text)
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      results.forEach(result => {
        const textLower = (result.text || '').toLowerCase();
        const queryLower = query.toLowerCase();
        const matchIndex = textLower.indexOf(queryLower);
        let snippet = matchIndex !== -1
          ? result.text.substring(Math.max(0, matchIndex - 50), Math.min(result.text.length, matchIndex + query.length + 50))
          : (result.text || '').substring(0, 100);
        const highlightedSnippet = snippet.replace(regex, '<mark>$1</mark>');
        const highlightedTitle = (result.title || '').replace(regex, '<mark>$1</mark>');
        const anchor = '#post-' + slugify(result.title || '');
        const href = `${result.url}?highlight=${encodeURIComponent(query)}${anchor}`;
        const div = document.createElement('div');
        div.innerHTML = `
          <h3><a href="${href}">${highlightedTitle}</a></h3>
          <p>...${highlightedSnippet}...</p>
        `;
        resultsDiv.appendChild(div);
      });
    });
  }
});

/* ==== Highlight on page load ==== */
window.addEventListener('load', async () => {
  ensurePostIds();
  const params = new URLSearchParams(window.location.search);
  const term = params.get('highlight');
  if (!term) return;

  let target = null;
  if (location.hash) {
    const id = location.hash.replace(/^#/, '');
    target = document.getElementById(id);
    if (target && !target.classList.contains('post')) target = target.closest('.post');
  }
  const posts = Array.from(document.querySelectorAll('.post'));
  if (!target) target = posts[0];

  if (target) {
    await expandPost(target);
  const mark = highlightAllMatches(target, term);
  if (mark) {
    scrollToCentered(mark);
    pulse(mark);
    return;
  }

    if (postContainsGDoc(target)) {
      const h2 = target.querySelector('h2');
      if (h2) scrollToCentered(h2); // just scroll, no fake mark
      return;
    }
  }
});
