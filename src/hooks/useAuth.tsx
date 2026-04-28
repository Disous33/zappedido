import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { LoginPayload, RegisterPayload, User } from "../types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  register: (payload: RegisterPayload) => User;
  login: (payload: LoginPayload) => User;
  logout: () => void;
  recoverPassword: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sync = () => setUser(authService.getCurrentUser());
    window.addEventListener("zappedido:auth-change", sync);
    return () => window.removeEventListener("zappedido:auth-change", sync);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      register: (payload) => {
        setLoading(true);
        try {
          const nextUser = authService.register(payload);
          setUser(nextUser);
          return nextUser;
        } finally {
          setLoading(false);
        }
      },
      login: (payload) => {
        setLoading(true);
        try {
          const nextUser = authService.login(payload);
          setUser(nextUser);
          return nextUser;
        } finally {
          setLoading(false);
        }
      },
      logout: () => {
        authService.logout();
        setUser(null);
      },
      recoverPassword: authService.recoverPassword,
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
};
