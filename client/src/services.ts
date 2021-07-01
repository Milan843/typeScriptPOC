export const setLocalStorage = (key: string, payload: any) => {
    localStorage.setItem(key, payload)
}

export const getFromLocalStorage = (key: string) => {
    return localStorage.getItem(key)
}

export const checkAuth = () => {
    const token:string = getFromLocalStorage("token")!;
    return token;
}