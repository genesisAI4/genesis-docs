---
sidebar_position: 2
---

# Genesis Temporal - Documentation Complète

**Genesis Temporal** est un serveur de workflows durables basé sur Temporal.io, optimisé pour l'écosystème Genesis AI avec une couche CHASM personnalisée pour la coordination de machines à états hétérogènes.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers Go** | 100+ fichiers |
| **Packages API** | 29 packages |
| **Packages Common** | 78 packages |
| **Fichiers CHASM** | 63 fichiers |
| **Services** | 4 services principaux |
| **Ports** | 7233 (gRPC), 7243 (HTTP), 8233 (UI) |

---

## 🏗️ Architecture Détaillée

### Structure du Projet

```
genesis-temporal/
├── api/
│   ├── activity/
│   ├── batch/
│   ├── cluster/
│   ├── command/
│   ├── common/
│   ├── cron/
│   ├── deployment/
│   ├── enums/
│   ├── errordetails/
│   ├── export/
│   ├── failure/
│   ├── filter/
│   ├── history/
│   ├── log/
│   ├── namespace/
│   ├── nexus/
│   ├── operator/
│   ├── protocol/
│   ├── query/
│   ├── replication/
│   ├── rule/
│   ├── schedule/
│   ├── sdk/
│   ├── taskqueue/
│   ├── update/
│   ├── version/
│   ├── visibility/
│   ├── webhook/
│   ├── workflow/
│   └── workerservice/
│
├── bin/
│
├── chasm/                              # COUCHE CHASM PERSONNALISÉE
│   ├── lib/
│   │   ├── field/
│   │   ├── map/
│   │   ├── ref/
│   │   ├── tree/
│   │   └── visibility/
│   │
│   ├── archetype.go                    # Archétypes de composants
│   ├── callback.go                     # Callbacks
│   ├── component_field_option.go       # Options de champs
│   ├── component_mock.go               # Mocks de composants
│   ├── component.go                    # Interface Component
│   ├── context_mock.go                 # Mocks de contexte
│   ├── context.go                      # Contexte d'exécution
│   ├── engine_mock.go                  # Mocks d'engine
│   ├── engine.go                       # Moteur CHASM
│   ├── errors.go                       # Erreurs CHASM
│   ├── export_test.go                  # Tests exportés
│   ├── field_internal.go               # Implémentation interne des champs
│   ├── field_test.go                   # Tests des champs
│   ├── field_type.go                   # Types de champs
│   ├── field.go                        # Champs de composants
│   ├── fields_iterator_test.go         # Tests d'itérateurs
│   ├── fields_iterator.go              # Itérateurs de champs
│   ├── fx.go                           # Intégration FX
│   ├── interceptor_test.go             # Tests d'intercepteurs
│   ├── interceptors.go                 # Intercepteurs
│   ├── library_core.go                 # Bibliothèque core
│   ├── library_mock.go                 # Mocks de bibliothèque
│   ├── library.go                      # Bibliothèque de composants
│   ├── map_test.go                     # Tests de maps
│   ├── map.go                          # Maps de composants
│   ├── ms_pointer.go                   # Pointeurs de mutable state
│   ├── nexus_completion.go             # Complétion Nexus
│   ├── nexus_operation_processor_test.go
│   ├── nexus_operation_processor.go    # Processeur d'opérations Nexus
│   ├── node_backend_mock.go            # Mocks de backend
│   ├── node_pure_task_mock.go          # Mocks de tâches
│   ├── parent_pointer.go               # Pointeurs parent
│   ├── path_encoder_test.go            # Tests d'encodage
│   ├── path_encoder.go                 # Encodage de chemins
│   ├── ref_test.go                     # Tests de références
│   ├── ref.go                          # Références
│   ├── registrable_component.go        # Composants enregistrables
│   ├── registrable_task.go             # Tâches enregistrables
│   ├── registry_test.go                # Tests de registre
│   ├── registry.go                     # Registre de composants
│   ├── scheduler.go                    # Scheduler
│   ├── search_attribute_test.go        # Tests d'attributs
│   ├── search_attribute.go             # Attributs de recherche
│   ├── statemachine.go                 # Machines à états
│   ├── task_mock.go                    # Mocks de tâches
│   ├── task.go                         # Tâches
│   ├── test_component_test.go          # Tests de composants
│   ├── test_library_test.go            # Tests de bibliothèque
│   ├── test_task_test.go               # Tests de tâches
│   ├── test_var_test.go                # Tests de variables
│   ├── test_visibility.go              # Visibilité de test
│   ├── transition_history.go           # Historique de transitions
│   ├── tree_test.go                    # Tests d'arbres
│   ├── tree.go                         # Arbres de composants
│   ├── visibility_manager_mock.go      # Mocks de manager
│   ├── visibility_manager.go           # Manager de visibilité
│   ├── visibility_task_test.go         # Tests de visibilité
│   ├── visibility_test.go              # Tests de visibilité
│   ├── visibility_value_test.go        # Tests de valeurs
│   ├── visibility_value.go             # Valeurs de visibilité
│   ├── visibility.go                   # Visibilité
│   └── workflow.go                     # Workflows CHASM
│
├── cli-main/
│
├── client/
│   ├── admin/
│   ├── frontend/
│   ├── history/
│   ├── matching/
│   └── worker/
│
├── cmd/
│   ├── server/
│   │   └── main.go                     # Point d'entrée principal
│   └── tools/
│
├── common/
│   ├── authorization/                  # Autorisation
│   ├── backoff/                        # Backoff strategies
│   ├── cache/                          # Cache
│   ├── channel/                        # Canaux
│   ├── checksum/                       # Checksums
│   ├── clock/                          # Horloges
│   ├── cluster/                        # Cluster
│   ├── collection/                     # Collections
│   ├── convert/                        # Conversions
│   ├── definition/                     # Définitions
│   ├── dynamicconfig/                  # Configuration dynamique
│   ├── failure/                        # Échecs
│   ├── headers/                        # En-têtes
│   ├── log/                            # Logs
│   ├── membership/                     # Appartenance
│   ├── metrics/                        # Métriques
│   ├── namespace/                      # Namespaces
│   ├── nexus/                          # Nexus RPC
│   ├── persistence/                    # Persistance
│   ├── primitives/                     # Primitives
│   ├── quota/                          # Quotas
│   ├── resource/                       # Ressources
│   ├── rpc/                            # RPC
│   ├── searchattribute/                # Attributs de recherche
│   ├── tasktoken/                      # Tokens de tâche
│   ├── telemetry/                      # Télémétrie
│   ├── util/                           # Utilitaires
│   └── worker/                         # Workers
│
├── components/
│
├── config/
│   ├── development.yaml                # Config dev (SQLite)
│   ├── development-postgres12.yaml     # Config dev (PostgreSQL)
│   ├── development-cass-es.yaml        # Config dev (Cassandra + ES)
│   ├── docker.yaml                     # Config Docker
│   └── dynamicconfig/
│       └── development-sql.yaml        # Config dynamique
│
├── develop/
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose-cass-es.yaml
│
├── docs/
│
├── proto/
│   ├── internal/                       # Protobufs internes
│   └── api/                            # Protobufs API
│
├── schema/
│   ├── postgres/                       # Schéma PostgreSQL
│   ├── mysql/                          # Schéma MySQL
│   └── cassandra/                      # Schéma Cassandra
│
├── service/
│   ├── frontend/                       # Service Frontend
│   │   ├── service.go
│   │   ├── workflow_handler.go
│   │   └── health_handler.go
│   │
│   ├── history/                        # Service History
│   │   ├── history_engine.go
│   │   ├── chasm_engine.go
│   │   ├── shard_controller.go
│   │   └── state_machine.go
│   │
│   ├── matching/                       # Service Matching
│   │   ├── matching_engine.go
│   │   ├── task_queue_manager.go
│   │   └── physical_task_queue_manager.go
│   │
│   ├── worker/                         # Service Worker
│   │   ├── worker.go
│   │   ├── replicator/
│   │   ├── batcher/
│   │   └── scanner/
│   │
│   └── fx.go                           # Intégration FX
│
├── temporal/
│   ├── environment/
│   ├── cluster_metadata_loader_test.go
│   ├── cluster_metadata_loader.go
│   ├── fx_test.go
│   ├── fx.go
│   ├── interrupt.go
│   ├── server_impl.go
│   ├── server_option.go
│   ├── server_options.go
│   ├── server_test.go
│   └── server.go
│
├── temporaltest/
│
├── tests/
│
├── tools/
│
├── .gitmodules
├── .goreleaser.yml
├── go.mod
├── go.sum
├── Makefile                          # 726 lignes
└── README.md
```

