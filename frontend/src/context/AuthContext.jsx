import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearAuth,
  fetchCurrentUser,
  getStoredAuth,
  login as loginRequest,
  logoutApi,
  saveAuth,
  signup as signupRequest,
  updateProfile as updateProfileRequest,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    if (!stored?.token) {
      setLoading(false);
      return;
    }

    setToken(stored.token);
    setUser(stored.user);

    fetchCurrentUser()
      .then(({ user: freshUser }) => {
        setUser(freshUser);
        saveAuth({ token: stored.token, user: freshUser });
      })
      .catch(() => {
        clearAuth();
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginRequest(email, password);
    saveAuth(data);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const signup = useCallback(async (name, email, password, profile) => {
    const data = await signupRequest(name, email, password, profile);
    saveAuth(data);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const updateProfile = useCallback(async (profile) => {
    const data = await updateProfileRequest(profile);
    const stored = getStoredAuth();
    if (stored?.token) saveAuth({ token: stored.token, user: data.user });
    setUser(data.user);
    return data.user;
  }, []);

  const refreshUser = useCallback(async () => {
    const data = await fetchCurrentUser();
    const stored = getStoredAuth();
    if (stored?.token) saveAuth({ token: stored.token, user: data.user });
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      signup,
      updateProfile,
      refreshUser,
      logout,
    }),
    [user, token, loading, login, signup, updateProfile, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
