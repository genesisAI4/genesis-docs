---
sidebar_position: 2
---

# Genesis Ops - Installation

Guide d'installation de Genesis Ops.

---

## 📋 Prérequis

| Outil | Version | Lien |
|-------|---------|------|
| **Docker** | 24+ | https://docker.com |
| **kubectl** | 1.28+ | https://kubernetes.io |
| **Terraform** | 1.6+ | https://terraform.io |
| **Helm** | 3.13+ | https://helm.sh |

---

## 🚀 Installation

### Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh

# macOS
brew install --cask docker

# Windows
# Télécharger Docker Desktop
```

### kubectl

```bash
# macOS
brew install kubectl

# Ubuntu/Debian
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### Terraform

```bash
# macOS
brew tap hashicorp/tap
brew install hashicorp/tap/terraform

# Ubuntu/Debian
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```

---

## ⚙️ Configuration

### Docker Compose

```bash
cd genesis-ops/docker
docker-compose up -d
```

### Kubernetes

```bash
kubectl apply -f k8s/base/
```

---

**Temps estimé :** 20 minutes
