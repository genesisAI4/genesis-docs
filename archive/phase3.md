🧠 PHASE 3 : GENESIS SINGULARITY (L'AUTONOMIE TOTALE)

👶 1. EXPLICATION SIMPLE (L'IA qui apprend à fabriquer ses outils)

Jusqu'ici, le robot ne savait faire que ce qu'on lui avait appris.
Dans la Phase 3, on lui donne une "Boîte à Outils Magique" (Igon7) ce sera une sorte de n8n mais pour les IA
. Si tu lui demandes de contrôler une application qu'il ne connaît pas, il va aller lire le manuel sur Internet, fabriquer lui-même la connexion (MCP Generator), et revenir vers toi en disant : "C'est bon, j'ai appris à utiliser cet outil, on commence ?".
Résultat : Genesis n'a plus de limites. Il peut potentiellement tout contrôler sur Terre si une API existe.

🗺️ 2. ROADMAP DÉTAILLÉE (ÉTAPE PAR ÉTAPE)

Sprint 7 : Le Générateur d'Outils (Jours 26-30)

Étape 1 : Le Crawler de Documentation. Apprendre à l'IA comment explorer un site de développeur pour comprendre comment brancher un logiciel (ex: Notion, Spotify).

Étape 2 : MCP Generator. Créer un système qui écrit du code automatiquement pour créer des "Skills" (Outils) sans que tu n'aies à coder une seule ligne.

Étape 3 : Sandbox de Test. Avant d'utiliser un nouvel outil, l'IA doit le tester dans un petit espace fermé pour vérifier qu'il ne fait pas de bêtises.

Sprint 8 : L'Auto-Guérison (Jours 31-35)

Étape 4 : Analyse d'Erreurs. Si un automatisme s'arrête (ex: un mot de passe a changé), Genesis doit t'envoyer un message : "L'outil Spotify ne marche plus, veux-tu que je le répare ?".

Étape 5 : Optimisation de Workflow. Le robot observe tes habitudes. S'il voit que tu fais la même chose tous les lundis à 8h, il te propose : "Veux-tu que j'automatise cette tâche pour lundi prochain ?".

🤖 3. PLAYBOOK POUR L'ÉQUIPE CLAUDE CODE (AGENTS)

À l'attention des Agents (Team Claude Code) :
Votre objectif est la GÉNÉRATIVITÉ.

A. Mission Critique

Développer le module mcp_generator.rs. Il doit être capable de :

Prendre un fichier JSON (Swagger/OpenAPI) en entrée.

Générer le code TypeScript/Rust nécessaire pour l'intégration.

Compiler et charger ce module à chaud (Hot-loading) sans redémarrer Genesis.

B. Sécurité de Génération

L'IA ne doit JAMAIS exécuter de code qu'elle a elle-même généré sans que le Guardian ne l'ait scanné pour vérifier qu'il n'y a pas de fonctions cachées malveillantes.