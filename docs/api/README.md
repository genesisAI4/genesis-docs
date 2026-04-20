# 📘 Contrats API Genesis — source unique de vérité

Ce dossier contient les **contrats machine-lisibles** de l'écosystème Genesis
(`genesisAI4`). Il remplace les documentations ad-hoc éparpillées.

## Fichiers

| Fichier | Format | Portée |
|---|---|---|
| [`nexus-rest.yaml`](./nexus-rest.yaml) | OpenAPI 3.1 | API REST exposée par **genesis-nexus** (localhost:8080) — health, vault, état cerveau, cognitive, events, skills, extension, mobile (Guardian HITL), marketplace, pairing. |
| [`nexus-a2a-ws.yaml`](./nexus-a2a-ws.yaml) | AsyncAPI 2.6 | Canal WebSocket A2A entre Nexus et ses tentacules (Mobile/Desktop/Extension/Igon-7/Clisis) — auth JWT, signature HMAC-SHA256, 14 types de messages, endpoint `/aion-desktop` (+ alias legacy `/clawx`). |
| [`openapi.yaml`](./openapi.yaml) | OpenAPI 3.0 | Ancien contrat public marketplace-like. **À fusionner ou archiver** après validation CEO. |
| [`workflows-api.md`](./workflows-api.md) | Markdown | Notes historiques. |

## Utilisation

### Prévisualiser dans le navigateur

**OpenAPI (nexus-rest.yaml)** — avec [Redocly CLI](https://redocly.com/docs/cli/) :
```bash
npx @redocly/cli preview-docs docs/api/nexus-rest.yaml
# ouvre http://localhost:8080 avec ReDoc
```

**AsyncAPI (nexus-a2a-ws.yaml)** — avec le [AsyncAPI Studio](https://studio.asyncapi.com/) :
```bash
npx @asyncapi/cli start studio --file docs/api/nexus-a2a-ws.yaml
```

### Valider les contrats

```bash
# OpenAPI
npx @redocly/cli lint docs/api/nexus-rest.yaml

# AsyncAPI
npx @asyncapi/cli validate docs/api/nexus-a2a-ws.yaml
```

### Générer des SDKs typés (TypeScript / Swift / Kotlin)

```bash
# Client TypeScript pour la REST API (pour genesis-mobile, genesis-desktop, genesis-cloud-api)
npx openapi-typescript docs/api/nexus-rest.yaml -o ../../sdk/nexus-rest.d.ts

# Client AsyncAPI TypeScript (types de messages WS)
npx @asyncapi/generator docs/api/nexus-a2a-ws.yaml @asyncapi/ts-nats-template \
  -o ../../sdk/nexus-ws
```

## Autorité et amendements

Ces contrats sont la **source unique de vérité** pour toute intégration
cross-repo. En cas de divergence entre le code et le contrat :

1. Si le code était correct mais le contrat en retard → **mettre à jour le contrat en premier** (PR sur `genesis-docs`) et citer le PR produisant le changement.
2. Si le code divergeait du contrat → **aligner le code sur le contrat** (le contrat n'est jamais modifié silencieusement côté consommateur).

Cohérent avec la règle d'amendement documentée dans
[`genesis-ops/ARCHITECTURE.md`](https://github.com/genesisAI4/genesis-ops/blob/main/ARCHITECTURE.md#10-amendements).

## Tier de licence

Ces contrats sont publiés en **Tier T1 (Commons)** — MIT pour que les consommateurs
(Mobile, Desktop, Extension, SDKs tiers) puissent les référencer sans contrainte.
Les implémentations peuvent être en Tier supérieur (T3 BSL pour Nexus).
