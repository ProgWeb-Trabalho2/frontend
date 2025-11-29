const API_URL = "http://localhost:8000/api";
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
    const headers: Record<string, string> = {};

    if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
            headers[key] = value;
        });
    } else if (typeof options.headers === "object" && options.headers !== null) {
        Object.assign(headers, options.headers as Record<string, string>);
    }

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const res = await fetch(API_URL + endpoint, {
        ...options,
        headers
    });

    if (res.status === 401) {
        clearToken();
        window.location.href = "login.html";
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const text = await res.text();
        console.error("API Error:", text);
        throw new Error(`HTTP ${res.status}`);
    }

    try {
        return await res.json();
    } catch {
        return null;
    }
}
