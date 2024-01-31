"use client"
import axios from "axios";
import { createContext, useContext, useState } from "react";

type IUser = {
  userId: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: IUser | null;
  login: (username: string, password: string) => void;
  logout: () => void;
};

// create
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

//custom useContext
export const useAuth = () => {
  return useContext(AuthContext);
};

//provider ->
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {


    const [user, setUser] = useState<IUser | null>(null);




    // function login
    const login = async (username: string, password: string) => {
        try {
            const res = await axios.post(".../login", {username, password})

           
        } catch (error) {
            console.log(error)
        }
    }

    // function logout
    const logout = () => {

    }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
