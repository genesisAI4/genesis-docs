---
sidebar_position: 2
---

# Genesis Cloud API - Documentation Complète

**Genesis Cloud API** est le hub de synchronisation zero-knowledge de l'écosystème Genesis, construit avec NestJS et PostgreSQL, assurant la synchronisation des états entre appareils avec chiffrement de bout en bout.

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| **Fichiers TypeScript** | 200+ fichiers |
| **Modules NestJS** | 18 modules |
| **Modèles Prisma** | 14 modèles |
| **Endpoints API** | 50+ endpoints |
| **Port d'exécution** | 3000 (HTTP) |

---

## 🏗️ Architecture Détaillée

### Structure du Projet

```
genesis-cloud-api/
├── api/                              # Spécifications API
│   ├── openapi.yaml
│   └── graphql/
│
├── db/                               # Scripts de base de données
│   ├── migrations/
│   └── seeds/
│
├── email-templates/                  # Templates d'emails
│   ├── welcome.hbs
│   ├── password-reset.hbs
│   └── alert.hbs
│
├── graphql/                          # Schémas GraphQL
│   ├── schema.graphql
│   └── resolvers/
│
├── prisma/                           # Schéma Prisma
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── __tests__/                    # Tests E2E
│   │   ├── auth.e2e-spec.ts
│   │   ├── workflows.e2e-spec.ts
│   │   └── sync.e2e-spec.ts
│   │
│   ├── ai/                           # Module AI
│   │   ├── ai.module.ts
│   │   ├── ai.service.ts
│   │   └── llm-client.ts
│   │
│   ├── alerting/                     # Module d'alerting
│   │   ├── alerting.module.ts
│   │   ├── alerting.service.ts
│   │   ├── alert-rules.ts
│   │   └── channels/
│   │       ├── slack.channel.ts
│   │       ├── email.channel.ts
│   │       └── pagerduty.channel.ts
│   │
│   ├── auth/                         # Module d'authentification
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── local.strategy.ts
│   │   │   └── mfa.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── mfa.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── auth.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   ├── refresh.dto.ts
│   │   │   └── mfa-verify.dto.ts
│   │   └── interfaces/
│   │       └── jwt-payload.interface.ts
│   │
│   ├── beta/                         # Module Beta (features expérimentales)
│   │   ├── beta.module.ts
│   │   └── beta.controller.ts
│   │
│   ├── chat/                         # Module Chat
│   │   ├── chat.module.ts
│   │   ├── chat.gateway.ts
│   │   ├── chat.service.ts
│   │   └── dto/
│   │
│   ├── common/                       # Modules communs
│   │   ├── cache.module.ts           # Module de cache Redis
│   │   ├── e2ee.module.ts            # Module de chiffrement E2EE
│   │   ├── throttler.module.ts       # Rate limiting
│   │   └── interceptors/
│   │       ├── logging.interceptor.ts
│   │       └── transform.interceptor.ts
│   │
│   ├── companions/                   # Module Companions
│   │   ├── companions.module.ts
│   │   ├── companions.controller.ts
│   │   ├── companions.service.ts
│   │   └── dto/
│   │
│   ├── email/                        # Module Email
│   │   ├── email.module.ts
│   │   ├── email.service.ts
│   │   └── templates/
│   │
│   ├── feedback/                     # Module Feedback
│   │   ├── feedback.module.ts
│   │   └── feedback.controller.ts
│   │
│   ├── llm/                          # Module LLM
│   │   ├── llm.module.ts
│   │   ├── llm.service.ts
│   │   └── providers/
│   │       ├── openai.provider.ts
│   │       ├── anthropic.provider.ts
│   │       └── gemini.provider.ts
│   │
│   ├── marketplace/                  # Module Marketplace
│   │   ├── marketplace.module.ts
│   │   ├── marketplace.controller.ts
│   │   ├── marketplace.service.ts
│   │   ├── dto/
│   │   └── interfaces/
│   │
│   ├── mcp-generator/                # Générateur MCP
│   │   ├── mcp-generator.module.ts
│   │   └── mcp-generator.service.ts
│   │
│   ├── mcps/                         # Module MCPs
│   │   ├── mcps.module.ts
│   │   ├── mcps.controller.ts
│   │   └── mcps.service.ts
│   │
│   ├── rgpd/                         # Module RGPD/Compliance
│   │   ├── rgpd.module.ts
│   │   ├── rgpd.service.ts
│   │   ├── data-export.service.ts
│   │   └── data-deletion.service.ts
│   │
│   ├── sync/                         # Module de Synchronisation
│   │   ├── sync.module.ts
│   │   ├── sync.controller.ts
│   │   ├── sync.service.ts
│   │   ├── crdt/
│   │   │   ├── counter.ts
│   │   │   ├── map.ts
│   │   │   └── set.ts
│   │   └── dto/
│   │       ├── push-state.dto.ts
│   │       └── pull-state.dto.ts
│   │
│   ├── system/                       # Module Système
│   │   └── system.controller.ts      # Health checks
│   │
│   ├── users/                        # Module Utilisateurs
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   └── interfaces/
│   │
│   ├── websocket/                    # Module WebSocket
│   │   ├── websocket.module.ts
│   │   ├── websocket.gateway.ts
│   │   └── companion.module.ts
│   │
│   ├── workflows/                    # Module Workflows
│   │   ├── workflows.module.ts
│   │   ├── workflows.controller.ts
│   │   ├── workflows.service.ts
│   │   ├── dto/
│   │   │   ├── create-workflow.dto.ts
│   │   │   ├── update-workflow.dto.ts
│   │   │   └── execute-workflow.dto.ts
│   │   └── interfaces/
│   │
│   ├── app.module.ts                 # Module principal
│   ├── main.ts                       # Point d'entrée
│   └── prisma.service.ts             # Service Prisma
│
├── tests/                            # Tests
│
├── .env.example                      # Variables d'environnement
├── .eslintrc.js                      # Configuration ESLint
├── nest-cli.json                     # Configuration NestJS
├── package.json                      # Dépendances
├── tsconfig.json                     # Configuration TypeScript
└── README.md
```

