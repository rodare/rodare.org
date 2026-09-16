from bs4 import BeautifulSoup
import os
import json

index = []

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
        except UnicodeDecodeError:
            with open(filename, 'r', encoding='latin-1') as f:
                content = f.read()

        soup = BeautifulSoup(content, 'html.parser')
        text = soup.get_text(separator=' ', strip=True)

        print(f"File: {filename}")
        print(f"Text snippet: {text[:200]}")
        print('-' * 40)

        index.append({
            'title': soup.title.string if soup.title else filename,
            'url': filename,
            'text': text
        })

with open('search.json', 'w', encoding='utf-8') as f:
    json.dump(index, f, ensure_ascii=False, indent=2)
