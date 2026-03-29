🏰 PHASE 2 : GENESIS FORTRESS (LA PERFORMANCE NATIVE)

👶 1. EXPLICATION SIMPLE (Le passage au Moteur de Course)

Dans la Phase 1, notre robot utilisait un moteur de tondeuse (Deno/TypeScript) : c'est bien pour apprendre, mais ça manque de puissance et de rapidité.
Dans la Phase 2, on remplace tout l'intérieur par un moteur de Formule 1 (Rust). Le robot devient 10 fois plus rapide, il ne s'arrête jamais, et surtout, il peut porter son propre cerveau (IA Locale) sans avoir besoin d'Internet.
Résultat : Genesis devient une application "en dur" sur ton ordi (Tauri) qui fonctionne même dans le désert.

🗺️ 2. ROADMAP DÉTAILLÉE (ÉTAPE PAR ÉTAPE)

Sprint 5 : La Mutation Rust (Jours 15-20)

Étape 1 : Le Squelette Tauri. Installer Tauri. C'est ce qui permet de transformer notre code web en une vraie application .exe ou .app ultra-légère.

Étape 2 : Réécriture du Guardian en Rust. Rust est le langage le plus sûr au monde. Réécrire la "Cage" en Rust signifie qu'aucune erreur de code ne pourra jamais laisser passer un virus.

Étape 3 : L'Inférence Locale. Installer Llama.cpp ou WasmEdge pour faire tourner l'IA (Qwen2.5-Coder) directement sur ta carte graphique (GPU).

Sprint 6 : La Mémoire Profonde (Jours 21-25)

Étape 4 : Base de Données Vectorielle. Installer une base de données locale (SurrealDB ou LanceDB). Elle permet au robot de se souvenir de tout ce que tu lui as dit il y a 6 mois en un clin d'œil.

Étape 5 : Chiffrement Total. Toutes tes données sur ton disque dur sont verrouillées par une clé que TOI seul possèdes. Même si on te vole ton ordi, personne ne peut lire tes discussions avec Genesis.

🤖 3. PLAYBOOK POUR L'ÉQUIPE CLAUDE CODE (AGENTS)

À l'attention des Agents (Team Claude Code) :
Votre objectif est l'EFFICIENCE et la NATIVITÉ.

A. Structure du Projet (Transition Rust)

src-tauri/
├── src/
│   ├── main.rs         # Le nouveau cœur ultra-rapide
│   ├── guardian.rs     # La cage de sécurité en Rust (immuable)
│   ├── ai_engine.rs    # Gestionnaire de l'IA locale (Llama/Qwen)
├── ui/                 # Ton Dashboard (React/Tailwind)


B. Règles de Code

Zéro Node/Deno en Prod : Toutes les actions critiques (fichiers, réseau) doivent être gérées par le "Backend" Rust, pas par le JavaScript du Dashboard.

Memory Safety : Utiliser les Result et Option de Rust pour gérer chaque erreur. Crash interdit.

Optimisation GPU : Détecter si l'utilisateur a une carte NVIDIA ou Apple Silicon pour accélérer l'IA automatiquement.