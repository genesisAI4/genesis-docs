---
sidebar_position: 3
---

# Mobile App - Navigation

Documentation du système de navigation Expo Router.

---

## 🗺️ Structure de navigation

```
src/navigation/
├── _layout.tsx           # Root layout
├── (tabs)/               # Tab navigation
│   ├── _layout.tsx
│   ├── index.tsx         # Dashboard
│   ├── workflows.tsx
│   ├── agents.tsx
│   ├── notifications.tsx
│   └── settings.tsx
└── modal/                # Modals
    ├── validation.tsx
    └── workflow-detail.tsx
```

---

## 📱 Root Layout

```tsx
// src/navigation/_layout.tsx
import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { theme } from '@/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal/validation"
          options={{
            presentation: 'modal',
            title: 'Validation Request',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
```

---

## 🔽 Tabs Navigation

```tsx
// src/navigation/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarStyle: {
          backgroundColor: '#1E293B',
          borderTopColor: '#334155',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workflows"
        options={{
          title: 'Workflows',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="git-network" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
          tabBarBadge: true,
        }}
      />
    </Tabs>
  );
}
```

---

## 🔗 Navigation Programmatique

```tsx
import { useRouter } from 'expo-router';

export function MyComponent() {
  const router = useRouter();
  
  // Naviguer vers un écran
  router.push('/workflows');
  
  // Avec params
  router.push(`/workflow/123?tab=details`);
  
  // Modal
  router.push('/modal/validation');
  
  // Retour
  router.back();
}
```

---

**Version :** 1.0.0