---

## 🧩 CHASM Layer - Composants Détaillés

### Component Interface

```go
// chasm/component.go
package chasm

// Component représente un composant exécutable dans le système CHASM
type Component interface {
    // LifecycleState retourne l'état actuel du cycle de vie
    LifecycleState(ctx Context) LifecycleState
    
    // Doit être implémenté pour l'enregistrement
    mustEmbedUnimplementedComponent()
}

// TerminableComponent est un composant qui peut être terminé
type TerminableComponent interface {
    Component
    
    // Terminate termine le composant
    Terminate(
        ctx MutableContext,
        request TerminateComponentRequest,
    ) (TerminateComponentResponse, error)
}

// RootComponent est un composant racine
type RootComponent interface {
    TerminableComponent
}
```

### Lifecycle States

```go
// chasm/statemachine.go
package chasm

// LifecycleState représente l'état d'un composant
type LifecycleState int

const (
    // LifecycleStateUnspecified état par défaut
    LifecycleStateUnspecified LifecycleState = 0
    
    // LifecycleStateRunning composant en cours d'exécution (OPEN)
    LifecycleStateRunning LifecycleState = 2 << iota
    
    // LifecycleStateCompleted composant terminé (CLOSED)
    LifecycleStateCompleted
    
    // LifecycleStateFailed composant en échec (CLOSED)
    LifecycleStateFailed
)

// IsClosed vérifie si l'état est fermé
func (s LifecycleState) IsClosed() bool {
    return s == LifecycleStateCompleted || s == LifecycleStateFailed
}

// String retourne la représentation texte
func (s LifecycleState) String() string {
    switch s {
    case LifecycleStateRunning:
        return "OPEN"
    case LifecycleStateCompleted:
        return "CLOSED_COMPLETED"
    case LifecycleStateFailed:
        return "CLOSED_FAILED"
    default:
        return "UNSPECIFIED"
    }
}
```

