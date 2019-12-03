import 'whatwg-fetch';
export declare const isAuthenticated: () => boolean;
export declare const login: () => Promise<void>;
export declare const silentAuth: (callback: any) => any;
export declare const handleAuthentication: () => void;
export declare const getProfile: () => any;
export declare const logout: () => void;
export declare const updateDBUser: (user: any) => void;
