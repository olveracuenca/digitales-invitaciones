import re

with open('templates/editor.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

with open('static/app.js', 'r', encoding='utf-8', errors='ignore') as f:
    js = f.read()

ids_in_js = re.findall(r"getElementById\('([^']+)'\)", js)

for el_id in set(ids_in_js):
    count = html.count(f'id="{el_id}"')
    if count == 0:
        print(f'Missing: {el_id}')
    elif count > 1:
        print(f'Duplicate ({count}): {el_id}')
