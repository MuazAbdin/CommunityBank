const BASE_URL = "http://localhost:3000/api";

export function fetcher(URL: string, options?: any) {
  return fetch(`${BASE_URL}${URL}`, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
