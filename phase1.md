🛡️ PHASE 1 : GENESIS DAWN (LE NOYAU SÉCURISÉ)

👶 1. EXPLICATION SIMPLE (La Métaphore du Robot)

Imagine que tu viens d'acheter un robot super-intelligent (OpenClaw). Le problème, c'est qu'il est tellement zélé qu'il pourrait nettoyer ta maison en jetant tes papiers importants à la poubelle.
Dans la Phase 1, nous ne touchons pas au cerveau du robot. Nous allons simplement l'enfermer dans une "Cage Transparente" (Le Guardian). S'il veut jeter un papier, il doit taper à la vitre et te demander : "Puis-je jeter ceci ?". Tu dis oui ou non.
Résultat : Tu as l'intelligence de l'IA, mais avec une sécurité absolue à 100%.

🗺️ 2. ROADMAP DÉTAILLÉE (ÉTAPE PAR ÉTAPE)

Sprint 1 : Création de la Cage (Jours 1-3)

Étape 1 : Le Socle Deno. Initialiser un projet Deno vide. C'est le nouveau "corps" de notre robot. Il est sourd, aveugle et paralysé par défaut (sécurité Deno).

Étape 2 : Le Cerveau du Guardian. Créer le fichier qui analyse les risques. Si l'IA veut lire une recette de cuisine, risque = 1. Si elle veut supprimer un dossier système, risque = 10.

Étape 3 : L'Intercepteur. Créer un "faux" terminal. Quand l'IA croit taper une commande dans ton ordinateur, elle la tape en réalité dans l'Intercepteur. C'est lui qui met l'action en pause.

Sprint 2 : Connexion et Test (Jours 4-7)

Étape 4 : L'Importation d'OpenClaw. Prendre le code "cerveau" d'OpenClaw (sa façon de réfléchir) et le brancher dans notre corps Deno.

Étape 5 : Le Pont Telegram. Connecter le Guardian à un Bot Telegram. Quand l'Intercepteur met une action en pause, il envoie un message avec deux boutons (Autoriser / Bloquer) sur ton téléphone.

Étape 6 : Le Crash Test. Demander volontairement à l'IA de faire une bêtise (ex: "Supprime mon dossier utilisateur"). Vérifier que le système bloque et t'alerte.

🤖 3. PLAYBOOK POUR L'ÉQUIPE CLAUDE CODE (AGENTS)

À l'attention des Agents de Développement (Team Claude Code) :
Ceci est votre directive stricte pour la Phase 1. Votre objectif est l'ISOLATION.

A. Structure du Projet

genesis-core/
├── deno.json           # Configuration stricte
├── src/
│   ├── main.ts         # Point d'entrée
│   ├── guardian/
│   │   ├── middleware.ts # Intercepteur des commandes système
│   │   ├── evaluator.ts  # Moteur de scoring de risque (1 à 10)
│   ├── openclaw/
│   │   ├── bridge.ts     # Wrapper pour les Skills d'OpenClaw
│   ├── mobile/
│       ├── telegram.ts   # Connecteur Bot Telegram (HITL)


B. Règles de Code Obligatoires

Deno Restrictif : Le fichier deno.json doit utiliser les compilerOptions les plus strictes. Pas de any implicite.

Le Contrat du Guardian : AUCUN module ne doit importer Deno.Command, Deno.remove, ou Deno.writeTextFile directement. Tout doit passer par Guardian.execute(intention).

Fail-Safe par défaut : Si le script evaluator.ts plante ou ne comprend pas une commande, le risque est automatiquement évalué à 10 (CRITICAL) et bloqué.

Timeout Telegram : L'attente de validation humaine via telegram.ts doit avoir un timeout de 60 secondes. Passé ce délai, l'action est REFUSÉE et l'IA est notifiée : "L'utilisateur n'a pas répondu, abandonnez la tâche."

C. Le Premier Fichier à Coder

Commencez par générer deno.json et src/guardian/evaluator.ts. L'évaluateur doit prendre une string en entrée (ex: "rm -rf /") et retourner un niveau de risque.