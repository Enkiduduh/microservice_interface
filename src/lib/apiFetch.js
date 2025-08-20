export async function apiFetch(url, opts = {}) {
  const res = await fetch(url, { credentials: "include", ...opts });
  if (res.status === 401) window.location.assign("/connexion");
  if (res.status === 404) window.location.assign("/404"); 
  if (res.status >= 500) window.location.assign("/oops");
  return res;
}