### Transition Type

```go
// chasm/statemachine.go
package chasm

// Transition représente une transition d'état
type Transition[S comparable, SM StateMachine[S], E any] struct {
    Sources     []S           // États sources possibles
    Destination S             // État de destination
    apply       func(SM, MutableContext, E) error  // Fonction d'application
}

// NewTransition crée une nouvelle transition
func NewTransition[S comparable, SM StateMachine[S], E any](
    src []S,
    dst S,
    apply func(SM, MutableContext, E) error,
) Transition[S, SM, E] {
    return Transition[S, SM, E]{
        Sources:     src,
        Destination: dst,
        apply:       apply,
    }
}

// Possible vérifie si la transition est possible
func (t Transition) Possible(sm SM) bool {
    currentState := sm.StateMachineState()
    
    for _, source := range t.Sources {
        if source == currentState {
            return true
        }
    }
    
    return false
}

// Apply applique la transition
func (t Transition) Apply(sm SM, ctx MutableContext, event E) error {
    if !t.Possible(sm) {
        return &InvalidTransitionError{
            CurrentState: sm.StateMachineState(),
            AttemptedTransition: t.Destination,
        }
    }
    
    return t.apply(sm, ctx, event)
}

// InvalidTransitionError erreur de transition invalide
type InvalidTransitionError struct {
    CurrentState        interface{}
    AttemptedTransition interface{}
}

func (e *InvalidTransitionError) Error() string {
    return fmt.Sprintf(
        "invalid transition from %v to %v",
        e.CurrentState,
        e.AttemptedTransition,
    )
}
```

