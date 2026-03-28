---
sidebar_position: 4
---

# Mobile App - Components

Documentation des composants React Native.

---

## 🧩 UI Components

### Button

```tsx
// src/components/ui/Button.tsx
interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  onPress: () => void;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  isLoading,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], styles[size]]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
```

### Card

```tsx
// src/components/ui/Card.tsx
interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <View style={styles.card}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && (
        <Text style={styles.description}>{description}</Text>
      )}
      {children}
    </View>
  );
}
```

### Input

```tsx
// src/components/ui/Input.tsx
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
```

---

## 📊 Workflow Components

### WorkflowCard

```tsx
// src/components/workflow/WorkflowCard.tsx
interface WorkflowCardProps {
  workflow: Workflow;
  onPress: () => void;
}

export function WorkflowCard({ workflow, onPress }: WorkflowCardProps) {
  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.title}>{workflow.name}</Text>
        <StatusBadge status={workflow.status} />
      </View>
      <Text style={styles.description}>{workflow.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>
          {formatDate(workflow.updatedAt)}
        </Text>
        <Button title="View" size="sm" onPress={onPress} />
      </View>
    </Card>
  );
}
```

### ExecutionStatus

```tsx
// src/components/workflow/ExecutionStatus.tsx
export function ExecutionStatus({ status }: { status: ExecutionStatus }) {
  const config = {
    running: { color: '#3B82F6', icon: 'sync' },
    completed: { color: '#10B981', icon: 'checkmark-circle' },
    failed: { color: '#EF4444', icon: 'close-circle' },
  };
  
  const { color, icon } = config[status];
  
  return (
    <View style={[styles.status, { backgroundColor: color }]}>
      <Ionicons name={icon as any} size={16} color="#fff" />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
}
```

---

## 🔔 Notification Components

### NotificationItem

```tsx
// src/components/notification/NotificationItem.tsx
export function NotificationItem({ notification }: Props) {
  return (
    <View style={[
      styles.container,
      notification.read && styles.read,
      notification.type === 'urgent' && styles.urgent
    ]}>
      <Ionicons
        name={getIconForType(notification.type)}
        size={24}
        color={getColorForType(notification.type)}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.message}>{notification.message}</Text>
        <Text style={styles.time}>{formatTime(notification.createdAt)}</Text>
      </View>
    </View>
  );
}
```

---

**Version :** 1.0.0
