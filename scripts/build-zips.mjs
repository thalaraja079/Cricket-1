import { execSync } from 'child_process';
import fs from 'fs';

console.log('Building WordPress packages with Python zipfile...');
try {
  execSync(`python3 -c "
import zipfile, os

def make_wp_zip(source_dir, out_zip, folder_name):
    os.makedirs(os.path.dirname(out_zip), exist_ok=True)
    with zipfile.ZipFile(out_zip, 'w', zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(source_dir):
            for file in sorted(files):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                archive_name = os.path.join(folder_name, rel_path) if folder_name else rel_path
                z_info = zipfile.ZipInfo(archive_name)
                z_info.external_attr = 0o644 << 16
                with open(full_path, 'rb') as f:
                    z.writestr(z_info, f.read())

make_wp_zip('cricpulse-theme', 'public/cricpulse-theme.zip', 'cricpulse-theme')
make_wp_zip('cricpulse-theme', 'public/cricpulse-theme-flat.zip', '')
make_wp_zip('cricpulse-theme', 'public/cricpulse-theme-direct.zip', '')
make_wp_zip('wordpress-plugin', 'public/cricpulse-plugin.zip', 'cricpulse-live-score')
print('Built standard WordPress zips!')
"`);
  console.log('WordPress ZIP packages built successfully!');
} catch (err) {
  console.error('Python zip failed:', err);
}