### Field System

```go
// chasm/field.go
package chasm

// Field représente un champ de composant
type Field[T any] struct {
    name        string
    value       T
    isSet       bool
    isMutable   bool
    validators  []Validator[T]
    onChange    []func(T, T)
}

// NewField crée un nouveau champ
func NewField[T any](name string, opts ...FieldOption[T]) *Field[T] {
    field := &Field[T]{
        name: name,
    }
    
    for _, opt := range opts {
        opt(field)
    }
    
    return field
}

// Get retourne la valeur du champ
func (f *Field[T]) Get() (T, error) {
    var zero T
    
    if !f.isSet {
        return zero, &FieldNotSetError{Field: f.name}
    }
    
    return f.value, nil
}

// Set définit la valeur du champ
func (f *Field[T]) Set(value T) error {
    var zero T
    
    // Validation
    for _, validator := range f.validators {
        if err := validator(value); err != nil {
            return &FieldValidationError{
                Field: f.name,
                Value: value,
                Error: err,
            }
        }
    }
    
    oldVal := f.value
    f.value = value
    f.isSet = true
    
    // Callbacks onChange
    for _, callback := range f.onChange {
        callback(oldVal, value)
    }
    
    return nil
}

// IsSet vérifie si le champ est défini
func (f *Field[T]) IsSet() bool {
    return f.isSet
}

// FieldOption option de configuration de champ
type FieldOption[T any] func(*Field[T])

// WithDefault définit une valeur par défaut
func WithDefault[T any](value T) FieldOption[T] {
    return func(f *Field[T]) {
        f.value = value
        f.isSet = true
    }
}

// WithValidator ajoute un validateur
func WithValidator[T any](validator Validator[T]) FieldOption[T] {
    return func(f *Field[T]) {
        f.validators = append(f.validators, validator)
    }
}

// WithOnChange ajoute un callback onChange
func WithOnChange[T any](callback func(T, T)) FieldOption[T] {
    return func(f *Field[T]) {
        f.onChange = append(f.onChange, callback)
    }
}

// Validator fonction de validation
type Validator[T any] func(T) error
```

### Component Registry

```go
// chasm/registry.go
package chasm

// Registry enregistre les types de composants
type Registry struct {
    components map[string]ComponentType
    tasks      map[string]TaskType
    libraries  map[string]Library
    mu         sync.RWMutex
}

// NewRegistry crée un nouveau registre
func NewRegistry() *Registry {
    return &Registry{
        components: make(map[string]ComponentType),
        tasks:      make(map[string]TaskType),
        libraries:  make(map[string]Library),
    }
}

// RegisterComponent enregistre un type de composant
func (r *Registry) RegisterComponent(
    name string,
    componentType ComponentType,
) error {
    r.mu.Lock()
    defer r.mu.Unlock()
    
    if _, exists := r.components[name]; exists {
        return &ComponentAlreadyRegisteredError{Name: name}
    }
    
    r.components[name] = componentType
    return nil
}

// RegisterTask enregistre un type de tâche
func (r *Registry) RegisterTask(
    name string,
    taskType TaskType,
) error {
    r.mu.Lock()
    defer r.mu.Unlock()
    
    if _, exists := r.tasks[name]; exists {
        return &TaskAlreadyRegisteredError{Name: name}
    }
    
    r.tasks[name] = taskType
    return nil
}

// GetComponent retourne un type de composant
func (r *Registry) GetComponent(name string) (ComponentType, error) {
    r.mu.RLock()
    defer r.mu.RUnlock()
    
    componentType, exists := r.components[name]
    if !exists {
        return nil, &ComponentNotFoundError{Name: name}
    }
    
    return componentType, nil
}

// GetTask retourne un type de tâche
func (r *Registry) GetTask(name string) (TaskType, error) {
    r.mu.RLock()
    defer r.mu.RUnlock()
    
    taskType, exists := r.tasks[name]
    if !exists {
        return nil, &TaskNotFoundError{Name: name}
    }
    
    return taskType, nil
}

// ListComponents retourne tous les composants enregistrés
func (r *Registry) ListComponents() []string {
    r.mu.RLock()
    defer r.mu.RUnlock()
    
    names := make([]string, 0, len(r.components))
    for name := range r.components {
        names = append(names, name)
    }
    
    return names
}

// ListTasks retourne toutes les tâches enregistrées
func (r *Registry) ListTasks() []string {
    r.mu.RLock()
    defer r.mu.RUnlock()
    
    names := make([]string, 0, len(r.tasks))
    for name := range r.tasks {
        names = append(names, name)
    }
    
    return names
}
```

