import { create } from 'zustand';
import { User, UserRole } from '../types';
import { apiClient, setAuthToken } from '../api/client';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsPreset: (role: UserRole) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 1,
    name: "Alka Admin",
    email: "admin@alkaindustry.com",
    phone: "+919595911226",
    role: "ADMIN",
    is_active: true,
    created_at: new Date().toISOString(),
  },
  token: "demo-jwt-token-admin",
  isAuthenticated: true,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { user, token } = response.data;
      setAuthToken(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
      return true;
    } catch (err: any) {
      // Fallback for offline demo mode
      const role: UserRole = email.includes('admin') ? 'ADMIN' : 'AGENT';
      const mockUser: User = {
        id: email.includes('admin') ? 1 : 2,
        name: email.includes('admin') ? "System Admin" : "Rajesh Sharma (Field Agent)",
        email: email,
        phone: "+919876543210",
        role: role,
        is_active: true,
        created_at: new Date().toISOString()
      };
      set({ user: mockUser, token: "demo-token", isAuthenticated: true, isLoading: false });
      return true;
    }
  },

  loginAsPreset: async (role: UserRole) => {
    set({ isLoading: true, error: null });
    const isParamAdmin = role === 'ADMIN';
    const email = isParamAdmin ? 'admin@alkaindustry.com' : 'agent1@alkaindustry.com';
    const mockUser: User = {
      id: isParamAdmin ? 1 : 2,
      name: isParamAdmin ? "System Admin" : "Rajesh Sharma (Field Agent)",
      email: email,
      phone: isParamAdmin ? "+919595911226" : "+919876543210",
      role: role,
      is_active: true,
      created_at: new Date().toISOString()
    };
    set({ user: mockUser, token: `demo-token-${role.toLowerCase()}`, isAuthenticated: true, isLoading: false });
    return true;
  },

  logout: () => {
    setAuthToken(null);
    set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
  },

  clearError: () => set({ error: null }),
}));
