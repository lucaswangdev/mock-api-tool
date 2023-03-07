const tokenKeyName = "Authorization";

export const setToken = (token: string) => {
  localStorage.setItem(tokenKeyName, 'Bearer ' + token)
}

export const getToken = () => {
  return localStorage.getItem(tokenKeyName)
}

export const removeToken = () => {
  localStorage.removeItem(tokenKeyName)
}