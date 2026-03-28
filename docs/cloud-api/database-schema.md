---
sidebar_position: 5
---

# Cloud API - Database Schema

Schéma complet de la base de données.

---

## 📊 Modèles Prisma

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String
  publicKey     String
  mfaSecret     String?
  mfaEnabled    Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastLoginAt   DateTime?
  
  devices       Device[]
  workflows     Workflow[]
  syncStates    SyncState[]
  auditLogs     AuditLog[]
  
  @@index([email])
}

model Device {
  id           String   @id @default(uuid())
  userId       String
  name         String
  publicKey    String
  lastSeenAt   DateTime
  createdAt    DateTime @default(now())
  
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  syncStates   SyncState[]
  
  @@unique([userId, name])
  @@index([userId])
}

model Workflow {
  id            String   @id @default(uuid())
  userId        String
  name          String
  description   String?
  encryptedData String
  encryptionKey String
  version       Int      @default(1)
  status        WorkflowStatus @default(DRAFT)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  executedAt    DateTime?
  
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, status])
  @@index([userId, createdAt])
}

enum WorkflowStatus {
  DRAFT
  RUNNING
  COMPLETED
  FAILED
  ARCHIVED
}

model SyncState {
  id          String   @id @default(uuid())
  userId      String
  deviceId    String
  type        String
  entityId    String
  encryptedData String
  version     BigInt   @default(0n)
  vectorClock Json
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
  device      Device   @relation(fields: [deviceId], references: [id])
  
  @@unique([userId, deviceId, type, entityId])
  @@index([userId, updatedAt])
}

model AuditLog {
  id          String   @id @default(uuid())
  userId      String
  action      String
  resource    String
  resourceId  String?
  metadata    Json?
  ipAddress   String?
  userAgent   String?
  timestamp   DateTime @default(now())
  previousHash String?
  hash        String
  
  user        User     @relation(fields: [userId], references: [id])
  
  @@index([userId, timestamp])
}

model Agent {
  id            String   @id @default(uuid())
  userId        String
  name          String
  description   String?
  encryptedBlueprint String
  capabilities  String[]
  isPublic      Boolean  @default(false)
  price         Decimal?
  currency      String   @default("USD")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  user          User
  
  @@index([userId])
  @@index([isPublic, createdAt])
}

model MarketplaceListing {
  id            String   @id @default(uuid())
  agentId       String
  sellerId      String
  price         Decimal
  currency      String   @default("USD")
  isActive      Boolean  @default(true)
  salesCount    Int      @default(0)
  rating        Float    @default(0.0)
  createdAt     DateTime @default(now())
  
  @@index([sellerId])
  @@index([isActive, createdAt])
}

model Transaction {
  id            String   @id @default(uuid())
  buyerId       String
  sellerId      String
  listingId     String
  amount        Decimal
  currency      String
  status        TransactionStatus
  createdAt     DateTime @default(now())
  
  @@index([buyerId])
  @@index([sellerId])
}

enum TransactionStatus {
  PENDING
  COMPLETED
  REFUNDED
  DISPUTED
}
```

---

## 📈 Indexes

| Table | Index | Purpose |
|-------|-------|---------|
| **User** | email | Login lookup |
| **Workflow** | userId, status | Filter by user + status |
| **Workflow** | userId, createdAt | Order by date |
| **SyncState** | userId, updatedAt | Sync pull |
| **AuditLog** | userId, timestamp | Audit trail |

---

## 🔄 Migrations

```bash
# Créer une migration
npx prisma migrate dev --name init

# Appliquer les migrations
npx prisma migrate deploy

# Générer le client
npx prisma generate

# Studio (GUI)
npx prisma studio
```

---

**Version :** 1.0.0
