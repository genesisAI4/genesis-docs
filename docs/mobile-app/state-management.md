---
sidebar_position: 5
---

# Mobile App - State Management

Documentation de la gestion d'état avec Zustand.

---

## 📦 Stores

### Workflow Store

```typescript
// src/store/workflow-store.ts
import { create } from 'zustand';

interface WorkflowState {
  workflows: Workflow[];
  selectedWorkflow: Workflow | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchWorkflows: () => Promise<void>;
  selectWorkflow: (id: string) => void;
  executeWorkflow: (id: string, input?: any) => Promise<void>;
  clearError: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflows: [],
  selectedWorkflow: null,
  loading: false,
  error: null,
  
  fetchWorkflows: async () => {
    set({ loading: true });
    try {
      const workflows = await api.getWorkflows();
      set({ workflows, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  selectWorkflow: (id) => {
    const workflow = get().workflows.find(w => w.id === id);
    set({ selectedWorkflow: workflow || null });
  },
  
  executeWorkflow: async (id, input) => {
    const result = await api.executeWorkflow(id, input);
    set(state => ({
      workflows: state.workflows.map(w =>
        w.id === id ? { ...w, ...result } : w
      ),
    }));
  },
  
  clearError: () => set({ error: null }),
}));
```

### Agent Store

```typescript
// src/store/agent-store.ts
interface AgentState {
  agents: Agent[];
  activeAgents: number;
  
  fetchAgents: () => Promise<void>;
  updateAgentStatus: (id: string, status: AgentStatus) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  activeAgents: 0,
  
  fetchAgents: async () => {
    const agents = await api.getAgents();
    set({
      agents,
      activeAgents: agents.filter(a => a.status === 'active').length,
    });
  },
  
  updateAgentStatus: (id, status) => {
    set(state => ({
      agents: state.agents.map(a =>
        a.id === id ? { ...a, status } : a
      ),
      activeAgents: state.agents.filter(a => 
        a.id === id ? status === 'active' : a.status === 'active'
      ).length,
    }));
  },
}));
```

### UI Store

```typescript
// src/store/ui-store.ts
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  sidebarOpen: false,
  notifications: [],
  
  toggleTheme: () => set(state => ({
    theme: state.theme === 'light' ? 'dark' : 'light',
  })),
  
  toggleSidebar: () => set(state => ({
    sidebarOpen: !state.sidebarOpen,
  })),
  
  addNotification: (notification) => set(state => ({
    notifications: [...state.notifications, notification],
  })),
  
  markAsRead: (id) => set(state => ({
    notifications: state.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),
}));
```

---

## 🎯 Hooks personnalisés

### useWorkflows

```typescript
// src/hooks/use-workflows.ts
export function useWorkflows() {
  const { workflows, loading, error, fetchWorkflows } = useWorkflowStore();
  
  useEffect(() => {
    fetchWorkflows();
  }, []);
  
  return { workflows, loading, error, refetch: fetchWorkflows };
}
```

### useBiometrics

```typescript
// src/hooks/use-biometrics.ts
import * as LocalAuthentication from 'expo-local-authentication';

export function useBiometrics() {
  const [hasBiometrics, setHasBiometrics] = useState(false);
  
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setHasBiometrics(compatible && enrolled);
    })();
  }, []);
  
  const authenticate = async (): Promise<boolean> => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Use Passcode',
    });
    return result.success;
  };
  
  return { hasBiometrics, authenticate };
}
```

---

**Version :** 1.0.0
