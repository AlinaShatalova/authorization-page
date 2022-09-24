// and this is context managment component
import React, { useState, useEffect } from 'react';

// default context object
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

// and this is an exported component (only provider not object)
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

// and as a default we export context object
export default AuthContext;