const API_URL = "http://localhost:8000/api/";
let accessToken = localStorage.getItem("accessToken");

export function setAccessToken(token: string) {
    accessToken = token;
    localStorage.setItem("accessToken", token);
}

export function clearToken() {
    accessToken = null;
    localStorage.removeItem("accessToken");
}

export async function api(endpoint: string, options: RequestInit = {}) {
    const headers: any = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const res = await fetch(API_URL + endpoint, {
        ...options,
        headers
    });

    return res.json();
}
