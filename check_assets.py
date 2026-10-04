import os
import re

html_path = r'C:\Users\girdh\.gemini\antigravity\scratch\maheshwari-foods\index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

images = re.findall(r'src=["\'](images/[^"\']+)["\']', content)
base_dir = r'C:\Users\girdh\.gemini\antigravity\scratch\maheshwari-foods'

print(f"Checking {len(images)} images in index.html...")
all_ok = True
for img in sorted(list(set(images))):
    full_path = os.path.join(base_dir, img.replace('/', os.sep))
    exists = os.path.exists(full_path)
    size = os.path.getsize(full_path) if exists else 0
    print(f"[{'OK' if exists else 'MISSING'}] {img} ({size} bytes)")
    if not exists:
        all_ok = False

if all_ok:
    print("\nSUCCESS: All images exist and are loaded properly!")
else:
    print("\nWARNING: Some images were not found!")
