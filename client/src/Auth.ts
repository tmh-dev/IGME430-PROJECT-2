import { useCallback } from "react";

class Auth {
    authenticated: boolean;

    constructor() {
        this.authenticated = false;
    }

    login = (callback: Function): void => {
        this.authenticated = true;
        callback();
    }

    logout = (callback: Function): void => {
        this.authenticated = false;
        callback();
    }

    isAuthenticated = (): boolean => {
        return this.authenticated;
    }
}

export default new Auth();