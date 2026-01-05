"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

// ایجاد Context خالی
interface AuthContextType {
  user: any;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  logout: () => Promise<void>;
  isAuth: boolean;
  fetchUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuth , setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);


  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/v1/check-auth", { withCredentials: true });
      if(data.success){
        setIsAuth(true);
        await fetchUser();
      }else{
        setIsAuth(false);
        setUser(null);
      }
    } catch {
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/v1/user", {
          withCredentials: true,
      });
      
      setUser(res.data.data);
    } catch (error: any) {
      console.error("fetchUser error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      setUser(null);
    }
  };


  const logout = async () => {
    try {
      await axios.post("/api/v1/logout", {}, { withCredentials: true });
      setUser(null); 
      setIsAuth(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  
  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ user, loading, setUser , logout , isAuth , fetchUser}}>
      {children}
    </AuthContext.Provider>
  );
};



