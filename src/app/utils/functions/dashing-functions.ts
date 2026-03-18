export function deDash(urlTitle: string): string {
  urlTitle = urlTitle.replaceAll('-', ' ');
  return urlTitle;
}

export function cleanAndDash(title: string): string {
  title = title.trim();
  title.toLowerCase();
  let urlTitle = title.replace(/[^a-zA-Z0-9\s]/g, '');
  urlTitle = title.replace(/\s+/g, '-');
  return urlTitle;
}
