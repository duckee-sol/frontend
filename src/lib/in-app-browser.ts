export function closeInAppBrowser() {
  document.location = 'duckee://close';
  window.close(); // in case of deep link handling fails
}

export function returnToAppWithData(path: string, data: { [key: string]: any } = {}) {
  document.location = `duckee://${path}?data=${encodeURIComponent(JSON.stringify(data))}`;
}
