# Zenbot - Un chatbot qui répond aux questions en consultant la FAQ.

Zenbot permet l'intégration (interfaçage) de l'API de la [FAQ de Zenika](https://faq.zenika.com) au sein de messageries instantanées telles que Messenger ou Slack .

_Ce Readme présente la démarche qui a permis de créer et d'intégrer Zenbot aux plateformes [Messenger](https://developers.facebook.com/docs/messenger-platform) et [Slack](https://api.slack.com)._

## Etape 1 : La configuration d'une application

    La première étape de création d'un bot passe par la configuration d'une application qui représentera le bot et contrôlera ses accès sur la plateforme concernée.

Cette configuration se fait manuellement au niveau de chaque plateforme. Elle permet de définir tout un tas d'informations sur le bot telles que son nom, une description, les différentes permissions qui lui sont accordées, etc.

#### Workplace

Sur Workplace, il s'agit de créer une **"Custom Intégration"**. Lorqsu'on crée une **"custom intération"**, 2 objets sont en fait crées :

- Une application (avec des autorisations qui lui sont spécifiques).
- Une page de type **Bot** (uniquement visible au sein de votre communauté Workplace). Cette page servira entre autre de point d'entrée et de découverte de votre bot sur workplace.

A l'issue de cette configuration, un **token (Custom Integration token)** est généré. Ce token servira par la suite à légitimer toute les actions de votre **webhook** en tant que bot associé à l'application que vous venez de créer. Conservez le précieusement et ne le divulguez qu'aux personnes de confiance (ex: l'équipe de développement). Nous verons dans la suite de ce readme, comment utiliser ce token.

Vous trouverez plus de détails sur la création d'une application Workplace ici: [Creating Apps for Workplace](https://developers.facebook.com/docs/workplace/integrations/custom-integrations/apps).

#### Slack

Pour ce qui est de l'intégration de Zenbot dans Slack, nous avons fait le choix d'utiliser les **Slash Commands**. Les **Slash Commands** permettent à l'utilisateur d'effectuer des actions (dans notre cas des recherches) en tapant des commandes depuis slack. Par exemple, pour consulter la FAQ à propos des "notes de frais" l'utilisateur pourra taper la commande _"/faq note de frais"_ depuis slack; il verra alors s'afficher une liste de résultats correspondant à sa recherche.

La page [Mes Applications](https://api.slack.com/apps) liste l'ensemble des applications que vous possédez sur Slack. Pour en créer une nouvelle, il suffit de cliquer sur le bouton **"Create New App"** depuis cette page, puis renseigner le nom de l' application et l'espace de travail (**Development Slack Workspace**) auquel elle sera associée.

Une fois l'application créée, il va falloir la configurer. Pour ce faire, il faut se rendre sur la page de configuration de l'application en cliquant sur son nom dans la liste des applications. La page de configuration contient nombre d'informations sur l'application dont son identifiant (**App Id**), le token de vérification(**Verification Token**), etc. Cette page permet également de gérer les permissions ainsi que les différentes features (**Bot**, **Slash Commands**, etc) dont vous aurez besoin pour faire fonctionner votre application.

Pour faire tourner Zenbot nous avons eu besoin d'activer 2 features :

- **Incoming Webhooks** : permet de poster des messages dans Slack depuis une source externe.
- **Slash Commands** : permet aux utilisateurs d'effectuer des actions en tapant des commandes.
  Cette feature nécessite d'être configurée en renseignant :

  - un nom de commande (ex : _/faq_)
  - une url de requête (l'url que Slack contactera à chaque fois qu'un utilisateur entrera la commande _/faq_). Nous verrons à l'étape 3 comment obtenir cette url.
  - une courte description de la commande
  - une instruction d'utilisation (court message expliquant comment utiliser la commande).

Une fois que la configurations de l'application et ses commandes terminées, il vous faudra installer l'application depuis le volet **"Install your app to your workspace"**. Vous pourrez également choisir de distribuer votre application sur Slack, au delà de votre espace de travail.

Pour de plus amples précisions sur la création d'une application, vous pouvez consulter ceci: [Building Slack apps](https://api.slack.com/slack-apps).

And Voilà! Vous savez désormais configurer une application Slack ou Workplace. Nous allons maintenant voir comment coder un **webhook** pour répondre aux reqûetes des utilisateurs.

## Etape 2 : La création de Webhooks

Un [webhook](https://en.wikipedia.org/wiki/Webhook) est une fonction de rappel HTTP (user-defined HTTP callback) généralement déclenchées lors d'un évènement (dans notre cas l'envoi d'un message à notre bot). Pour faire simple notre webhook jouera le rôle d'intermédiaire entre notre chatbot et la FAQ Zenika. Il nous permettra de recevoir, gérer et envoyer des messages.
A chaque fois qu'un utilisateur écrira un message à notre bot, il sera envoyé au webhook qui effectuera une recherche auprès de l'Api de la FAQ, puis retournera une réponse (le plus souvent au format JSON) à l'utilisateur.
La création de notre webhook consiste à ajouter quelques points de terminaison (endpoints) à un serveur HTTP comme [Express](https://expressjs.com/fr/) par exemple.

#### Workplace

La configuration du webhook sur Workplace se fait en 2 étapes :

- L'ajout du endpoint de vérification du webhook. Sur ce endpoint seront envoyées des requêtes de type GET servant à vérifier le token défini lors de la création de la **"Custom Intégration"** vue à l'étape 1. Cette étape est requise par la plateforme Messenger pour garantir l'authenticité de notre webhook.

- L'ajout du endpoint principal. Sur ce endpoint seront envoyées des requêtes de type POST correspondant aux messages envoyés par les utilisateurs.

Vous trouverez plus de détails sur la configuration du webhook ici : [webhook setup](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup/).

Messenger définit 2 types d'évènements entrant: les **messages** et les **postbacks**.
Les messages représentent les messages textuels écrits par l'utilisateur (textos) tandis que les postbacks sont des retours (clic sur un bouton envoyé par le webhook par exemple).
Une fois notre endpoint principal configuré, nous aurons besoin de lui ajouter des fonctions de gestion d'évènements :

- une fonction _handleMessage_ pour gerer les textos.
- une fonction _handlePostback_ pour gerer les retours (clic boutons, sélections, etc).
- une fonction _callSendAPI_ permettant d'envoyer des messages à l'utilisateur via l'API Send de Messenger.
  Ce qu'il faut retenir, c'est qu'on appelle la fonction _callSendAPI_ pour envoyer une reponse lors de la réception d'un texto ou d'un retour.

```Javascript
// Handles messages events
function handleMessage(sender_psid, received_message) {
     let response;
    //...
    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;
    //...
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {}
```

#### Slack

## Etape 3 : Le déploiement

#### Workplace

#### Slack