### Engine Implementation

```go
// chasm/engine.go
package chasm

import (
    "context"
    "fmt"
    "sync"
    "time"
)

// Engine gère l'exécution des composants CHASM
type Engine struct {
    registry       *Registry
    activeExecutions map[ExecutionID]*Execution
    mu             sync.RWMutex
    config         EngineConfig
}

// EngineConfig configuration du moteur
type EngineConfig struct {
    MaxConcurrentExecutions int
    ExecutionTimeout        time.Duration
    RetryPolicy             RetryPolicy
}

// ExecutionID identifiant unique d'exécution
type ExecutionID string

// Execution représente une exécution en cours
type Execution struct {
    ID        ExecutionID
    Component Component
    State     ComponentState
    StartTime time.Time
    EndTime   time.Time
    Error     error
}

// NewEngine crée un nouveau moteur
func NewEngine(registry *Registry, config EngineConfig) *Engine {
    return &Engine{
        registry:           registry,
        activeExecutions:   make(map[ExecutionID]*Execution),
        config:             config,
    }
}

// StartExecution démarre l'exécution d'un composant
func (e *Engine) StartExecution(
    ctx context.Context,
    componentID string,
    input []byte,
) (ExecutionID, error) {
    e.mu.Lock()
    defer e.mu.Unlock()
    
    // Vérifier la limite de concurrence
    if len(e.activeExecutions) >= e.config.MaxConcurrentExecutions {
        return "", &MaxExecutionsReachedError{
            Max: e.config.MaxConcurrentExecutions,
        }
    }
    
    // Obtenir le type de composant
    componentType, err := e.registry.GetComponent(componentID)
    if err != nil {
        return "", err
    }
    
    // Créer l'instance du composant
    component, err := componentType.CreateInstance(input)
    if err != nil {
        return "", err
    }
    
    // Créer l'exécution
    execID := ExecutionID(generateUUID())
    execution := &Execution{
        ID:        execID,
        Component: component,
        State:     ComponentStateRunning,
        StartTime: time.Now(),
    }
    
    e.activeExecutions[execID] = execution
    
    // Démarrer l'exécution en background
    go e.runExecution(ctx, execution)
    
    return execID, nil
}

// runExecution exécute un composant
func (e *Engine) runExecution(ctx context.Context, execution *Execution) {
    defer func() {
        e.mu.Lock()
        defer e.mu.Unlock()
        
        execution.EndTime = time.Now()
        delete(e.activeExecutions, execution.ID)
    }()
    
    // Créer le contexte avec timeout
    ctx, cancel := context.WithTimeout(ctx, e.config.ExecutionTimeout)
    defer cancel()
    
    // Exécuter le composant
    err := execution.Component.Execute(ctx)
    
    if err != nil {
        execution.State = ComponentStateFailed
        execution.Error = err
    } else {
        execution.State = ComponentStateCompleted
    }
}

// GetExecutionStatus retourne le status d'une exécution
func (e *Engine) GetExecutionStatus(
    executionID ExecutionID,
) (*Execution, error) {
    e.mu.RLock()
    defer e.mu.RUnlock()
    
    execution, exists := e.activeExecutions[executionID]
    if !exists {
        return nil, &ExecutionNotFoundError{ID: executionID}
    }
    
    return execution, nil
}

// ListExecutions retourne toutes les exécutions actives
func (e *Engine) ListExecutions() []*Execution {
    e.mu.RLock()
    defer e.mu.RUnlock()
    
    executions := make([]*Execution, 0, len(e.activeExecutions))
    for _, exec := range e.activeExecutions {
        executions = append(executions, exec)
    }
    
    return executions
}

// CancelExecution annule une exécution
func (e *Engine) CancelExecution(executionID ExecutionID) error {
    e.mu.Lock()
    defer e.mu.Unlock()
    
    execution, exists := e.activeExecutions[executionID]
    if !exists {
        return &ExecutionNotFoundError{ID: executionID}
    }
    
    // TODO: Implémenter l'annulation
    execution.State = ComponentStateCancelled
    
    return nil
}
```

