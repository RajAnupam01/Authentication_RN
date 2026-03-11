import { getCachedUser } from "@/utils/storage";
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const storedUser = await getCachedUser();

      if (storedUser) {
        setUser(storedUser);
      }

      setLoading(false);
    };

    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};