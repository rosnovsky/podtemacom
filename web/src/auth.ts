import auth0, { Auth0Callback } from "auth0-js"
import { user } from './store'
import 'whatwg-fetch';


const isBrowser = typeof window !== "undefined"

const auth: auth0.WebAuth = isBrowser
    ? new auth0.WebAuth({
        domain: "auth.rosnovsky.us",
        clientID: 'QsLVr41I83f70GtVMWfC1M8WMgP4yDio',
        redirectUri: 'https://web.rosnovsky.now.sh',
        responseType: "token id_token",
        scope: "openid profile email",
        })
    : null;

const tokens = {
    accessToken: null,
    idToken: null,
    expiresAt: 0,
}

let userPayload: Object = {}

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
    auth.authorize();
    
}

const setSession =  (cb = () => {}) => async (err, authResult) => {
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
        localStorage.setItem("isLoggedIn", 'true')
        localStorage.setItem("user", JSON.stringify(userPayload));
        const url = '/api/test';
        try {
            const response = await window.fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(userPayload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response
        } catch (error) {
            console.error('Error:', error);
        }
        user.set(userPayload);
        window.location.href = '/'
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
    if(user === 'null'){
        return null;
    }else{
        return JSON.parse(user);
    }

}

export const logout = () => {
    localStorage.setItem("isLoggedIn", null);
    localStorage.setItem("user", null);
    user.set(null);
    auth.logout({returnTo: 'https://web.rosnovsky.now.sh'});
}

export const updateDBUser = (user) => {
    console.log(user)
    
}
