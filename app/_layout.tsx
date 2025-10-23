import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter, useRootNavigationState, type Href } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import React from "react";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthGate>
            <RootLayoutNav />
          </AuthGate>
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const rootState = useRootNavigationState();

  useEffect(() => {
    console.log('[AuthGate] state', { isAuthenticated, loading, pathname, rootReady: !!rootState?.key });
    if (loading) return;
    if (!rootState?.key) return;

    const onLoginRoute = pathname === '/login';

    if (!isAuthenticated && !onLoginRoute) {
      router.replace('/login' as Href);
    } else if (isAuthenticated && onLoginRoute) {
      router.replace('/(tabs)' as Href);
    }
  }, [isAuthenticated, loading, pathname, router, rootState?.key]);

  return <>{children}</>;
}
