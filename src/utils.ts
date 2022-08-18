export function downloadDataURL(dataURL: string, filename: string) {
  const a = document.createElement('a');
  a.download = filename;
  a.href = dataURL;
  a.click();
  a.remove();
}
