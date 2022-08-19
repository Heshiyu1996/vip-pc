export function download (href: string, title: string) {
  const a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('download', title);
  a.click();
}

export const getParams = (key, url = window.location.href): string | { [key: string]: any } => {
  const query = url.split('?')[1] || '';
  const vars = query.split('&');
  const map = {};

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    const [k, v] = pair;
    map[k] = v;
  }

  if (!key) return map;
  return map[key];
}