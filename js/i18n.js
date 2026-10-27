/* Language: French browsers get the French page, every other language gets English.
   Override with ?lang=fr or ?lang=en (remembered for the visit). */
(() => {
  const html = document.documentElement;
  let lang = null;
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'fr' || q === 'en') { lang = q; localStorage.setItem('nira-lang', q); }
    else lang = localStorage.getItem('nira-lang');
  } catch (e) {}
  if (!lang) {
    const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'fr'];
    lang = /^fr\b/i.test(prefs[0]) ? 'fr' : 'en';
  }

  // FR / EN switch in the header
  const addSwitch = () => {
    const make = () => {
      const s = document.createElement('div');
      s.className = 'lang-switch';
      s.setAttribute('aria-label', 'Language');
      ['fr', 'en'].forEach((l) => {
        const a = document.createElement('a');
        a.href = '?lang=' + l + location.hash;
        a.textContent = l.toUpperCase();
        a.hreflang = l;
        if (l === lang) { a.className = 'is-active'; a.setAttribute('aria-current', 'true'); }
        s.appendChild(a);
      });
      return s;
    };
    document.querySelectorAll('.nav__actions').forEach((n) => n.insertBefore(make(), n.firstChild));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addSwitch);
  else addSwitch();

  if (lang === 'fr') return;

  const EN = {
    // Head
    "Nira Consulting | Automatisation & IA": "Nira Consulting | Automation & AI",
    "Audit, conception et déploiement d’automatisations sur mesure pour accélérer la croissance de votre entreprise avec l'Intelligence Artificielle.": "Audit, design and deployment of custom automations to accelerate your company's growth with Artificial Intelligence.",
    "Audit, conception et déploiement d’automatisations sur mesure.": "Audit, design and deployment of custom automations.",
    // Header & nav
    "Aller au contenu": "Skip to content",
    "Audit gratuit de 30 minutes pour identifier vos gisements de productivité.": "Free 30-minute audit to uncover your productivity gains.",
    "Réserver mon audit": "Book my audit",
    "Nira, accueil": "Nira, home",
    "Navigation principale": "Main navigation",
    "Approche": "Approach",
    "01. Audit & Découverte": "01. Audit & Discovery",
    "Cartographie de vos processus actuels": "Mapping of your current processes",
    "02. Conception": "02. Design",
    "Priorisation impact/effort et architecture": "Impact/effort prioritization and architecture",
    "03. Déploiement": "03. Deployment",
    "Tests, formation et mise en production": "Testing, training and go-live",
    "04. Suivi & Optimisation": "04. Monitoring & Optimization",
    "Monitoring continu et ajustements": "Continuous monitoring and adjustments",
    "Cas d'usage": "Use cases",
    "Factures": "Invoices",
    "Lues par l'IA et saisies à votre place": "Read by AI and entered for you",
    "Nouveaux contacts": "New contacts",
    "Triés et transmis au bon commercial": "Sorted and sent to the right salesperson",
    "Questions reçues": "Incoming questions",
    "Classées, avec une réponse proposée": "Categorized, with a suggested reply",
    "Relances prospects": "Prospect follow-ups",
    "Envoyées au bon moment, sans oubli": "Sent at the right time, never forgotten",
    "Appels d'offres": "Tenders",
    "Lus par l'IA, premier jet rédigé": "Read by AI, first draft written",
    "Logiciel sur mesure": "Custom software",
    "Tous vos outils sur un seul écran": "All your tools on one screen",
    "Anatomie d'une automatisation": "Anatomy of an automation",
    "Voyez comment un email devient une ligne dans votre ERP": "See how an email becomes a line in your ERP",
    "Voir comment ça fonctionne": "See how it works",
    "Demander un audit": "Request an audit",
    "Ouvrir le menu": "Open menu",
    "Fermer le menu": "Close menu",
    // Hero
    "Automatisez vos": "Automate your",
    "processus": "processes",
    "grâce à l'IA": "with AI",
    "Audit, conception et déploiement d’automatisations sur mesure, pour que vos équipes arrêtent de copier-coller et se concentrent sur ce qui compte.": "Audit, design and deployment of custom automations, so your teams stop copy-pasting and focus on what matters.",
    "Collaborateur Nira utilisant l'IA": "Nira team member using AI",
    "Ils nous font confiance.": "They trust us.",
    "PME, ETI et groupes internationaux.": "SMEs, mid-size companies and international groups.",
    "Logos clients": "Client logos",
    "Audit & Découverte": "Audit & Discovery",
    "On cartographie vos processus et on chiffre le ROI avant tout engagement": "We map your processes and quantify the ROI before any commitment",
    "Cas d'usage concrets": "Real use cases",
    "Factures, contacts, support, relances, appels d'offres": "Invoices, contacts, support, follow-ups, tenders",
    // Method
    "Notre méthode": "Our method",
    "Comment on": "How we",
    "automatise": "automate",
    "votre entreprise": "your business",
    "4 étapes simples, de la première analyse au suivi.": "4 simple steps, from first analysis to ongoing support.",
    "Commencer par un audit": "Start with an audit",
    "Voir la vidéo : notre méthode expliquée": "Watch the video: our method explained",
    "Notre méthode en vidéo": "Our method on video",
    "On analyse vos tâches et on repère ce qui peut être automatisé.": "We analyze your tasks and spot what can be automated.",
    "Conception": "Design",
    "On choisit les automatisations les plus rentables et on les dessine avec vous.": "We pick the most profitable automations and design them with you.",
    "Déploiement": "Deployment",
    "On les construit, on les teste et on les branche sur vos outils.": "We build them, test them and plug them into your tools.",
    "Suivi": "Follow-up",
    "On surveille, on corrige et on améliore en continu.": "We monitor, fix and improve continuously.",
    // Examples
    "Trouvé lors de nos audits": "Found during our audits",
    "Des exemples de tâches qu'on automatise": "Examples of tasks we automate",
    "Choisissez un exemple pour voir, étape par étape, ce qui se passe.": "Pick an example to see what happens, step by step.",
    "Exemples d'automatisations": "Automation examples",
    "Avant": "Before",
    "Chaque facture était recopiée à la main.": "Every invoice was retyped by hand.",
    "Les demandes attendaient dans une boîte mail.": "Requests sat waiting in an inbox.",
    "Les questions s'empilaient sans réponse.": "Questions piled up unanswered.",
    "Les relances étaient oubliées ou faites trop tard.": "Follow-ups were forgotten or sent too late.",
    "Chaque réponse demandait des jours de copier-coller.": "Every bid took days of copy-pasting.",
    "L'équipe jonglait entre 4 outils en même temps.": "The team juggled 4 tools at once.",
    "La facture arrive par email": "The invoice arrives by email",
    "Elle est repérée tout de suite.": "It's spotted right away.",
    "L'IA la lit": "AI reads it",
    "Elle relève le montant, la TVA et le fournisseur.": "It picks out the amount, VAT and supplier.",
    "Votre logiciel est rempli": "Your software is filled in",
    "Les infos sont saisies à votre place.": "The data is entered for you.",
    "Tout est vérifié": "Everything is checked",
    "En cas de doute, une personne est prévenue.": "If in doubt, a person is alerted.",
    "Quelqu'un remplit votre formulaire": "Someone fills in your form",
    "Sa demande arrive tout de suite.": "Their request arrives instantly.",
    "L'IA la trie": "AI sorts it",
    "Elle repère les demandes les plus importantes.": "It flags the most important requests.",
    "Le bon commercial est prévenu": "The right salesperson is notified",
    "Avec toutes les infos pour rappeler vite.": "With everything needed to call back fast.",
    "Votre fichier est à jour": "Your database is up to date",
    "Aucun contact ne se perd.": "No contact gets lost.",
    "Une question arrive": "A question comes in",
    "Email, chat ou formulaire : tout arrive au même endroit.": "Email, chat or form: everything lands in one place.",
    "L'IA la classe": "AI categorizes it",
    "Elle repère le sujet et l'urgence.": "It identifies the topic and urgency.",
    "Une réponse est proposée": "A reply is suggested",
    "Votre équipe la valide en un clic.": "Your team approves it in one click.",
    "Les cas difficiles remontent": "Tricky cases are escalated",
    "À la bonne personne, sans oubli.": "To the right person, never forgotten.",
    "Un devis est envoyé": "A quote is sent",
    "Le suivi démarre tout seul.": "Follow-up starts on its own.",
    "Pas de réponse ?": "No reply?",
    "Une relance personnalisée part au bon moment.": "A personalized reminder goes out at the right time.",
    "L'IA lit les réponses": "AI reads the replies",
    "Elle repère qui est vraiment intéressé.": "It spots who is genuinely interested.",
    "Le commercial reprend la main": "The salesperson takes over",
    "Il appelle les bonnes personnes, au bon moment.": "They call the right people at the right time.",
    "L'appel d'offres arrive": "The tender arrives",
    "L'IA lit tout le cahier des charges.": "AI reads the full specification.",
    "Les points clés sont relevés": "Key points are extracted",
    "Délais, critères et documents à fournir.": "Deadlines, criteria and required documents.",
    "Un premier jet est rédigé": "A first draft is written",
    "À partir de vos anciennes réponses.": "Based on your past bids.",
    "Votre équipe relit et valide": "Your team reviews and approves",
    "Elle garde toujours le dernier mot.": "They always have the final say.",
    "On fait le tour de vos outils": "We review your tools",
    "Et des infos éparpillées entre eux.": "And the data scattered across them.",
    "On crée votre logiciel": "We build your software",
    "Simple, pensé pour votre métier.": "Simple, designed for your business.",
    "Tout est au même endroit": "Everything in one place",
    "Contacts, documents, suivi : un seul écran.": "Contacts, documents, tracking: one screen.",
    "L'IA vous assiste": "AI assists you",
    "Elle remplit, trie et vous prévient.": "It fills in, sorts and alerts you.",
    // Projects
    "Nos réalisations": "Our work",
    "Des projets sur": "Projects on",
    "4 continents": "4 continents",
    "Cliquez sur un pays pour voir ce qu'on y a construit.": "Click a country to see what we built there.",
    "pays": "countries",
    "Choisir un pays": "Choose a country",
    "Belgique": "Belgium",
    "États-Unis": "United States",
    "Maroc": "Morocco",
    "Malaisie": "Malaysia",
    "Projet précédent": "Previous project",
    "Projet suivant": "Next project",
    "France · Communication & publicité": "France · Communications & advertising",
    "Libérer les équipes des tâches répétitives": "Freeing teams from repetitive tasks",
    "Audit des tâches à faible valeur dans les équipes": "Audit of low-value tasks across teams",
    "Automatisation des comptes rendus et du reporting": "Automated meeting notes and reporting",
    "Formation des équipes à l'IA au quotidien": "Training teams to use AI day to day",
    "Belgique · Aéronautique": "Belgium · Aerospace",
    "Fiabiliser le traitement des documents techniques": "Making technical document processing reliable",
    "Cartographie des flux de commandes et de documents": "Mapping of order and document flows",
    "Extraction automatique des données vers l'ERP": "Automatic data extraction into the ERP",
    "Contrôles intégrés avant chaque saisie": "Built-in checks before every entry",
    "États-Unis · Santé": "United States · Healthcare",
    "Maîtriser l'usage de l'IA et sécuriser le lancement du site": "Controlling AI usage and securing the website launch",
    "Audit de l'usage de l'IA dans les équipes R&D et métier": "Audit of AI usage in R&D and business teams",
    "Deux assistants pour suivre les coûts IA : un bot Slack et une extension Claude": "Two assistants to track AI costs: a Slack bot and a Claude extension",
    "Revue du nouveau site avant sa mise en ligne": "Review of the new website before launch",
    "pages revues": "pages reviewed",
    "assistants IA": "AI assistants",
    "Maroc · Santé": "Morocco · Healthcare",
    "Repenser la gestion de l'information": "Rethinking information management",
    "« […] ils ont repensé toute notre façon de gérer l'information. Le ROI a été visible dès le premier mois d'utilisation. »": "“[…] they rethought our whole way of managing information. The ROI was visible from the very first month.”",
    "er": "st",
    "mois pour voir le ROI": "month to see the ROI",
    "Malaisie · Cartes à collectionner": "Malaysia · Trading cards",
    "Répondre aux prospects et trouver l'info plus vite": "Answering prospects and finding information faster",
    "Réponse automatique aux prospects sur WhatsApp": "Automatic replies to prospects on WhatsApp",
    "Sourcing d'informations automatisé": "Automated information sourcing",
    "Photo d'Alexandre Lin": "Photo of Alexandre Lin",
    // Engineering
    "L'automatisation pilotée par": "Automation driven by",
    "l'ingénierie.": "engineering.",
    "Chez Nira, chaque solution est conçue par une équipe d'ingénieurs et de développeurs. Du travail solide, pensé pour durer.": "At Nira, every solution is built by a team of engineers and developers. Solid work, built to last.",
    "Cybersécurité": "Cybersecurity",
    "Vos données sont protégées à chaque étape, avec des règles strictes.": "Your data is protected at every step, under strict rules.",
    "On surveille et on entretient vos solutions dans la durée.": "We monitor and maintain your solutions over time.",
    // Departments
    "Des automatisations connectées qui orchestrent le travail en coulisses, dans chaque département": "Connected automations that orchestrate work behind the scenes, in every department",
    "Des leads qualifiés avant même d'être lus": "Leads qualified before they're even read",
    "Enrichissement automatique de chaque nouveau contact.": "Automatic enrichment of every new contact.",
    "Qualification et scoring par IA, selon vos critères.": "AI qualification and scoring, based on your criteria.",
    "Synchronisation instantanée dans votre CRM.": "Instant sync to your CRM.",
    "En savoir plus": "Learn more",
    "Nouveaux leads": "New leads",
    "Typeform · Directrice financière": "Typeform · CFO",
    "92 · Chaud": "92 · Hot",
    "67 · Tiède": "67 · Warm",
    "Site web · CEO": "Website · CEO",
    "88 · Chaud": "88 · Hot",
    "3 fiches synchronisées dans le CRM": "3 records synced to the CRM",
    "Vos PDF deviennent des données exploitables": "Your PDFs become usable data",
    "Extraction intelligente depuis vos factures, contrats et PDF.": "Smart extraction from your invoices, contracts and PDFs.",
    "Contrôle des champs clés avant intégration.": "Key fields checked before import.",
    "Envoi direct vers vos bases de données et votre ERP.": "Sent straight to your databases and ERP.",
    "Historique": "History",
    "Fournisseur": "Supplier",
    "N° de facture": "Invoice no.",
    "Montant HT": "Amount excl. VAT",
    "TVA (20 %)": "VAT (20%)",
    "Échéance": "Due date",
    "Envoyer vers l'ERP": "Send to ERP",
    "Support Client": "Customer Support",
    "Chaque ticket arrive au bon endroit": "Every ticket lands in the right place",
    "Qualification automatique des tickets entrants.": "Automatic triage of incoming tickets.",
    "Réponses suggérées par l'IA à vos agents.": "AI-suggested replies for your agents.",
    "Escalade intelligente vers le bon interlocuteur.": "Smart escalation to the right person.",
    "Retard de livraison": "Delivery delay",
    "il y a 2 min": "2 min ago",
    "Modifier ma facture": "Change my invoice",
    "il y a 9 min": "9 min ago",
    "Facturation": "Billing",
    "Accès compte": "Account access",
    "il y a 14 min": "14 min ago",
    "Technique": "Technical",
    "Réponse suggérée": "Suggested reply",
    "« Bonjour, votre commande est partie ce matin. Voici votre lien de suivi… »": "“Hello, your order shipped this morning. Here is your tracking link…”",
    "Envoyer": "Send",
    "Escalader → N2": "Escalate → L2",
    "Opérations Internes": "Internal Operations",
    "Des process internes qui tournent tout seuls": "Internal processes that run themselves",
    "Onboarding fluide des nouveaux collaborateurs.": "Smooth onboarding for new hires.",
    "Gestion des congés automatisée.": "Automated leave management.",
    "Synchronisation entre tous vos départements.": "Sync across all your departments.",
    "Congés": "Leave",
    "Arrivée lundi": "Starts Monday",
    "Compte Google Workspace créé": "Google Workspace account created",
    "Accès Slack et Notion ouverts": "Slack and Notion access granted",
    "Contrat envoyé pour signature": "Contract sent for signature",
    "Matériel commandé": "Equipment ordered",
    "En cours": "In progress",
    "Planning d'intégration partagé": "Onboarding schedule shared",
    "Reporting & Veille": "Reporting & Monitoring",
    "Des rapports qui se génèrent tout seuls": "Reports that write themselves",
    "Rapports consolidés générés automatiquement.": "Consolidated reports generated automatically.",
    "Alertes sur mesure basées sur vos KPIs.": "Custom alerts based on your KPIs.",
    "Une vision claire, sans export manuel.": "A clear view, with no manual exports.",
    "Rapport hebdo": "Weekly report",
    "Alertes": "Alerts",
    "Lundi 8:00": "Monday 8:00",
    "Tickets clos": "Tickets closed",
    "Alerte KPI envoyée à la direction": "KPI alert sent to management",
    "Handoffs inter-outils": "Cross-tool handoffs",
    "La glu intelligente entre vos logiciels": "The smart glue between your software",
    "Vos outils existants enfin connectés entre eux.": "Your existing tools, finally connected.",
    "Finies les doubles saisies.": "No more double data entry.",
    "Monitoring temps réel de chaque flux.": "Real-time monitoring of every flow.",
    // Testimonials
    "Témoignages clients": "Client testimonials",
    "Nira n'a pas seulement déployé un outil, ils ont repensé toute notre façon de gérer l'information. Le ROI a été visible dès le premier mois d'utilisation.": "Nira didn't just deploy a tool, they rethought our whole way of managing information. The ROI was visible from the very first month.",
    "L'audit de Nira a radicalement changé ma vision de l'Intelligence Artificielle. Ils nous ont montré comment l'IA peut fluidifier la communication avec nos équipes créatives au quotidien.": "Nira's audit radically changed my view of Artificial Intelligence. They showed us how AI can streamline day-to-day communication with our creative teams.",
    "Directeur associé, 4success Groupe": "Managing Partner, 4success Group",
    "Témoignage précédent": "Previous testimonial",
    "Témoignage suivant": "Next testimonial",
    "4success Groupe": "4success Group",
    // Dashboard
    "Voyez ce que ça donne dans votre entreprise": "See what it looks like in your business",
    "Automatisations": "Automations",
    "Rapports": "Reports",
    "Connecteurs": "Connectors",
    "Automatisations actives": "Active automations",
    "Cette semaine": "This week",
    "Déclencheur": "Trigger",
    "Exécutions": "Runs",
    "Statut": "Status",
    "Tri des emails fournisseurs": "Supplier email sorting",
    "Opérationnel": "Running",
    "Qualification des leads": "Lead qualification",
    "Tickets support": "Support tickets",
    "Rapport hebdo direction": "Weekly management report",
    "Planifié": "Scheduled",
    // FAQ
    "Les questions qu'on nous pose d'abord": "The questions we get asked first",
    "Combien de temps faut-il pour voir les premiers résultats ?": "How long until we see the first results?",
    "Grâce à notre approche itérative, les premiers résultats (les « quick wins ») sont généralement visibles dès les deux premières semaines suivant l'audit. Nous priorisons toujours les automatisations ayant le plus fort ratio Impact/Effort.": "Thanks to our iterative approach, the first results (the “quick wins”) are usually visible within two weeks of the audit. We always prioritize the automations with the highest impact/effort ratio.",
    "Est-ce que mes données sont sécurisées avec l'IA ?": "Is my data secure with AI?",
    "Absolument. Nous n'utilisons que des API d'entreprise conformes RGPD avec des politiques strictes de non-entraînement (zéro data retention). Vos données restent les vôtres, privées et chiffrées.": "Absolutely. We only use GDPR-compliant enterprise APIs with strict no-training policies (zero data retention). Your data stays yours, private and encrypted.",
    "Faut-il changer tous nos outils actuels ?": "Do we need to change all our current tools?",
    "Non, c'est tout l'inverse. Nira se connecte à votre écosystème existant (HubSpot, Salesforce, Slack, Google Workspace, etc.). Notre travail est de créer la « glu » intelligente entre les logiciels que vos équipes maîtrisent déjà.": "No, quite the opposite. Nira connects to your existing ecosystem (HubSpot, Salesforce, Slack, Google Workspace, etc.). Our job is to build the smart “glue” between the software your teams already know.",
    "Comment facturez-vous vos prestations ?": "How do you charge for your services?",
    "Nous fonctionnons sous forme de forfaits d'intégration fixes ou d'abonnements mensuels (pour la maintenance et l'évolution continue). Le ROI est toujours chiffré avant tout engagement, garantissant un investissement rentable.": "We work with fixed-price integration packages or monthly subscriptions (for maintenance and continuous improvement). The ROI is always quantified before any commitment, so your investment pays off.",
    "Que se passe-t-il si une automatisation casse ?": "What happens if an automation breaks?",
    "Nous incluons un monitoring temps réel sur l'ensemble de nos architectures. Si une API change ou qu'une erreur survient, nous sommes alertés instantanément et intervenons souvent avant même que vous ne le remarquiez.": "We include real-time monitoring across all our architectures. If an API changes or an error occurs, we're alerted instantly and often step in before you even notice.",
    // CTA
    "Montrez-nous le processus qui vous": "Show us the process that",
    "coûte le plus": "costs you the most",
    "Les entreprises qui intègrent l'IA aujourd'hui prennent une avance décisive. Demandez votre audit gratuit de 30 minutes pour identifier vos gisements de productivité.": "Companies adopting AI today are gaining a decisive edge. Request your free 30-minute audit to uncover your productivity gains.",
    "Demander un audit gratuit": "Request a free audit",
    "Voir nos cas d'usage": "See our use cases",
    "Six exemples concrets, expliqués étape par étape.": "Six real examples, explained step by step.",
    "d'audit gratuit, sans engagement": "free audit, no commitment",
    "réponse sous 24 h ouvrées": "reply within 24 business hours",
    "confidentialité totale garantie": "full confidentiality guaranteed",
    // Footer
    "L'agence d'automatisation nouvelle génération": "The next-generation automation agency",
    "Nous transformons vos processus complexes en workflows parfaitement huilés grâce à l'IA.": "We turn your complex processes into smooth-running workflows with AI.",
    "Réserver un audit de 30 min": "Book a 30-min audit",
    "Agence": "Agency",
    "Notre approche": "Our approach",
    "Pourquoi Nira ?": "Why Nira?",
    "Légal": "Legal",
    "Mentions légales": "Legal notice",
    "Politique de confidentialité": "Privacy policy",
    "CGV": "Terms of sale",
    "Prendre rendez-vous": "Book a meeting",
    "Nira. Tous droits réservés.": "Nira. All rights reserved.",
    "Fait avec ♥ à Paris.": "Made with ♥ in Paris.",
    "Vidéo de présentation Nira": "Nira presentation video",
    "Découvrir Nira en action": "See Nira in action",
    "Fermer la vidéo": "Close video",
    "Fermer": "Close",
    "Votre navigateur ne prend pas en charge la lecture de cette vidéo.": "Your browser does not support video playback.",
    "Méthodologie Nira": "Nira methodology",
    "Notre méthode expliquée": "Our method explained",
    // 404
    "Page introuvable | Nira Consulting": "Page not found | Nira Consulting",
    "Cette page n’existe pas ou a été déplacée.": "This page doesn't exist or has been moved.",
    "Retour au site": "Back to the site",
    "Cette page est": "This page could not be",
    "introuvable": "found",
    "Elle a peut-être été déplacée, ou l’adresse contient une erreur. Le reste du site, lui, fonctionne très bien.": "It may have been moved, or the address contains a typo. The rest of the site works just fine.",
    "Retour à l’accueil": "Back to home",
    // Legal pages: shared
    "Fil d'Ariane": "Breadcrumb",
    "Accueil": "Home",
    "Dernière mise à jour : 13 octobre 2026": "Last updated: October 13, 2026",
    "Sommaire": "Contents",
    "Une question ?": "Any questions?",
    "Réservez un échange de 30 minutes avec notre équipe.": "Book a 30-minute call with our team.",
    "Autres documents légaux": "Other legal documents",
    "Vos données, leur usage et vos droits (RGPD)": "Your data, how it's used and your rights (GDPR)",
    "Conditions générales de vente": "Terms and conditions of sale",
    "Devis, paiement et livrables de nos prestations": "Quotes, payment and deliverables for our services",
    "Éditeur, hébergement et propriété intellectuelle": "Publisher, hosting and intellectual property",
    // Mentions légales
    "Mentions légales | Nira Consulting": "Legal notice | Nira Consulting",
    "Mentions légales du site Nira Consulting : éditeur, hébergement, propriété intellectuelle et responsabilité.": "Nira Consulting legal notice: publisher, hosting, intellectual property and liability.",
    "Informations sur l’éditeur et l’hébergeur du site nira-ia.com, conformément à l’article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN).": "Information about the publisher and host of nira-ia.com, pursuant to Article 6 of French Law No. 2004-575 of June 21, 2004 on confidence in the digital economy (LCEN).",
    "Éditeur du site": "Site publisher",
    "Hébergement": "Hosting",
    "Propriété intellectuelle": "Intellectual property",
    "Limitation de responsabilité": "Limitation of liability",
    "Données personnelles": "Personal data",
    "Droit applicable": "Governing law",
    "Le site": "The site",
    "est édité par": "is published by",
    "Nom commercial": "Trade name",
    "Le site est hébergé par": "The site is hosted by",
    ", 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (": ", 440 N Barranca Ave #4133, Covina, CA 91723, United States (",
    "L’ensemble des contenus présents sur le site (textes, graphismes, logos, éléments visuels, vidéos, icônes et code source) est la propriété exclusive de Nira Consulting, sauf mention contraire.": "All content on the site (text, graphics, logos, visuals, videos, icons and source code) is the exclusive property of Nira Consulting, unless otherwise stated.",
    "Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site est strictement interdite sans l’autorisation écrite préalable de Nira Consulting.": "Any reproduction, representation, modification, publication or adaptation of all or part of the site is strictly prohibited without the prior written consent of Nira Consulting.",
    "Les noms et logos des clients présentés sur le site restent la propriété de leurs titulaires respectifs. Ils sont reproduits uniquement pour illustrer les projets réalisés.": "Client names and logos shown on the site remain the property of their respective owners. They are reproduced solely to illustrate completed projects.",
    "Nira Consulting s’efforce de fournir des informations aussi précises que possible. Toutefois, l’entreprise ne pourra être tenue responsable des omissions, inexactitudes et carences dans la mise à jour des informations.": "Nira Consulting strives to provide information that is as accurate as possible. However, the company cannot be held liable for omissions, inaccuracies or outdated information.",
    "Le site contient des liens vers des services tiers, notamment Calendly pour la prise de rendez-vous. Nira Consulting n’exerce aucun contrôle sur ces services et ne peut être tenue responsable de leur contenu ou de leur fonctionnement.": "The site contains links to third-party services, including Calendly for booking meetings. Nira Consulting has no control over these services and cannot be held liable for their content or operation.",
    "La collecte et le traitement de vos données personnelles sont détaillés dans notre": "The collection and processing of your personal data are described in our",
    "politique de confidentialité": "privacy policy",
    "Les présentes mentions légales sont régies par le droit français.": "This legal notice is governed by French law.",
    // Privacy
    "Politique de confidentialité | Nira Consulting": "Privacy policy | Nira Consulting",
    "Comment Nira Consulting collecte, utilise et protège vos données personnelles, et comment exercer vos droits (RGPD).": "How Nira Consulting collects, uses and protects your personal data, and how to exercise your rights (GDPR).",
    "Chez Nira Consulting (SIRET : 951 653 476 00014), nous accordons une importance capitale à la protection de vos données personnelles et au respect de votre vie privée, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.": "At Nira Consulting (SIRET: 951 653 476 00014), we place the utmost importance on protecting your personal data and respecting your privacy, in accordance with the General Data Protection Regulation (GDPR) and the French Data Protection Act.",
    "Responsable du traitement": "Data controller",
    "Données collectées": "Data collected",
    "Utilisation des données": "Use of data",
    "Prestataires et transferts": "Service providers and transfers",
    "Durée de conservation": "Retention period",
    "Sécurité": "Security",
    "Vos droits": "Your rights",
    "Vos données, vos droits": "Your data, your rights",
    "Une question sur l’usage de vos données ? Parlons-en de vive voix.": "A question about how your data is used? Let's talk.",
    "Le responsable du traitement est Nira Consulting (SIRET 951 653 476 00014).": "The data controller is Nira Consulting (SIRET 951 653 476 00014).",
    "Pour toute question relative à vos données, contactez-nous via notre page de": "For any question about your data, contact us via our",
    "prise de rendez-vous": "booking page",
    "Nous collectons uniquement les données personnelles que vous nous fournissez volontairement lors de la demande d’audit (prise de rendez-vous) ou de nos échanges :": "We only collect the personal data you voluntarily provide when requesting an audit (booking a meeting) or during our exchanges:",
    "Nom et prénom": "First and last name",
    "Adresse e-mail professionnelle": "Work email address",
    "Nom d’entreprise": "Company name",
    "Numéro de téléphone (optionnel)": "Phone number (optional)",
    "Description de vos besoins en automatisation": "Description of your automation needs",
    "La simple consultation du site ne donne lieu à aucune collecte de données à des fins de mesure d’audience ou de publicité. Comme tout hébergeur, notre prestataire peut conserver des journaux techniques (adresse IP, type de navigateur) nécessaires à la sécurité et au bon fonctionnement du site.": "Simply browsing the site does not involve any data collection for analytics or advertising. Like any host, our provider may keep technical logs (IP address, browser type) needed for the security and proper operation of the site.",
    "Vos données sont exclusivement utilisées pour :": "Your data is used exclusively to:",
    "Répondre à vos demandes d’audit et d’informations": "Respond to your audit and information requests",
    "Vous proposer un accompagnement sur mesure": "Offer you tailored support",
    "Gérer la relation commerciale et le suivi de projet": "Manage the business relationship and project follow-up",
    "Ces traitements reposent sur les mesures précontractuelles prises à votre demande et sur l’exécution du contrat (article 6.1.b du RGPD), ainsi que sur notre intérêt légitime à assurer le suivi de la relation commerciale (article 6.1.f).": "This processing is based on pre-contractual measures taken at your request and on the performance of the contract (Article 6.1.b GDPR), as well as on our legitimate interest in managing the business relationship (Article 6.1.f).",
    "Vos données ne sont jamais vendues, cédées ou louées à des tiers.": "Your data is never sold, transferred or rented to third parties.",
    "Vos données sont traitées par Nira Consulting et, pour les seuls besoins du service, par les prestataires suivants :": "Your data is processed by Nira Consulting and, solely for the purposes of the service, by the following providers:",
    "(Calendly LLC, États-Unis) : prise de rendez-vous en ligne. Les informations saisies lors de la réservation sont traitées selon la": "(Calendly LLC, United States): online meeting booking. Information entered when booking is processed according to the",
    "politique de confidentialité de Calendly": "Calendly privacy policy",
    "(Vercel Inc., États-Unis) : hébergement du site.": "(Vercel Inc., United States): website hosting.",
    "(Google LLC, États-Unis) : affichage des polices de caractères. Votre adresse IP est transmise à Google lors de leur chargement.": "(Google LLC, United States): font display. Your IP address is sent to Google when they load.",
    "Lorsque des données sont transférées hors de l’Union européenne, ces transferts sont encadrés par des garanties appropriées (cadre de protection des données UE–États-Unis ou clauses contractuelles types de la Commission européenne).": "When data is transferred outside the European Union, these transfers are covered by appropriate safeguards (EU–US Data Privacy Framework or the European Commission's standard contractual clauses).",
    "Les données des prospects sont conservées pendant une durée maximale de 3 ans à compter du dernier contact, puis supprimées ou archivées conformément aux exigences légales.": "Prospect data is kept for a maximum of 3 years from the last contact, then deleted or archived in accordance with legal requirements.",
    "Les données liées à l’exécution d’un contrat et à sa facturation sont conservées pendant la durée de la relation commerciale, puis pendant les durées légales applicables (10 ans pour les pièces comptables).": "Data related to the performance and invoicing of a contract is kept for the duration of the business relationship, then for the applicable legal periods (10 years for accounting records).",
    "Le site ne dépose aucun cookie publicitaire ni de mesure d’audience : aucun bandeau de consentement n’est donc nécessaire.": "The site sets no advertising or analytics cookies, so no consent banner is needed.",
    "Lorsque vous cliquez sur un lien de prise de rendez-vous, vous êtes redirigé vers Calendly, qui applique sa propre politique en matière de cookies.": "When you click a booking link, you are redirected to Calendly, which applies its own cookie policy.",
    "Le site est servi exclusivement via une connexion chiffrée (HTTPS). Nous mettons en œuvre des mesures adaptées pour protéger vos données et en limiter l’accès aux seules personnes chargées de traiter votre demande.": "The site is served exclusively over an encrypted connection (HTTPS). We implement appropriate measures to protect your data and restrict access to the people handling your request.",
    "Conformément à la réglementation européenne, vous disposez des droits suivants concernant vos données personnelles :": "Under European regulations, you have the following rights regarding your personal data:",
    "Droit d’accès et de rectification": "Right of access and rectification",
    "Droit à l’effacement (droit à l’oubli)": "Right to erasure (right to be forgotten)",
    "Droit à la limitation du traitement": "Right to restriction of processing",
    "Droit d’opposition": "Right to object",
    "Droit à la portabilité de vos données": "Right to data portability",
    "Droit de définir des directives sur le sort de vos données après votre décès": "Right to set instructions regarding your data after your death",
    "Pour exercer vos droits, contactez-nous via notre page de": "To exercise your rights, contact us via our",
    ". Nous vous répondrons dans un délai d’un mois.": ". We will respond within one month.",
    "Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (": "If you believe your rights are not being respected, you may file a complaint with the CNIL (",
    "Cette politique peut être mise à jour pour refléter l’évolution du site ou de la réglementation. La date de la dernière mise à jour figure en haut de cette page.": "This policy may be updated to reflect changes to the site or to regulations. The date of the last update appears at the top of this page.",
    // CGV
    "Conditions générales de vente | Nira Consulting": "Terms of sale | Nira Consulting",
    "Conditions générales de vente des prestations de conseil, d’audit et d’automatisation de Nira Consulting.": "Terms and conditions of sale for Nira Consulting's consulting, audit and automation services.",
    "Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Nira Consulting (SIRET : 951 653 476 00014) et ses clients professionnels.": "These terms and conditions of sale govern the contractual relationship between Nira Consulting (SIRET: 951 653 476 00014) and its business clients.",
    "Objet des prestations": "Scope of services",
    "Devis et commandes": "Quotes and orders",
    "Tarifs et modalités de paiement": "Prices and payment terms",
    "Retard de paiement": "Late payment",
    "Exécution des prestations": "Performance of services",
    "Propriété intellectuelle des livrables": "Intellectual property of deliverables",
    "Confidentialité": "Confidentiality",
    "Droit applicable et litiges": "Governing law and disputes",
    "Un projet en tête ?": "Have a project in mind?",
    "Chaque prestation commence par un devis détaillé. Démarrons par un audit gratuit.": "Every engagement starts with a detailed quote. Let's begin with a free audit.",
    "Nira Consulting propose des prestations de conseil, d’audit, de conception, de développement et de maintenance de solutions d’automatisation des processus et d’intégration d’intelligence artificielle.": "Nira Consulting provides consulting, audit, design, development and maintenance services for process automation and artificial intelligence integration solutions.",
    "Les présentes CGV s’appliquent à toute commande passée auprès de Nira Consulting, sauf dérogation expresse prévue au devis.": "These terms apply to every order placed with Nira Consulting, unless expressly stated otherwise in the quote.",
    "Toute prestation fait l’objet d’un devis préalable détaillé indiquant la nature des travaux, les délais d’exécution et le tarif convenu. La commande est définitive à compter de la réception du devis signé avec la mention « Bon pour accord ».": "Every service is subject to a prior detailed quote stating the nature of the work, the timeline and the agreed price. The order becomes final upon receipt of the quote signed with the words “Bon pour accord” (approved).",
    "Les prix sont stipulés en euros (€) hors taxes (HT). Sauf convention contraire précisée sur le devis :": "Prices are stated in euros (€) excluding tax. Unless otherwise specified in the quote:",
    "Un acompte de 30 % à 50 % est exigible à la commande": "A deposit of 30% to 50% is due upon order",
    "Le solde est payable à la livraison du projet ou selon le calendrier de recette convenu": "The balance is payable on project delivery or according to the agreed acceptance schedule",
    "Les factures sont payables à réception par virement bancaire": "Invoices are payable upon receipt by bank transfer",
    "Les conditions des abonnements mensuels (maintenance et évolution continue) sont précisées dans le devis correspondant.": "The terms of monthly subscriptions (maintenance and continuous improvement) are set out in the corresponding quote.",
    "Tout retard de paiement entraîne de plein droit, sans qu’un rappel soit nécessaire, l’application de pénalités de retard au taux de trois fois le taux d’intérêt légal en vigueur, ainsi qu’une indemnité forfaitaire pour frais de recouvrement de 40 € (articles L441-10 et D441-5 du Code de commerce).": "Any late payment automatically incurs, without prior notice, late-payment penalties at three times the applicable legal interest rate, plus a fixed recovery fee of €40 (Articles L441-10 and D441-5 of the French Commercial Code).",
    "Nira Consulting s’engage à exécuter les prestations avec soin, dans le respect des règles de l’art, au titre d’une obligation de moyens. Le client s’engage à fournir dans les délais les informations, accès et validations nécessaires à leur bonne réalisation.": "Nira Consulting undertakes to perform the services with care and in line with industry best practices, under a best-efforts obligation. The client undertakes to provide in a timely manner the information, access and approvals needed to carry them out.",
    "La propriété des livrables et workflows développés sur mesure est transférée au client dès le paiement intégral du prix convenu.": "Ownership of custom-built deliverables and workflows is transferred to the client upon full payment of the agreed price.",
    "Nira Consulting s’engage à préserver la confidentialité la plus stricte concernant les données, processus et informations stratégiques transmis par le client dans le cadre des projets.": "Nira Consulting undertakes to maintain the strictest confidentiality regarding the data, processes and strategic information provided by the client in the course of projects.",
    "Les présentes CGV sont soumises au droit français. En cas de différend, les parties s’efforceront de trouver une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents du ressort du siège de Nira Consulting.": "These terms are governed by French law. In the event of a dispute, the parties will seek an amicable solution. Failing that, the dispute will be brought before the competent courts for Nira Consulting's registered office."
  };

  const ATTRS = ['alt', 'aria-label', 'placeholder', 'title', 'content'];
  const SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };

  const translateText = (node) => {
    const raw = node.nodeValue;
    const key = raw.replace(/\s+/g, ' ').trim();
    const t = key && EN[key];
    if (t) node.nodeValue = raw.match(/^\s*/)[0] + t + raw.match(/\s*$/)[0];
  };
  const translateEl = (el) => {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v && EN[v.trim()]) el.setAttribute(a, EN[v.trim()]);
    }
  };
  const walk = (root) => {
    if (root.nodeType === 3) return translateText(root);
    if (root.nodeType !== 1 || SKIP[root.nodeName]) return;
    translateEl(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.nodeType === 1 && SKIP[n.nodeName] ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    for (let n = w.nextNode(); n; n = w.nextNode()) n.nodeType === 3 ? translateText(n) : translateEl(n);
  };

  html.lang = 'en';
  html.classList.add('i18n-pending');
  const style = document.createElement('style');
  style.textContent = '.i18n-pending body{visibility:hidden}';
  document.head.appendChild(style);

  const run = () => {
    document.title = EN[document.title.trim()] || document.title;
    walk(document.head);
    walk(document.body);
    const og = document.querySelector('meta[property="og:locale"]');
    if (og) og.setAttribute('content', 'en_US');
    // English film; the method reel only exists in French, so it is hidden (see css)
    const film = document.querySelector('#nira-video source');
    if (film) { film.src = 'assets/nira-film-en.mp4'; film.parentElement.load(); }
    html.classList.remove('i18n-pending');
    // Text that scripts change later (tab captions, menu labels)
    new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'attributes') translateEl(m.target);
        else m.addedNodes.forEach(walk);
        if (m.type === 'characterData') translateText(m.target);
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
