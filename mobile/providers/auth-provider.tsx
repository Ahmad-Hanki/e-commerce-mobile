import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  authChecked: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authChecked: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true); // auth state resolved
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, authChecked }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
