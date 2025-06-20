from bs4 import BeautifulSoup
import json

with open('parks.html', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'lxml')
table = soup.find('table', {'class': 'wikitable'})
parks = []
rows = table.find_all('tr')[1:]

for row in rows:
    cols = row.find_all(['td', 'th'])
    if len(cols) < 2:
        continue
    name = cols[0].get_text(strip=True)
    img = cols[1].find('img')
    img_url = 'https:' + img['src'] if img else None
    desc = cols[-1].get_text(strip=True)
    parks.append({'name': name, 'image': img_url, 'summary': desc})

with open('parks.json', 'w', encoding='utf-8') as f:
    json.dump(parks, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(parks)} parks.") 