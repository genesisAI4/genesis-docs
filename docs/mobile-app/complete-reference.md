---
sidebar_position: 2
---

# Genesis Mobile - Documentation Complète

**Genesis Mobile** est l'application mobile React Native/Expo de Genesis AI, servant de cockpit de validation à distance avec synchronisation E2EE.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers TypeScript** | 150+ fichiers |
| **Composants React Native** | 80+ composants |
| **Modules Expo** | 40+ modules |
| **Tests E2E** | Detox |
| **Plateformes** | iOS, Android |

---

## 🏗️ Architecture

### Structure du Projet

```
genesis-mobile/
├── .expo/
├── .github/
├── assets/                       # Assets statiques
│   ├── fonts/
│   ├── images/
│   └── icons/
│
├── e2e/                          # Tests E2E (Detox)
│   ├── init.js
│   ├── config.json
│   └── tests/
│
├── node_modules/
├── src/
│   ├── __tests__/                # Tests unitaires
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── components/               # Composants React Native
│   │   ├── ui/                   # Composants de base
│   │   │   ├── Avatar.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── List.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Text.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── workflow/             # Composants Workflow
│   │   │   ├── WorkflowList.tsx
│   │   │   ├── WorkflowCard.tsx
│   │   │   ├── WorkflowDetail.tsx
│   │   │   ├── WorkflowActions.tsx
│   │   │   └── ExecutionStatus.tsx
│   │   │
│   │   ├── agent/                # Composants Agent
│   │   │   ├── AgentList.tsx
│   │   │   ├── AgentCard.tsx
│   │   │   ├── AgentStatus.tsx
│   │   │   └── AgentConfig.tsx
│   │   │
│   │   ├── validation/           # Composants de Validation
│   │   │   ├── ValidationRequest.tsx
│   │   │   ├── ValidationActions.tsx
│   │   │   ├── RiskIndicator.tsx
│   │   │   └── ApprovalDialog.tsx
│   │   │
│   │   ├── notifications/        # Composants Notifications
│   │   │   ├── NotificationList.tsx
│   │   │   ├── NotificationItem.tsx
│   │   │   └── PushNotification.tsx
│   │   │
│   │   └── common/               # Composants communs
│   │       ├── Header.tsx
│   │       ├── Loading.tsx
│   │       ├── Error.tsx
│   │       └── Empty.tsx
│   │
│   ├── dev/                      # Outils de développement
│   │   ├── DevMenu.tsx
│   │   └── mock-data/
│   │
│   ├── hooks/                    # Hooks React personnalisés
│   │   ├── useWorkflows.ts
│   │   ├── useAgents.ts
│   │   ├── useValidations.ts
│   │   ├── useNotifications.ts
│   │   ├── useSync.ts
│   │   ├── useBiometrics.ts
│   │   └── useAppState.ts
│   │
│   ├── navigation/               # Navigation (Expo Router)
│   │   ├── index.tsx
│   │   ├── _layout.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx         # Dashboard
│   │   │   ├── workflows.tsx
│   │   │   ├── agents.tsx
│   │   │   ├── notifications.tsx
│   │   │   └── settings.tsx
│   │   └── modal/
│   │       ├── validation.tsx
│   │       └── workflow-detail.tsx
│   │
│   ├── screens/                  # Écrans principaux
│   │   ├── Dashboard/
│   │   │   ├── index.tsx
│   │   │   └── components/
│   │   │
│   │   ├── Workflows/
│   │   │   ├── List.tsx
│   │   │   ├── Detail.tsx
│   │   │   └── Execution.tsx
│   │   │
│   │   ├── Agents/
│   │   │   ├── List.tsx
│   │   │   └── Detail.tsx
│   │   │
│   │   ├── Validations/
│   │   │   ├── Pending.tsx
│   │   │   ├── History.tsx
│   │   │   └── Review.tsx
│   │   │
│   │   └── Settings/
│   │       ├── index.tsx
│   │       ├── Account.tsx
│   │       ├── Security.tsx
│   │       └── About.tsx
│   │
│   ├── services/                 # Services API
│   │   ├── api.ts                # Client API
│   │   ├── nexus.ts              # Service Nexus
│   │   ├── sync.ts               # Service de sync
│   │   ├── auth.ts               # Service d'auth
│   │   ├── notifications.ts      # Service notifications
│   │   └── storage.ts            # Storage local
│   │
│   ├── store/                    # State Management (Zustand)
│   │   ├── index.ts
│   │   ├── workflow-store.ts
│   │   ├── agent-store.ts
│   │   ├── validation-store.ts
│   │   └── ui-store.ts
│   │
│   ├── theme/                    # Thème et styles
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   │
│   ├── types/                    # Types TypeScript
│   │   ├── workflow.ts
│   │   ├── agent.ts
│   │   ├── validation.ts
│   │   ├── api.ts
│   │   └── navigation.ts
│   │
│   ├── utils/                    # Utilitaires
│   │   ├── format.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   │
│   └── index.ts
│
├── .gitignore
├── app.json                      # Configuration Expo
├── App.tsx                       # Entry point
├── babel.config.js
├── eas.json                      # Configuration EAS Build
├── eslint.config.mjs
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📱 Navigation (Expo Router)

### Root Layout

```tsx
// src/navigation/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@react-navigation/native';
import { theme } from '@/theme';

