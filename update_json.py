import json
import os

file_path = os.path.join(os.getcwd(), 'data', 'services.json')

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        if item.get('category') == 'Product Catalog':
            if item['id'] in [19, 20, 21, 22]:
                item['type'] = 'Website Templates'
            elif item['id'] in [23, 24, 25]:
                item['type'] = 'Marketing Tools'

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print("Successfully updated services.json")
else:
    print(f"Error: {file_path} not found")
