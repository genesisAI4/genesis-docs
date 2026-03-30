a présent appellons le copywriter, le marketer, le designer, l'ui/ux, etc nous devons remplir chacun des interfaces de facon approprié pour que tout fonctionne et pour que cela fasses vraiment professionel.

passer à la phase de "Production Hardening" (SSL/TLS, Rate Limiting)
(Note: En production réelle, j'utiliserais un bundler comme esbuild, mais ici je vais appliquer une structure de code plus condensée
directement).

🌐 PHASE 1.5 : GENESIS NEXUS (L'OMNIPOTENCE)

👶 1. EXPLICATION SIMPLE (La Métaphore du Chef d'Orchestre)

Dans la Phase 1, on a sécurisé le robot. Mais pour lui parler, il fallait être devant son ordinateur. C'est nul.
Dans la Phase 1.5, nous créons un "Nexus" (un centre de contrôle). Tu envoies un SMS sur WhatsApp à ton robot. Le Nexus reçoit le message, réveille le robot sur ton PC, le robot réfléchit, et la réponse s'affiche à la fois sur ton WhatsApp ET sur un magnifique tableau de bord sur ton écran d'ordinateur. Tout est synchronisé en direct, comme par magie. Tu contrôles ta machine depuis ton téléphone, en langage naturel.

🗺️ 2. ROADMAP DÉTAILLÉE (ÉTAPE PAR ÉTAPE)

Sprint 3 : Le Cœur de Synchronisation (Jours 8-10)

Étape 1 : Le Serveur Local. Deno n'est plus un simple script, il devient un mini-serveur web (localhost:8080) qui tourne en arrière-plan sur ta machine.

Étape 2 : L'État Unifié (Unified State). Créer une "mémoire centrale" dans Deno. Si un message arrive, il est stocké ici. Si une action est bloquée, elle est stockée ici.

Étape 3 : Les WebSockets. Ajouter des tuyaux de communication ultra-rapides pour que dès que la "mémoire centrale" change, l'écran de l'ordinateur se mette à jour instantanément sans avoir besoin de rafraîchir la page.

Sprint 4 : Les Portes d'Entrée (Gateways) (Jours 11-14)

Étape 4 : L'Intégration WhatsApp/Telegram. Brancher une ligne directe entre WhatsApp et ton serveur local. Tu envoies "Salut", ton serveur Deno le reçoit.

Étape 5 : Le Tableau de Bord Web (UI). Créer une belle page web (HTML/Tailwind) qui se connecte au serveur local. Elle doit afficher la discussion en cours et les actions en attente de validation.

Étape 6 : La Pensée Visible. Quand l'IA reçoit un ordre via WhatsApp, elle doit envoyer son processus de réflexion ("Je cherche le fichier... Je le trouve... Je le modifie...") au Tableau de Bord pour que tu voies l'IA "travailler" en direct.

🤖 3. PLAYBOOK POUR L'ÉQUIPE CLAUDE CODE (AGENTS)

À l'attention des Agents de Développement (Team Claude Code) :
Ceci est votre directive stricte pour la Phase 1.5. Votre objectif est la SYNCHRONISATION TEMPS RÉEL et l'UX.

A. Structure du Projet (Ajouts)

genesis-core/
├── src/
│ ├── server/
│ │ ├── nexus.ts # Serveur HTTP & WebSocket (Deno)
│ │ ├── state.ts # Le "Unified State" (Stockage en mémoire)
│ ├── gateways/
│ │ ├── webhook.ts # Récepteur pour les messages WhatsApp/Telegram
├── public/
│ ├── index.html # Le Dashboard Web "Apple-Style"
│ ├── app.js # Logique WebSocket côté client

B. Règles de Code Obligatoires

Single Source of Truth (SSOT) : Le fichier state.ts est le roi. Aucun autre module ne doit stocker l'historique des conversations. Quand state.ts est mis à jour, il doit déclencher un broadcast() via WebSockets à tous les clients connectés.

Architecture Non-Bloquante : L'IA (GenesisCore) met du temps à réfléchir. L'appel à l'IA ne doit JAMAIS bloquer le serveur HTTP. Utilisez des Promises/Workers pour que le serveur Nexus puisse continuer de recevoir des messages WhatsApp pendant que l'IA réfléchit.

Esthétique Front-End : Le fichier index.html doit utiliser Tailwind CSS via CDN.

Fond très sombre (bg-[#0a0a0a]).

Panneaux translucides (bg-white/5 backdrop-blur-md).

Couleurs sémantiques : Bleu pour les messages, Vert pour l'autorisation, Orange/Rouge pour le Guardian (Alertes).

Visualisation de la "Chain of Thought" : Le bridge GenesisCore doit émettre des événements THINKING_STEP. Le frontend doit les attraper et les afficher avec une légère opacité (opacity-50) sous forme de liste défilante pour montrer que l'IA travaille.

C. Le Premier Fichier à Coder

Commencez par générer src/server/state.ts (la mémoire) et src/server/nexus.ts (le serveur qui expose cette mémoire via WebSocket). Le serveur doit servir le dossier public/.
