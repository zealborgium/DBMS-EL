import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import api from "/DBMS-EL/BackendDBMS/src/utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

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
  signup: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
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
        if (!decoded.email || typeof decoded.email !== "string") {
          throw new Error("Invalid token format");
        }
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

      // ✅ Ensure response contains correct user data
      if (!res.data || !res.data.token || !res.data.user) {
        throw new Error("Invalid response from server");
      }

      const { token, user } = res.data;

      // ✅ Validate user object structure
      if (!user.email || typeof user.email !== "string") {
        throw new Error("Invalid user data: Email must be a string");
      }

      // ✅ Store JWT token
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // ✅ Ensure setUser receives a valid object
      setUser({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      });

      console.log("✅ User logged in:", user);
    } catch (error) {
      console.error("❌ Login failed:", error);
    }
  };

  // ✅ Signup function
  const signup = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });
      console.log("Signup response:", res.data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated: !!user }}
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

// ✅ Correctly Export `AuthContext`
export { AuthContext };
