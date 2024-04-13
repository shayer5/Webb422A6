import {jwtDecode} from "jwt-decode";

function setToken(token) {
  localStorage.setItem("access_token", token)
}

export function getToken() {
  try {
    return localStorage.getItem("access_token")
  } catch (err) {
    return null
  }
}

export function removeToken() {
  localStorage.removeItem("access_token")
}

export function readToken() {
    try {
      const token = getToken();
      return token ? jwtDecode(token) : null;
    } catch (err) {
      return null;
    }
  }

export function isAuthenticated() {
  const token = readToken()
  return token ? true : false
}

export async function authenticateUser(user, password) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password }),
        headers: {
            'content-type': 'application/json',
        }
    });
    const data = await response.json();
    if (response.status === 200) {
        setToken(data.token);
        return true;
    } else {
        throw new Error(data.message);
    }
}

export async function registerUser(user, password, password2) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ userName: user, password, password2 })
    });

    const data = await response.json();

    if (response.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
}
