import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';
import createContextHook from '@nkzw/create-context-hook';

export type AuthUser = { username: string };

export type AuthContextType = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const [AuthProvider, useAuth] = createContextHook<AuthContextType>(() => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback(async (username: string, password: string) => {
    console.log('[Auth] Attempting login', { usernameLen: username.length });
    if (!username || !password) {
      Alert.alert('Missing credentials', 'Please enter both username and password.');
      return;
    }
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 400));
      setUser({ username });
      console.log('[Auth] Login success');
    } catch (e) {
      console.error('[Auth] Login error', e);
      Alert.alert('Login failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    console.log('[Auth] Logout');
    setUser(null);
  }, []);

  return useMemo(
    () => ({
      isAuthenticated: !!user,
      user,
      loading,
      login,
      logout,
    }),
    [user, loading, login, logout]
  );
});
