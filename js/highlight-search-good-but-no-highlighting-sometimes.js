// Immediately-invoked function expression (IIFE) for scope encapsulation.
(function() {

  // Global variable to store search index data.
  let searchIndex = [];

  /**
   * Removes diacritics (accents) from a string.
   * @param {string} s The input string.
   * @returns {string} The string with diacritics removed.
   */
  function removeDiacritics(s) {
    return s && s.normalize ? s.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : (s || '');
  }

  /**
   * Finds the normalized index of a term within an original string.
   * @param {string} original The original string.
   * @param {string} term The term to search for.
   * @returns {{start: number, end: number}|null} An object with start and end indices, or null if not found.
   */
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

  /**
   * Attempts to highlight a term within a single text node.
   * @param {Text} textNode The text node to process.
   * @param {string} term The term to highlight.
   * @returns {HTMLElement|null} The created <mark> element if successful, otherwise null.
   */
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

  /**
   * Finds and highlights the first occurrence of a term within a container.
   * @param {HTMLElement} container The root element to search within.
   * @param {string} term The term to search and highlight.
   * @returns {HTMLElement|null} The first <mark> element created, or null if no match.
   */
  function highlightFirstMatch(container, term) {
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          let el = node.parentElement;
          const forbidden = ['SCRIPT', 'STYLE', 'IFRAME', 'NOSCRIPT', 'INPUT', 'TEXTAREA'];
          while (el) {
            if (forbidden.includes(el.tagName)) return NodeFilter.FILTER_REJECT;
            el = el.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    let node;
    while ((node = walker.nextNode())) {
      const mark = tryHighlightInTextNode(node, term);
      if (mark) return mark;
    }
    return null;
  }

  /**
   * Highlights a given HTML element's text content with a <mark> tag.
   * This is a utility for highlighting titles and snippets without disrupting the DOM structure.
   * @param {string} text The text content to process.
   * @param {string} term The term to highlight.
   * @returns {string} The text with the term wrapped in <mark> tags.
   */
  function highlightText(text, term) {
    if (!text || !term) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Checks if a post contains a Google Docs iframe.
   * @param {HTMLElement} postEl The post element to check.
   * @returns {boolean} True if the post contains a Google Docs iframe, false otherwise.
   */
  function isInsideGoogleDocsIframe(postEl) {
    return postEl.querySelector("iframe[src*='docs.google.com']") !== null;
  }

  // --- Main Logic ---

  // Fetches search.json once the script loads to populate the search index.
  fetch('search.json')
    .then(response => response.json())
    .then(data => { searchIndex = data; })
    .catch(error => console.error('Error fetching search index:', error));

  // Event listener for the search input box.
  document.getElementById('searchBox').addEventListener('input', function() {
    const query = this.value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!query) return;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const results = searchIndex.filter(item =>
      regex.test(item.title) || regex.test(item.text)
    );
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    results.forEach(result => {
      const textLower = result.text.toLowerCase();
      const queryLower = query.toLowerCase();
      const matchIndex = textLower.indexOf(queryLower);
      let snippet = matchIndex !== -1
        ? result.text.substring(Math.max(0, matchIndex - 50), Math.min(result.text.length, matchIndex + query.length + 50))
        : result.text.substring(0, 100);

      const highlightedSnippet = highlightText(snippet, query);
      const highlightedTitle = highlightText(result.title, query);

      const div = document.createElement('div');
      div.innerHTML = `
        <h3><a href="${result.url}?highlight=${encodeURIComponent(query)}">${highlightedTitle}</a></h3>
        <p>...${highlightedSnippet}...</p>
      `;
      resultsDiv.appendChild(div);
    });
  });

  // Event listener for when the entire window content has loaded.
  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const highlightTerm = params.get("highlight");

    if (highlightTerm) {
      console.log("Highlight term found in URL:", highlightTerm);
      const posts = document.querySelectorAll(".post");
      
      for (const post of posts) {
        console.log("Checking post:", post);
        // Attempt to highlight the first match within the current post.
        const mark = highlightFirstMatch(post, highlightTerm);

        if (mark) {
          console.log("Match found! The <mark> element is:", mark);
          const moreContent = post.querySelector(".more");
          if (moreContent && window.getComputedStyle(moreContent).display === "none") {
            const readMoreButton = post.querySelector('.read');
            if (readMoreButton) {
              console.log("Expanding 'read more' section...");
              readMoreButton.click();
            }
          }
          
          if (isInsideGoogleDocsIframe(post)) {
            console.log("Match is inside a Google Docs iframe. Scrolling to iframe and highlighting h2.");
            const h2 = post.querySelector("h2");
            const iframe = post.querySelector("iframe[src*='docs.google.com']");
            if (h2) {
              // Note: highlightElement highlights the content by modifying the DOM.
              highlightElement(h2, highlightTerm);
              console.log("Highlighted the h2 tag:", h2);
            }
            if (iframe) {
              iframe.scrollIntoView({ behavior: "smooth", block: "center" });
              console.log("Scrolled to the iframe element:", iframe);
            }
            break;
          } else {
            console.log("Match is not in a Google Docs iframe. Scrolling to the <mark> element.");
            mark.scrollIntoView({ behavior: "smooth", block: "center" });
            break;
          }
        }
      }
    }
  });

})();