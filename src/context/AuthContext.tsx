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

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuth , setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);


  const checkAuth = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/check-auth", { withCredentials: true });
      if(data.success === true){
        setIsAuth(data.user);
      }
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  const fetchUser = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/user", {
          withCredentials: true,
      });
      
      setUser(res.data.data);
  };

  useEffect(() => {
    checkAuth();
    fetchUser();
  }, []);


  const logout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/v1/logout", {}, { withCredentials: true });
      setUser(null); 
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };



  return (
    <AuthContext.Provider value={{ user, loading, setUser , logout , isAuth , fetchUser}}>
      {children}
    </AuthContext.Provider>
  );
};



