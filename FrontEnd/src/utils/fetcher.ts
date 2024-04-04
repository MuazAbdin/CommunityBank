// const HOST = "http://localhost:3000";
const HOST = "https://communitybank.onrender.com";
const BASE_URL = `${HOST}/api/v1/`;

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
