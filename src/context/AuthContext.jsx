import {createContext} from "react";
export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    // hier komt de state voor de context-data

    return (
        <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;