---

## 🔄 Workflow Lifecycle

```go
// service/history/history_engine.go
package history

import (
    "context"
    "time"
    
    "github.com/genesis-ai/genesis-temporal/api/history/v1"
    "github.com/genesis-ai/genesis-temporal/common/persistence"
)

// HistoryEngine gère l'historique des workflows
type HistoryEngine struct {
    shardController ShardController
    stateMachine    *StateMachine
    eventStore      *EventStore
    chasmEngine     *chasm.Engine
}

// ScheduleWorkflowTask planifie une tâche de workflow
func (e *HistoryEngine) ScheduleWorkflowTask(
    ctx context.Context,
    request *ScheduleRequest,
) error {
    // Obtenir le shard pour ce workflow
    shard, err := e.shardController.GetShard(request.WorkflowID)
    if err != nil {
        return err
    }
    
    // Acquérir le lock du shard
    if err := shard.AcquireLock(ctx); err != nil {
        return err
    }
    defer shard.ReleaseLock()
    
    // Charger l'état mutable
    mutableState, err := e.stateMachine.Load(ctx, shard.ID, request.WorkflowID)
    if err != nil {
        return err
    }
    
    // Créer l'événement
    event := &history.HistoryEvent{
        EventId:   mutableState.GetNextEventID(),
        EventType: EVENT_TYPE_WORKFLOW_TASK_SCHEDULED,
        Attributes: &history.HistoryEvent_WorkflowTaskScheduledEventAttributes{
            WorkflowTaskScheduledEventAttributes: &history.WorkflowTaskScheduledEventAttributes{
                ScheduledTime: timePtr(time.Now()),
                StartedEventId: mutableState.GetNextEventID() + 1,
            },
        },
    }
    
    // Persister
    if err := e.eventStore.AppendEvents(ctx, shard.ID, event); err != nil {
        return err
    }
    
    // Mettre à jour l'état mutable
    mutableState.AddEvent(event)
    if err := e.stateMachine.Persist(ctx, mutableState); err != nil {
        return err
    }
    
    // Notifier le Matching Service
    return e.notifyMatchingService(ctx, request.WorkflowID)
}

// CompleteWorkflowTask complète une tâche de workflow
func (e *HistoryEngine) CompleteWorkflowTask(
    ctx context.Context,
    request *CompleteRequest,
) error {
    shard, err := e.shardController.GetShard(request.WorkflowID)
    if err != nil {
        return err
    }
    
    if err := shard.AcquireLock(ctx); err != nil {
        return err
    }
    defer shard.ReleaseLock()
    
    mutableState, err := e.stateMachine.Load(ctx, shard.ID, request.WorkflowID)
    if err != nil {
        return err
    }
    
    // Traiter les commandes du worker
    for _, command := range request.Commands {
        switch command.GetCommandType() {
        case COMMAND_TYPE_COMPLETE_WORKFLOW_EXECUTION:
            e.handleCompleteWorkflow(ctx, mutableState, command)
        case COMMAND_TYPE_SCHEDULE_ACTIVITY_TASK:
            e.handleScheduleActivity(ctx, mutableState, command)
        case COMMAND_TYPE_START_TIMER:
            e.handleStartTimer(ctx, mutableState, command)
        }
    }
    
    // Persister
    if err := e.stateMachine.Persist(ctx, mutableState); err != nil {
        return err
    }
    
    return nil
}
```

---

## 📊 Services Temporal

