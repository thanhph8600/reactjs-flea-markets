const setToken = ( key: string, value:string ) => {
    localStorage.setItem(key, value);
}
const getToken = ( key: string ) => {
    return localStorage.getItem(key);
}
const removeToken = ( key: string ) => {
    localStorage.removeItem(key);
}
export { setToken, getToken, removeToken };