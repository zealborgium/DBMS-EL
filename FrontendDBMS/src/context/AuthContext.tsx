import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import api from "/DBMS-EL/BackendDBMS/src/utils/axiosInstance";
import jwtDecode from "jwt-decode"; // Install via `npm install jwt-decode`

// ✅ Define user roles
type UserRole = "author" | "reviewer" | "admin" | null;

// ✅ Define user structure
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// ✅ Define authentication context structure
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// ✅ Create authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Check if user is already logged in (Persistent Login)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  // ✅ Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // Store JWT token
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // ✅ Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
