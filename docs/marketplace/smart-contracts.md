---
sidebar_position: 3
---

# Marketplace - Smart Contracts

Documentation des smart contracts.

---

## 📜 Contract ABI

```json
[
  {
    "inputs": [
      { "name": "recipient", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "currency", "type": "string" }
    ],
    "name": "processPayment",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "transactionHash", "type": "bytes32" },
      { "name": "percentage", "type": "uint256" }
    ],
    "name": "distributeRoyalties",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "transactionId", "type": "bytes32" },
      { "indexed": true, "name": "buyer", "type": "address" },
      { "indexed": true, "name": "seller", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" }
    ],
    "name": "PaymentProcessed",
    "type": "event"
  }
]
```

---

## 💻 Exemple d'utilisation

```typescript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

// Process payment
async function processPayment(recipient: string, amount: number) {
  const tx = await contract.processPayment(
    recipient,
    ethers.parseUnits(amount.toString(), 18),
    'USD'
  );
  await tx.wait();
  return tx.hash;
}

// Distribute royalties
async function distributeRoyalties(txHash: string, percentage: number) {
  const tx = await contract.distributeRoyalties(txHash, percentage);
  await tx.wait();
}
```

---

## 📊 Events

| Event | Description |
|-------|-------------|
| **PaymentProcessed** | Paiement effectué |
| **RoyaltyDistributed** | Royalties distribuées |
| **AgentPublished** | Agent publié |
| **AgentPurchased** | Agent acheté |

---

**Version :** 1.0.0
