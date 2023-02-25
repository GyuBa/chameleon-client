export function getToken() {
    return sessionStorage.getItem("token");
}

export function setToken(token: any) {
    sessionStorage.setItem("token", token);
}

export function removeToken() {
    sessionStorage.removeItem("token");
}