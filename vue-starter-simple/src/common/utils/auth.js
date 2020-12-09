import Cookies from 'js-cookie'

const TokenKey = 'userToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  debugger
  // Cookies.set(TokenKey, token, {expires:1000*1000,SameSite: 'none', Secure: false})
  Cookies.set(TokenKey, token, {expires:1000*1000})
  let tokenTemp = getToken();
  console.log(tokenTemp)
  return Cookies.set(TokenKey, token)

}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
