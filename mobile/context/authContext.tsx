
import { LogoutUser } from "@/services/authApi";
import { getMyProfile } from "@/services/userApi";
import { getTokens } from "@/utils/storage";
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);


 const loadUser = async () => {
  try {
    const tokens = await getTokens();
    
    if (tokens.accessToken) {
      const profile = await getMyProfile();
      setUser(profile);
    }
  } catch (error) {
    console.log("LOAD USER ERROR:", error);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadUser();
  }, [])

  const logout = async () => {
    await LogoutUser(null)
    setUser(null);
  }


  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};