### Frontend Service

```go
// service/frontend/service.go
package frontend

import (
    "net"
    "time"
    
    "google.golang.org/grpc"
    "google.golang.org/grpc/keepalive"
    
    "go.temporal.io/api/workflowservice/v1"
    "go.temporal.io/server/api/historyservice/v1"
)

// Service représente le service Frontend
type Service struct {
    config          *Config
    workflowHandler *WorkflowHandler
    healthHandler   *HealthHandler
    nexusHandler    *NexusHandler
    server          *grpc.Server
}

// Config configuration du service
type Config struct {
    GRPCPort         int
    HTTPPort         int
    MaxConnections   int
    TLS              TLSConfig
    Nexus            NexusConfig
    KeepAlive        KeepAliveConfig
}

// KeepAliveConfig configuration keepalive
type KeepAliveConfig struct {
    MaxConnectionIdle     time.Duration
    MaxConnectionAge      time.Duration
    MaxConnectionAgeGrace time.Duration
    Time                  time.Duration
    Timeout               time.Duration
}

// Start démarre le service
func (s *Service) Start() error {
    // Créer le serveur gRPC
    grpcServer := grpc.NewServer(
        grpc.MaxConcurrentStreams(uint32(s.config.MaxConnections)),
        grpc.KeepaliveParams(keepalive.ServerParameters{
            MaxConnectionIdle:     s.config.KeepAlive.MaxConnectionIdle,
            MaxConnectionAge:      s.config.KeepAlive.MaxConnectionAge,
            MaxConnectionAgeGrace: s.config.KeepAlive.MaxConnectionAgeGrace,
            Time:                  s.config.KeepAlive.Time,
            Timeout:               s.config.KeepAlive.Timeout,
        }),
    )
    
    // Enregistrer les handlers
    workflowservice.RegisterWorkflowServiceServer(
        grpcServer,
        s.workflowHandler,
    )
    
    healthgrpc.RegisterHealthServer(
        grpcServer,
        s.healthHandler,
    )
    
    // Écouter
    lis, err := net.Listen("tcp", fmt.Sprintf(":%d", s.config.GRPCPort))
    if err != nil {
        return err
    }
    
    s.server = grpcServer
    return grpcServer.Serve(lis)
}

// Stop arrête le service
func (s *Service) Stop() {
    if s.server != nil {
        s.server.GracefulStop()
    }
}
```

### Matching Service

```go
// service/matching/matching_engine.go
package matching

import (
    "context"
    "time"
    
    "go.temporal.io/api/workflowservice/v1"
    "go.temporal.io/api/enums/v1"
)

// MatchingEngine gère les files d'attente de tâches
type MatchingEngine struct {
    taskQueueManager TaskQueueManager
    pollerRegistry   *PollerRegistry
    forwarder        *TaskForwarder
    config           *Config
}

// Config configuration du Matching
type Config struct {
    NumTaskQueuePartitions int
    LongPollExpirationInterval time.Duration
    MaxTaskBatchSize       int
    LoadBalancer           LoadBalancer
}

// PollWorkflowTaskQueue poll pour une tâche de workflow
func (e *MatchingEngine) PollWorkflowTaskQueue(
    ctx context.Context,
    request *workflowservice.PollWorkflowTaskQueueRequest,
) (*workflowservice.PollWorkflowTaskQueueResponse, error) {
    
    // Obtenir le manager de file d'attente
    queue, err := e.taskQueueManager.GetQueue(
        request.GetNamespaceId(),
        request.GetTaskQueue().GetName(),
        enums.TASK_QUEUE_TYPE_WORKFLOW,
    )
    if err != nil {
        return nil, err
    }
    
    // Attendre une tâche avec long polling
    task, err := queue.Poll(ctx, request.GetPollerId(), e.config.LongPollExpirationInterval)
    if err != nil {
        return nil, err
    }
    
    if task == nil {
        // Timeout - retourner empty
        return &workflowservice.PollWorkflowTaskQueueResponse{}, nil
    }
    
    // Retourner la tâche
    return &workflowservice.PollWorkflowTaskQueueResponse{
        TaskToken:         task.Token,
        WorkflowExecution: task.WorkflowExecution,
        WorkflowType:      task.WorkflowType,
        History:           task.History,
        NextPageToken:     task.NextPageToken,
    }, nil
}

// AddWorkflowTask ajoute une tâche de workflow
func (e *MatchingEngine) AddWorkflowTask(
    ctx context.Context,
    request *AddWorkflowTaskRequest,
) error {
    
    queue, err := e.taskQueueManager.GetQueue(
        request.NamespaceID,
        request.TaskQueue,
        enums.TASK_QUEUE_TYPE_WORKFLOW,
    )
    if err != nil {
        return err
    }
    
    return queue.AddTask(ctx, request.Task)
}
```

