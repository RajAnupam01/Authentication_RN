import { createContext, useState, useEffect } from "react";
import { getAccessToken } from "@/utils/storage";
import { getMyProfile } from "@/services/userService";
import { setAuthToken } from "@/services/api";


export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const initAuth = async () => {
    try {
      const token = await getAccessToken();
      console.log("Restored token:", token); // <-- check token
      if (!token) {
        setLoading(false);
        return;
      }

      setAuthToken(token);
      const response = await getMyProfile();
      console.log("Profile response:", response.data);
      setUser(response.data.data.user);
    } catch (err) {
      console.log("Auth restore error:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  initAuth();
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};