import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storeUserLoggedInInfo = localStorage.getItem('isLoggedIn');
        if (storeUserLoggedInInfo) setIsLoggedIn(true);
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn', true);
        setIsLoggedIn(false);
    };

    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;