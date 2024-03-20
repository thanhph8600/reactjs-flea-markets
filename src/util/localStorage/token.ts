const setToken = ( key: string, value:string ) => {
    localStorage.setItem(key, value);
}
const getToken = ( key: string ) => {
    console.log(localStorage.getItem(key));
    
    return localStorage.getItem(key);
}
const removeToken = ( key: string ) => {
    localStorage.removeItem(key);
}
export { setToken, getToken, removeToken };