import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

function authReducer(state, action) {
  if (action.type === "LOGIN") {
    localStorage.setItem("user", JSON.stringify(action.payload));
    return { user: action.payload };
  }
  if (action.type === "LOGOUT") {
    localStorage.removeItem("user");
    return { user: null };
  }
  return state;
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}