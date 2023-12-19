function injectLocalBusinessData() {
    fetch('local-business.json')
      .then(response => response.json())
      .then(data => {
        const scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.text = JSON.stringify(data);
        document.head.appendChild(scriptTag);
  
        // Vérification que les données ont été ajoutées
        const scriptAdded = document.querySelector('script[type="application/ld+json"]');
        if (scriptAdded) {
          console.log('Données structurées ajoutées avec succès :', data);
        } else {
          console.error('Erreur : Les données structurées n\'ont pas été ajoutées.');
        }
      })
      .catch(error => {
        console.error('Erreur de chargement du fichier JSON:', error);
      });
  }
  
  // Appel de la fonction pour injecter les données
  injectLocalBusinessData();