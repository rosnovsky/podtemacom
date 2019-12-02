import auth0 from "auth0-js"
import { user } from './store'

const isBrowser = typeof window !== "undefined"

const auth = isBrowser
    ? new auth0.WebAuth({
        domain: "rosnovsky.auth0.com",
        clientID: '56CVFXGTxGzffHxOxwGsQxoXQoirrgdC',
        redirectUri: 'http://localhost:5000',
        responseType: "token id_token",
        scope: "openid profile email",
        })
    : {}

const tokens = {
    accessToken: false,
    idToken: false,
    expiresAt: false,
}

let userPayload = {}

export const isAuthenticated = () => {
    if (!isBrowser) {
        return;
    }

    return localStorage.getItem("isLoggedIn") === "true"
}

export const login = async () => {
    if (!isBrowser) {
        return
    }
    console.log("Login", false)
    auth.authorize();
    
}

const setSession = (cb = () => {}) => (err, authResult) => {
    if (err) {
        cb()
        return
    }

    if (authResult && authResult.accessToken && authResult.idToken) {
        let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
        tokens.accessToken = authResult.accessToken
        tokens.idToken = authResult.idToken
        tokens.expiresAt = expiresAt
        userPayload = authResult.idTokenPayload;
        localStorage.setItem("isLoggedIn", true)
        localStorage.setItem("user", JSON.stringify(userPayload));
        user.set(userPayload)
        console.log("Authenticated", userPayload)
        cb()
    }
}

export const silentAuth = callback => {
    if (!isAuthenticated()) return callback()
    auth.checkSession({}, setSession(callback))
}

export const handleAuthentication = () => {
    if (!isBrowser) {
        return;
    }
    auth.parseHash(setSession())
}

export const getProfile = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null;
}

export const logout = () => {
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("user", null);
    user.set(null);
    auth.logout();
}