---

## 📦 Modules Principaux

### AppModule Configuration

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { TerminusModule } from '@nestjs/terminus';

// Feature modules
import { E2EEModule } from './common/e2ee.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { SyncModule } from './sync/sync.module';
import { CompanionModule } from './websocket/companion.module';
import { McpsModule } from './mcps/mcps.module';
import { CompanionsModule } from './companions/companions.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { BetaModule } from './beta/beta.module';
import { FeedbackModule } from './feedback/feedback.module';
import { EmailModule } from './email/email.module';
import { McpGeneratorModule } from './mcp-generator/mcp-generator.module';
import { LlmModule } from './llm/llm.module';
import { ChatModule } from './chat/chat.module';
import { AiModule } from './ai/ai.module';
import { AlertingModule } from './alerting/alerting.module';
import { RgpdModule } from './rgpd/rgpd.module';

// Controllers & Services
import { SystemController } from './system/system.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [{
        ttl: config.get<number>('THROTTLE_TTL', 60000),
        limit: config.get<number>('THROTTLE_LIMIT', 100),
      }]),
    }),
    
    // Redis Cache (L1 + L2)
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        store: redisStore,
        host: config.get('REDIS_HOST', 'localhost'),
        port: config.get<number>('REDIS_PORT', 6379),
        ttl: 300, // 5 minutes
      }),
    }),
    
    // Alerting
    AlertingModule,
    
    // RGPD Compliance
    RgpdModule,
    
    // Async Queues (BullMQ)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
        },
      }),
    }),
    
    // Health Checks
    TerminusModule,
    
    // Feature Modules
    E2EEModule,
    AuthModule,
    UsersModule,
    WorkflowsModule,
    SyncModule,
    CompanionModule,
    McpsModule,
    CompanionsModule,
    MarketplaceModule,
    BetaModule,
    FeedbackModule,
    EmailModule,
    McpGeneratorModule,
    LlmModule,
    ChatModule,
    AiModule,
  ],
  controllers: [SystemController],
  providers: [PrismaService],
})
export class AppModule {}
```

---

## 🔐 E2EE Module

```typescript
// src/common/e2ee.module.ts
import { Module, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';

interface EncryptedData {
  ciphertext: string;
  iv: string;
  authTag: string;
  salt: string;
}

@Injectable()
export class E2EEncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;
  
  constructor(private configService: ConfigService) {}
  
  /**
   * Dériver une clé depuis un mot de passe
   */
  async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      scrypt(password, salt, this.keyLength, (err, key) => {
        if (err) reject(err);
        resolve(key);
      });
    });
  }
  
  /**
   * Chiffrer des données
   */
  async encrypt(data: Buffer | string, password: string): Promise<EncryptedData> {
    const salt = randomBytes(16);
    const key = await this.deriveKey(password, salt);
    const iv = randomBytes(12);
    
    const cipher = createCipheriv(this.algorithm, key, iv);
    
    let encrypted = cipher.update(
      typeof data === 'string' ? Buffer.from(data) : data
    );
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    return {
      ciphertext: encrypted.toString('base64'),
      iv: iv.toString('base64'),
      authTag: cipher.getAuthTag().toString('base64'),
      salt: salt.toString('base64'),
    };
  }
  
  /**
   * Déchiffrer des données
   */
  async decrypt(
    encrypted: EncryptedData,
    password: string,
  ): Promise<Buffer> {
    const salt = Buffer.from(encrypted.salt, 'base64');
    const iv = Buffer.from(encrypted.iv, 'base64');
    const authTag = Buffer.from(encrypted.authTag, 'base64');
    const ciphertext = Buffer.from(encrypted.ciphertext, 'base64');
    
    const key = await this.deriveKey(password, salt);
    
    const decipher = createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(ciphertext);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted;
  }
}

@Module({
  providers: [E2EEncryptionService],
  exports: [E2EEncryptionService],
})
export class E2EEModule {}
```

---

## 📡 API Endpoints

### Auth Controller

```typescript
// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';
import { MFAVerifyDto } from './dto/mfa-verify.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  
  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  async verifyMFA(@Body() dto: MFAVerifyDto) {
    return this.authService.verifyMFA(dto);
  }
  
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() dto: RefreshDto) {
    return this.authService.refreshToken(dto);
  }
  
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: User) {
    await this.authService.logout(user.id);
    return { success: true };
  }
}
```

### Sync Controller

```typescript
// src/sync/sync.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { SyncService } from './sync.service';
import { PushStateDto } from './dto/push-state.dto';
import { PullStateDto } from './dto/pull-state.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/auth.decorator';

@Controller('sync')
@UseGuards(JwtAuthGuard)
export class SyncController {
  constructor(private syncService: SyncService) {}
  
  /**
   * Push d'état chiffré
   */
  @Post('push')
  async pushState(
    @CurrentUser() user: User,
    @Body() dto: PushStateDto,
  ) {
    // Les données sont DÉJÀ chiffrées côté client
    // Le serveur ne fait que les stocker
    return this.syncService.pushState(user.id, dto);
  }
  
  /**
   * Pull d'état chiffré
   */
  @Get('pull')
  async pullState(
    @CurrentUser() user: User,
    @Query('since') since?: string,
    @Query('type') type?: string,
  ) {
    return this.syncService.pullState(user.id, { since, type });
  }
  
  /**
   * S'abonner aux changements (WebSocket)
   */
  @Post('subscribe')
  async subscribe(
    @CurrentUser() user: User,
    @Body() dto: { types?: string[] },
  ) {
    return this.syncService.subscribe(user.id, dto.types);
  }
}
```

### Workflows Controller

```typescript
// src/workflows/workflows.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { ExecuteWorkflowDto } from './dto/execute-workflow.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/auth.decorator';

@Controller('workflows')
@UseGuards(JwtAuthGuard)
export class WorkflowsController {
  constructor(private workflowsService: WorkflowsService) {}
  
  @Get()
  async listWorkflows(
    @CurrentUser() user: User,
    @Query('status') status?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.workflowsService.list(user.id, { status, limit, offset });
  }
  
  @Get(':id')
  async getWorkflow(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.workflowsService.findOne(user.id, id);
  }
  
  @Post()
  async createWorkflow(
    @CurrentUser() user: User,
    @Body() dto: CreateWorkflowDto,
  ) {
    // Le workflow est chiffré côté client
    return this.workflowsService.create(user.id, dto);
  }
  
  @Put(':id')
  async updateWorkflow(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateWorkflowDto,
  ) {
    return this.workflowsService.update(user.id, id, dto);
  }
  
  @Delete(':id')
  async deleteWorkflow(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.workflowsService.delete(user.id, id);
    return { success: true };
  }
  
  @Post(':id/execute')
  async executeWorkflow(
    @CurrentUser() user: User,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ExecuteWorkflowDto,
  ) {
    return this.workflowsService.execute(user.id, id, dto);
  }
}
```

---

## 💾 Database Schema

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
  publicKey     String    // Clé publique X25519 pour E2EE
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
  name          String   // En clair pour la recherche
  description   String?  // En clair
  encryptedData String   // Données chiffrées (DAG, état, etc.)
  encryptionKey String   // Clé chiffrée avec la clé du device
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
  type        String   // workflow, agent, settings, etc.
  entityId    String
  encryptedData String // Données chiffrées
  version     BigInt   @default(0n)
  vectorClock Json     // CRDT vector clock
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
  previousHash String? // Pour l'immutabilité (blockchain-like)
  hash        String
  
  user        User     @relation(fields: [userId], references: [id])
  
  @@index([userId, timestamp])
}

model Agent {
  id            String   @id @default(uuid())
  userId        String
  name          String
  description   String?
  encryptedBlueprint String // Blueprint chiffré
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

## 📋 Configuration

### .env.example

```bash
# Server
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DATABASE_URL=postgresql://genesis:password@localhost:5432/genesis?schema=public

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# E2EE
ENCRYPTION_ALGORITHM=aes-256-gcm
ENCRYPTION_KEY_LENGTH=32

# Rate Limiting
THROTTLE_TTL=60000
THROTTLE_LIMIT=100

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:5174

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# Alerting
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx
PAGERDUTY_KEY=your-pagerduty-key

# Monitoring
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
PROMETHEUS_ENABLED=true
```

### package.json

```json
{
  "name": "genesis-cloud-api",
  "version": "1.0.0",
  "description": "Genesis AI Cloud API - Zero-Knowledge Sync Hub",
  "main": "dist/src/main.js",
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/src/main",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/platform-socket.io": "^10.0.0",
    "@nestjs/websockets": "^10.0.0",
    "@nestjs/throttler": "^5.0.0",
    "@nestjs/cache-manager": "^2.0.0",
    "@nestjs/bull": "^10.0.0",
    "@nestjs/terminus": "^10.0.0",
    "@prisma/client": "^5.0.0",
    "bcrypt": "^5.1.0",
    "bull": "^4.12.0",
    "cache-manager": "^5.0.0",
    "cache-manager-redis-store": "^3.0.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "speakeasy": "^2.0.0",
    "qrcode": "^1.5.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "@types/passport-jwt": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "prisma": "^5.0.0",
    "ts-jest": "^29.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

**Version :** 1.0.0  
**Dernière mise à jour :** 28 Mars 2026  
**Statut :** ✅ Documentation Complète
