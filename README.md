# Zenbot - Un chatbot qui répond aux questions en consultant la FAQ.

Zenbot permet l'intégration (interfaçage) de l'Api de la [FAQ de Zenika](https://faq.zenika.com) au sein de messageries instantanées telles que Messenger ou Slack .

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

Un [webhook](https://en.wikipedia.org/wiki/Webhook) est une fonction de rappel HTTP (user-defined HTTP callback) généralement déclenchées lors d'un évènement (dans notre cas l'envoi d'un message à notre bot). Pour faire simple notre webhook jouera le rôle d'intermédiaire entre notre chatbot et la FAQ Zenika. Il nous permettra de recevoir, gérer et envoyer des messages. A chaque fois qu'un utilisateur écrira un message à notre bot, il sera envoyé au webhook qui effectuera une recherche auprès de l'Api de la FAQ, puis retournera une réponse (le plus souvent au format JSON) à l'utilisateur.

La création de notre webhook consiste à ajouter quelques points de terminaison (endpoints) à un serveur HTTP. Voici comment créer avec [Express](https://expressjs.com/fr/) un serveur HTTP qui écoute les demandes sur le port par défaut ou sinon sur le port 1337:

```Javascript
'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
```

#### Workplace

La configuration du webhook sur Workplace se fait en 2 étapes :

- L'ajout du endpoint de vérification du webhook. Sur ce endpoint seront envoyées des requêtes de type GET servant à vérifier le token défini lors de la création de la **"Custom Intégration"** vue à l'étape 1. Cette étape est requise par la plateforme Messenger pour garantir l'authenticité de notre webhook.

```Javascript
// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "<YOUR_VERIFY_TOKEN>"

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
```

Le processus de vérification ressemble à ce qui suit :

1. Vous créez un token vérifié. Il s’agit d’une chaîne aléatoire de votre choix, codée en dur dans votre webhook.
2. Vous fournissez votre token vérifié à la plate-forme Messenger lorsque vous inscrivez votre webhook pour qu’il reçoive les évènements webhook d’une application.
3. La plate-forme Messenger envoie une demande GET à votre webhook avec le token dans le paramètre hub.verify de la chaîne de demande.
4. Vous vérifiez que le token envoyé correspond à votre token vérifié et répond avec le paramètre hub.challenge de la demande.
5. La plate-forme Messenger inscrit votre webhook à l’application.

- L'ajout du endpoint principal. Sur ce endpoint seront envoyées des requêtes de type POST correspondant aux messages envoyés par les utilisateurs.

```Javascript
// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID (the user unique id on your bot's page)
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});
```

Vous trouverez plus de détails sur la configuration du webhook ici : [webhook setup](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup/).

Messenger définit 2 types d'évènements entrant: les **messages** et les **postbacks**.
Les messages représentent les messages textuels écrits par l'utilisateur (textos) tandis que les postbacks sont des retours (clic sur un bouton envoyé par le webhook par exemple).
Une fois notre endpoint principal configuré, nous aurons besoin de lui ajouter des fonctions de gestion d'évènements :

```Javascript
// Handles messages events
function handleMessage(sender_psid, received_message) {}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {}
```

#### Slack

## Etape 3 : Le déploiement

#### Workplace

#### Slack
