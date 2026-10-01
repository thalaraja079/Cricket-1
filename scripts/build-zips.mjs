import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function zipDirectory(sourceDir, zipFilePath, rootFolderName) {
  const zip = new JSZip();

  function addFolderToZip(folderPath, currentZipFolder) {
    const items = fs.readdirSync(folderPath);
    for (const item of items) {
      const fullPath = path.join(folderPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subZip = currentZipFolder.folder(item);
        addFolderToZip(fullPath, subZip);
      } else {
        const content = fs.readFileSync(fullPath);
        currentZipFolder.file(item, content);
      }
    }
  }

  const rootZip = rootFolderName ? zip.folder(rootFolderName) : zip;
  addFolderToZip(sourceDir, rootZip);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const targetDir = path.dirname(zipFilePath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(zipFilePath, buffer);
  console.log(`Created zip: ${zipFilePath} (${buffer.length} bytes)`);
}

async function main() {
  console.log('Building WordPress packages...');
  
  // 1. Build Theme Zip
  await zipDirectory('./cricpulse-theme', './public/cricpulse-theme.zip', 'cricpulse-theme');

  // 2. Build Plugin Zip
  await zipDirectory('./wordpress-plugin', './public/cricpulse-plugin.zip', 'cricpulse-live-score');

  console.log('WordPress ZIP packages built successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