---

## 📋 Configuration

### development.yaml

```yaml
log:
  level: debug
  format: json
  output: stdout

persistence:
  defaultStore:
    pluginName: sqlite
    databaseName: /tmp/genesis-temporal.db
    connectAttributes:
      _busy_timeout: "5000"
      _txlock: immediate
  
  visibilityStore:
    pluginName: sqlite
    databaseName: /tmp/genesis-temporal-visibility.db

services:
  frontend:
    grpcPort: 7233
    httpPort: 7243
    maxConnections: 10000
    keepAlive:
      maxConnectionIdle: 5m
      maxConnectionAge: 2h
      maxConnectionAgeGrace: 5m
      time: 30s
      timeout: 5s
  
  history:
    grpcPort: 7234
    numShards: 4
    persistenceMaxQPS: 1000
  
  matching:
    grpcPort: 7235
    numTaskQueuePartitions: 1
    longPollExpirationInterval: 1m
    maxTaskBatchSize: 10
  
  worker:
    grpcPort: 7239
    enableReplicator: true
    enableBatcher: true
    enableScanner: true

clusterMetadata:
  enableGlobalNamespace: false
  replicationConsumer:
    type: kafka
  
membership:
  maxJoinDuration: 30s
  broadcastAddress: 127.0.0.1

dcRedundancy:
  enabled: false

archival:
  history:
    state: disabled
  visibility:
    state: disabled

batcher:
  enableBatcher: true

namespaceCache:
  refreshInterval: 10s
  cacheSize: 10000
```

### Makefile (Extraits)

```makefile
# Build
build:
    go build -o bin/temporal-server ./cmd/server

# Run development server
start:
    ./bin/temporal-server start --config config/development.yaml

# Run with PostgreSQL
start-postgresql:
    ./bin/temporal-server start --config config/development-postgres12.yaml

# Install schema
install-schema-postgresql:
    temporal-sql-tool --plugin postgres --database temporal setup-schema

# Docker
docker:
    docker build -t genesis-temporal:latest .

docker-up:
    docker-compose up -d

# Tests
test:
    go test -v ./...

test-chasm:
    go test -v ./chasm/...

test-coverage:
    go test -v -coverprofile=coverage.out ./...
    go tool cover -html=coverage.out

# Code generation
generate:
    go generate ./...

# Lint
lint:
    golangci-lint run

# Format
fmt:
    go fmt ./...
```

---

## 📈 Monitoring

### Métriques Prometheus

```go
// common/metrics/metrics.go
package metrics

const (
    // Temporal Metrics
    HistoryShardAcquisitionCounter = "history_shard_acquisition"
    HistoryWorkflowTaskCounter = "history_workflow_task"
    MatchingTaskQueueSize = "matching_task_queue_size"
    WorkerActivityCounter = "worker_activity"
    
    // CHASM Metrics
    ChasmComponentExecutionTimer = "chasm_component_execution"
    ChasmTransitionCounter = "chasm_transition"
    ChasmFieldValidationCounter = "chasm_field_validation"
)

type MetricsClient interface {
    IncCounter(metric string, tags ...Tag)
    AddCounter(metric string, value int64, tags ...Tag)
    RecordTimer(metric string, value time.Duration, tags ...Tag)
    UpdateGauge(metric string, value float64, tags ...Tag)
}
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
