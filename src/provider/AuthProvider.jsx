import { createContext, useReducer } from "react"
import { authReducer, initState } from "../reducers/AuthReducer"

const defaultValueType = {
    state: initState,
    dispatch: () => null
}

export const AuthContext = createContext(defaultValueType)

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initState)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider