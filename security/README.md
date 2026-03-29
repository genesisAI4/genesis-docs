# 🔐 Genesis AI — Security Documentation

**Purpose:** Security model, compliance, and hardening guides

---

## 📁 Structure

```
security/
├── README.md                 # Ce fichier
├── architecture.md           # Security architecture (Zero-Knowledge, E2EE)
├── compliance.md             # RGPD, SOC2, compliance checklists
├── hardening.md              # Security hardening guides
├── threat-model.md           # STRIDE threat modeling
├── incident-response.md      # Incident response runbooks
└── audits/                   # Security audit reports
```

---

## 🔐 Security Model

### Core Principles

1. **Local-First** — Data stored locally, encrypted at rest
2. **Zero-Knowledge** — Server never sees plaintext data
3. **E2EE** — AES-GCM-256 for all sync operations
4. **Guardian** — Risk Matrix + HITL for critical actions
5. **mTLS** — Mutual TLS for all service-to-service communication

### Encryption Standards

| Layer | Algorithm | Key Size | Notes |
|-------|-----------|----------|-------|
| **Data at Rest** | AES-GCM | 256-bit | PBKDF2 100k iterations |
| **Data in Transit** | TLS 1.3 | — | mTLS for internal services |
| **Key Derivation** | PBKDF2 + HKDF | 256-bit | Salt 32 bytes |
| **Command Signing** | HMAC-SHA256 | 256-bit | Anti-replay (5 min window) |
| **JWT Auth** | RS256 | 2048-bit | Token expiry 15 min |

---

## 📋 Compliance

### RGPD (EU)

- ✅ Article 17 (Erasure) — Implémenté
- ⚠️ Article 15 (Access) — À implémenter
- ⚠️ Consent Management — À implémenter
- ⚠️ DPO Nommé — À faire
- ⚠️ DPIA — À réaliser

**Status:** ⚠️ **PARTIEL** — 8 gaps critiques

### SOC2 (US)

- ⚠️ Security Controls — Partiel
- ⚠️ Availability — K8s à déployer
- ⚠️ Confidentiality — E2EE OK, audit requis
- ❌ Privacy — RGPD gaps bloquants

**Status:** ❌ **NON COMMENCÉ**

---

## 🛡️ Hardening Guides

### Production Checklist

- [ ] MFA/2FA enabled (TOTP/WebAuthn)
- [ ] HMAC command signing configured
- [ ] mTLS enforced (all services)
- [ ] Rate limiting active (Redis)
- [ ] Security headers (Helmet)
- [ ] JWT key rotation (7 days)
- [ ] Secrets in Vault (not env vars)
- [ ] SIEM deployed (ELK/Grafana)
- [ ] Backups tested (RTO/RPO defined)

### Kubernetes Security

- [ ] Network Policies (zero-trust)
- [ ] Pod Security Standards (restricted)
- [ ] Secrets Management (external-secrets)
- [ ] Image Scanning (Trivy)
- [ ] Admission Controllers (OPA/Gatekeeper)

---

## 🚨 Incident Response

### Runbooks

1. **Security Breach** — `genesis-ops/runbooks/09-security-breach.md`
2. **Data Leak** — `genesis-ops/runbooks/10-data-leak.md`
3. **DDoS Attack** — `genesis-ops/runbooks/11-ddos.md`
4. **Credential Compromise** — `genesis-ops/runbooks/12-credentials.md`

### Contact

- **Security Team:** security@genesis-ai.ecosystem
- **Emergency:** +229-XX-XX-XX-XX (24/7)
- **CNIL (RGPD):** notifications@genesis-ai.ecosystem (72h)

---

## 📊 Security Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Vulnerabilities (Critical)** | 0 | 12 | 🔴 |
| **Dependencies (Outdated)** | <5% | 15% | 🟡 |
| **Test Coverage (Security)** | 90% | 60% | 🟡 |
| **Mean Time to Detect** | <5min | >5min | 🟡 |
| **Mean Time to Respond** | <1h | <4h | 🟡 |

---

## 🔗 Related Docs

- **Architecture:** `../architecture/README.md`
- **API Security:** `../api/security.md`
- **Threat Model:** `threat-model.md`
- **Incident Runbooks:** `genesis-ops/runbooks/`

---

**Last Updated:** 29 Mars 2026  
**Owner:** Security Team  
**Next Review:** J+30
