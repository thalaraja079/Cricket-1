/**
 * CricPulse Theme & Plugin Zip Downloader
 * Downloads pre-built, production-ready WordPress zip archives
 */

export async function downloadPluginZipFile(appUrl?: string): Promise<void> {
  try {
    const response = await fetch('/api/download/plugin');
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'cricpulse-plugin.zip';
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  } catch (err) {
    console.warn('Blob download failed, using direct anchor fallback:', err);
    const fallbackLink = document.createElement('a');
    fallbackLink.href = '/cricpulse-plugin.zip';
    fallbackLink.download = 'cricpulse-plugin.zip';
    fallbackLink.target = '_blank';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
  }
}

export async function downloadFlatThemeZipFile(appUrl?: string): Promise<void> {
  try {
    const response = await fetch('/api/download/theme');
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'cricpulse-theme-direct.zip';
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  } catch (err) {
    console.warn('Blob download failed, using direct anchor fallback:', err);
    const fallbackLink = document.createElement('a');
    fallbackLink.href = '/cricpulse-theme-flat.zip';
    fallbackLink.download = 'cricpulse-theme-direct.zip';
    fallbackLink.target = '_blank';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
  }
}

export async function downloadThemeZipFile(appUrl?: string): Promise<void> {
  return downloadFlatThemeZipFile(appUrl);
}