export default function RootLayout() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="modal/validation"
            options={{
              presentation: 'modal',
              title: 'Validation Request',
            }}
          />
          <Stack.Screen
            name="modal/workflow-detail"
            options={{
              presentation: 'card',
              title: 'Workflow Details',
            }}
          />
        </Stack>
      </ThemeProvider>
    </>
  );
}
```

### Tabs Navigation

```tsx
// src/navigation/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#64748B',
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
        name="agents"
        options={{
          title: 'Agents',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="robot" size={size} color={color} />
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
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

---

## 🔐 Services

### API Client

```typescript
// src/services/api.ts
import { Constants } from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'https://api.genesisai.io';

interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

class ApiClient {
  private config: ApiConfig;
  private token: string | null = null;
  
  constructor(config: ApiConfig) {
    this.config = config;
  }
  
  setToken(token: string): void {
    this.token = token;
  }
  
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new ApiError(response.status, response.statusText);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(0, 'Network error');
    }
  }
  
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = new ApiClient({
  baseUrl: API_BASE_URL,
  timeout: 30000,
  retries: 3,
});
```

### Sync Service

```typescript
// src/services/sync.ts
import * as SecureStore from 'expo-secure-store';
import { api } from './api';

interface SyncState {
  lastSyncAt: number;
  workflows: string[];
  agents: string[];
  validations: string[];
}

class SyncService {
  private syncInterval = 5 * 60 * 1000; // 5 minutes
  private isSyncing = false;
  
  async initialize(): Promise<void> {
    // Démarrer la sync automatique
    this.startAutoSync();
  }
  
  private async startAutoSync(): Promise<void> {
    setInterval(() => {
      this.sync();
    }, this.syncInterval);
  }
  
  async sync(): Promise<void> {
    if (this.isSyncing) {
      return;
    }
    
    this.isSyncing = true;
    
    try {
      // Récupérer l'état local
      const localState = await this.getLocalState();
      
      // Pull depuis le serveur
      const remoteState = await api.get<SyncState>('/sync/pull', {
        params: { since: localState.lastSyncAt },
      });
      
      // Fusionner les états
      await this.mergeStates(localState, remoteState);
      
      // Mettre à jour l'état local
      await this.saveLocalState({
        ...remoteState,
        lastSyncAt: Date.now(),
      });
      
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      this.isSyncing = false;
    }
  }
  
  private async getLocalState(): Promise<SyncState> {
    const state = await SecureStore.getItemAsync('sync_state');
    return state ? JSON.parse(state) : {
      lastSyncAt: 0,
      workflows: [],
      agents: [],
      validations: [],
    };
  }
  
  private async saveLocalState(state: SyncState): Promise<void> {
    await SecureStore.setItemAsync('sync_state', JSON.stringify(state));
  }
  
  private async mergeStates(local: SyncState, remote: SyncState): Promise<void> {
    // Implémenter la logique de fusion CRDT
    // ...
  }
}

export const syncService = new SyncService();
```

---

## 📦 Configuration

### app.json

```json
{
  "expo": {
    "name": "Genesis AI",
    "slug": "genesis-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0F172A"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "ai.genesis.mobile",
      "buildNumber": "1",
      "infoPlist": {
        "NSFaceIDUsageDescription": "Genesis AI needs Face ID for secure authentication",
        "NSCameraUsageDescription": "Genesis AI needs camera for QR code scanning"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0F172A"
      },
      "package": "ai.genesis.mobile",
      "versionCode": 1,
      "permissions": [
        "USE_BIOMETRIC",
        "CAMERA",
        "VIBRATE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      "expo-local-authentication"
    ],
    "extra": {
      "apiUrl": "https://api.genesisai.io",
      "nexusUrl": "wss://nexus.genesisai.io/ws"
    },
    "scheme": "genesis",
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/xxx"
    }
  }
}
```

### eas.json

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id",
        "ascAppId": "your-app-store-id"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

### package.json

```json
{
  "name": "genesis-mobile",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "test:e2e": "detox test",
    "lint": "eslint ."
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/native": "^6.1.0",
    "expo": "~50.0.0",
    "expo-constants": "~15.4.0",
    "expo-dev-client": "~3.3.0",
    "expo-linking": "~6.2.0",
    "expo-local-authentication": "~13.8.0",
    "expo-secure-store": "~12.8.0",
    "expo-splash-screen": "~0.26.0",
    "expo-status-bar": "~1.11.0",
    "expo-system-ui": "~2.9.0",
    "expo-updates": "~0.24.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0",
    "expo-router": "~3.4.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.0",
    "detox": "^20.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "typescript": "^5.1.0"
  }
}
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
