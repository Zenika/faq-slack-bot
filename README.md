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

Pour faire tourner Zenbot nous avons eu besoin de 2 features :

- **Incoming Webhooks** : permet de poster des messages dans Slack depuis une source externe.
- **Slash Commands** : permet aux utilisateurs d'effectuer des actions en tapant des commandes.
  Cette feature nécessite d'être configurée en renseignant :
  - un nom de commande (ex : _/faq_)
  - une url de requête (l'url que Slack contactera à chaque fois qu'un utilisateur entrera la commande _/faq_). Nous verrons à l'étape 3 comment obtenir cette url.
  - une courte description de la commande
  - une instruction d'utilisation (court message expliquant comment utiliser la commande).

  _ici schema_

Une fois que la configurations de l'application et ses commandes terminées, il vous faudra installer l'application depuis le volet **"Install your app to your workspace"**. Vous pourrez également choisir de distribuer votre application sur Slack, au delà de votre espace de travail.

Pour de plus amples précisions sur la création d'une application, vous pouvez consulter ceci: [Building Slack apps](https://api.slack.com/slack-apps).

And Voilà! Vous savez désormais configurer une application Slack ou Workplace. Nous allons maintenant voir comment coder un **Webhook** pour répondre aux reqûetes des utilisateurs.

## Etape 2 : La création du Webhook

#### Workplace

#### Slack

## Etape 3 : Le déploiement

#### Workplace

#### Slack
