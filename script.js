class Game {
    constructor() {
        this.total_score = 0;
        this.score = 0;
        this.one_click = 1;

        this.total_bonus_click = 0;
        this.total_autoclicker = 0;

        this.etages = [];
        this.initEtage();
        this.displayEtages();

        this.scoreMultiplier = 1;
        this.apparaitreBonusDoree();

    }

    initEtage() {
        this.etages.push(new Etage(1, "Pierre", "images/minerai/pierre.png", 1, 0, true, 1, 10, 1, )); // Valeurs de base
        this.etages.push(new Etage(2, "Or", "images/minerai/or.png", 10, 2000, false, 8, 50, 10, 30)); // Augmente les bénéfices et les coûts
        this.etages.push(new Etage(3, "Diament", "images/minerai/diament.png", 25, 10000, false, 80, 1000, 25, 130)); // Coûts et gains plus élevés
        this.etages.push(new Etage(4, "Emeraude", "images/minerai/emeraude.png", 50, 25000, false, 112, 2500, 50, 570)); // Valeurs plus élevées
        this.etages.push(new Etage(5, "Rose", "images/minerai/pierre_rose.png", 100, 50000, false, 150, 5000, 100, 980)); // Dernier étage avec des valeurs significatives
    }
    
    
    

    displayEtages() {
        let parent = document.querySelector('#middle-section');
        parent.innerHTML = ''; 
    
        this.etages.forEach((etage, index) => {
            let html_etage = document.createElement('div');
            html_etage.className = "etage";
            html_etage.title = 'Cliquez dessus !';
    
            // Créer un conteneur pour le minerai
            let imgContainer = document.createElement('div');
            imgContainer.className = 'minerai-container';
    
            let img = document.createElement('img');
            img.src = etage.image_minerai;
            img.draggable = false;
            img.alt = "image à cliquer";
            
            imgContainer.appendChild(img);
            html_etage.appendChild(imgContainer);
    
            // Créer un élément pour le cadenas
            let lockIcon = document.createElement('img');
            lockIcon.src = "images/cadenas-verrouille.png"; // Assurez-vous que le chemin est correct
            lockIcon.className = 'lock-icon';  // Classe pour le style CSS
            lockIcon.draggable = false;
    
            html_etage.appendChild(lockIcon);
    
            html_etage.addEventListener("click", () => this.click(etage));
            parent.appendChild(html_etage);
    
            // Afficher les boutons à droite si l'étage est acheté
            this.displayButtonsForEtage(etage);
        });
    
        this.checkUnlockableEtages(); 
        this.updateAcheterButtons();  
    }
        

    displayButtonsForEtage(etage) {
        let rightSection = document.querySelector('#right-section');
    
        // Vérifier si les boutons pour cet étage existent déjà
        if (document.querySelector(`.bonus-click-button[data-etage="${etage.nom_minerai}"]`) || 
            document.querySelector(`.autoclicker-button[data-etage="${etage.nom_minerai}"]`)) {
            return; // Si les boutons existent déjà, ne rien faire
        }
    
        // Si l'étage est acheté, afficher les boutons
        if (etage.est_achete) {
            let etageContainer = document.createElement('div');
            etageContainer.className = 'etage-container';
            etageContainer.style.marginBottom = '12px';
    
            // Ajoutez un en-tête pour les améliorations
            let header = document.createElement('h4'); // Changez <h4> à <h3> ou autre si nécessaire
            header.textContent = `Améliorations ${etage.nom_minerai}`;
            header.classList.add('white-text'); // Ajoutez la classe ici
            etageContainer.appendChild(header); // Ajoutez l'en-tête au conteneur
    
            let bonusButton = document.createElement('button');
            bonusButton.textContent = `Acheter Bonus Click de ${etage.nom_minerai} pour ${etage.prix_bonus_click}`;
            bonusButton.classList.add('bonus-click-button', 'bubbly-button');
            bonusButton.setAttribute("data-etage", etage.nom_minerai);
    
            let autoClickerButton = document.createElement('button');
            autoClickerButton.textContent = `Acheter Auto Clicker pour ${etage.nom_minerai} pour ${etage.prix_autoclick}`;
            autoClickerButton.classList.add('autoclicker-button', 'bubbly-button');
            autoClickerButton.setAttribute("data-etage", etage.nom_minerai);
    
            // Ajoutez les popups ici
            bonusButton.addEventListener('mouseenter', function() {
                const popupBonus = document.getElementById("elementToPopup_bonus");
                popupBonus.style.display = 'block';
                popupBonus.textContent = `Ce bonus de click produit ${etage.nb_bonus_click} par clic.`;
                const rect = bonusButton.getBoundingClientRect();
                popupBonus.style.left = rect.left + "px";
                popupBonus.style.top = (rect.top + rect.height) + "px";
            });
            bonusButton.addEventListener('mouseleave', function() {
                document.getElementById("elementToPopup_bonus").style.display = 'none';
            });
    
            autoClickerButton.addEventListener('mouseenter', function() {
                const popupAutoclicker = document.getElementById("elementToPopup_autoclicker");
                popupAutoclicker.style.display = 'block';
                popupAutoclicker.textContent = `Cet autoclicker produit ${etage.nb_autoclick} par seconde.`;
                const rect = autoClickerButton.getBoundingClientRect();
                popupAutoclicker.style.left = rect.left + "px";
                popupAutoclicker.style.top = (rect.top + rect.height) + "px";
            });
    
            // Ajouter des listeners pour les boutons avec vérification des points
            bonusButton.addEventListener('click', () => {
                if (this.score >= etage.prix_bonus_click) {
                    this.score -= etage.prix_bonus_click;
                    etage.prix_bonus_click = Math.ceil(etage.prix_bonus_click * 1.15);
                    etage.nb_click += etage.nb_bonus_click; 
                    etage.production_par_click = etage.nb_bonus_click;
                    etage.nb_bonus_click_achete += 1;
                    etage.x_bonus_click_produit = Math.ceil(etage.nb_bonus_click_achete * etage.production_par_click);
                    console.log(`Bonus click acheté pour ${etage.nom_minerai}`);
                    console.log(`Après achat, nb_bonus_click_achete: ${etage.nb_bonus_click_achete}, x_bonus_click_produit: ${etage.x_bonus_click_produit}`);
                    
                    bonusButton.textContent = `Acheter Bonus Click de ${etage.nom_minerai} pour ${etage.prix_bonus_click}`;
    
                    this.update_score();
                    initializePopups();
                } else {
                    alert("Vous n'avez pas assez de points pour acheter ce bonus.");
                }
            });
            
            autoClickerButton.addEventListener('click', () => {
                if (this.score >= etage.prix_autoclick) {
                    this.score -= etage.prix_autoclick; 
                    etage.prix_autoclick = Math.ceil(etage.prix_autoclick * 1.15);
                    this.timer(etage);
                    etage.production_par_seconde = etage.nb_autoclick;
                    etage.nb_autoclick_achete += 1;
                    etage.x_autoclick_produit = Math.ceil(etage.nb_autoclick_achete * etage.production_par_seconde);
                    console.log(this.score);
                    console.log(`Auto Clicker acheté pour ${etage.nom_minerai}`);
                    console.log(`Après achat, production_par_seconde: ${etage.production_par_seconde}, nb_autoclick_achete: ${etage.nb_autoclick_achete}, x_autoclick_produit: ${etage.x_autoclick_produit}, total_cookies_autoclicker: ${etage.total_cookies_autoclicker}`);
                    console.log(`Cet autoclicker produit ${etage.production_par_seconde} par seconde.<br>
                    ${etage.nb_autoclick_achete} autoclickers produisant ${etage.x_autoclick_produit} score.<br>
                    ${etage.total_cookies_autoclicker} cookies produits jusqu’à présent`);
                    
                    autoClickerButton.textContent = `Acheter Auto Clicker pour ${etage.nom_minerai} pour ${etage.prix_autoclick}`;
    
                    this.update_score();
                    initializePopups();
                } else {
                    alert("Vous n'avez pas assez de points pour acheter cet auto-clicker.");
                }
            });
    
            // Ajouter boutons dans la section droite
            etageContainer.appendChild(bonusButton);
            etageContainer.appendChild(autoClickerButton);
            rightSection.appendChild(etageContainer);
        }
    }
    
    
    timer(etage) {
        setInterval(() => {
            const pointsGagnes = etage.nb_autoclick * this.scoreMultiplier;  

            this.score += pointsGagnes;
            etage.total_cookies_autoclicker += pointsGagnes;
            this.update_score();
            this.updateAcheterButtons();
    
            const parent = document.querySelector('#middle-section');
            const etageDiv = parent.children[this.etages.indexOf(etage)];
            const img = etageDiv.querySelector('img');
    
            const autoIncrement = document.createElement('div');
            autoIncrement.className = 'score-increment';
            autoIncrement.textContent = `+${pointsGagnes}`;
    
            const rect = img.getBoundingClientRect();
            const randomOffsetX = (Math.random() - 0.5) * 100; 
            const randomOffsetY = (Math.random() - 0.5) * 50 + 30; 
            autoIncrement.style.left = `${rect.left + rect.width / 2 + randomOffsetX}px`;
            autoIncrement.style.top = `${rect.top + randomOffsetY}px`;
    
            document.body.appendChild(autoIncrement);
    
            setTimeout(() => {
                autoIncrement.remove();
            }, 1000);
    
        }, 1000);
    }


    click(etage) {
        const parent = document.querySelector('#middle-section');
        const etageDiv = parent.children[this.etages.indexOf(etage)];
        const img = etageDiv.querySelector('img');
    
        // Ajouter l'animation de zoom
        img.classList.add('zoom');
        setTimeout(() => {
            img.classList.remove('zoom');
        }, 100);
    
        const pointsGagnes = etage.nb_click * this.scoreMultiplier;
        
        etage.points_gagnes_click += pointsGagnes;
        console.log(etage.points_gagnes_click)

        // Créer l'élément de texte pour "+1" (le nombre de points ajoutés)
        const scoreIncrement = document.createElement('div');
        scoreIncrement.className = 'score-increment';
        scoreIncrement.textContent = `+${pointsGagnes}`;
    
        const rect = img.getBoundingClientRect();
        const randomOffsetX = (Math.random() - 0.5) * 100; 
        const randomOffsetY = (Math.random() - 0.5) * 50 + 30; 
        scoreIncrement.style.left = `${rect.left + rect.width / 2 + randomOffsetX}px`;
        scoreIncrement.style.top = `${rect.top + randomOffsetY}px`;
    
        document.body.appendChild(scoreIncrement);
    
        setTimeout(() => {
            scoreIncrement.remove();
        }, 1000);
    
        this.score += pointsGagnes;
        this.total_score += etage.nb_click; 
        this.update_score();
        this.updateAcheterButtons();
        this.checkUnlockableEtages();
        this.boostEtage3(etage);
    }

    

    checkUnlockableEtages() {
        this.etages.forEach((etage, index) => {
            let parent = document.querySelector('#middle-section');
            let etageDiv = parent.children[index]; 
    
            if (etage.est_achete) {
                // Retirer la classe de verrouillage et l'icône si l'étage est acheté
                etageDiv.classList.remove('locked');
                etageDiv.style.cursor = 'pointer';
                etageDiv.style.pointerEvents = 'auto'; 
                etageDiv.style.opacity = '1';  
    
                // Retirer le cadenas s'il existe
                let img_cadenas = etageDiv.querySelector('img[src="images/cadenas-verrouille.png"]');
                if (img_cadenas) {
                    etageDiv.removeChild(img_cadenas);
                }
    
            } else if (this.score >= etage.prix_etage) {
                // Déverrouiller l'étage
                etageDiv.classList.remove('locked'); // Retire la classe de verrou
                let acheterButton = etageDiv.querySelector('.acheter-button');
                if (!acheterButton) {
                    acheterButton = document.createElement('button');
                    acheterButton.className = 'acheter-button';
                    acheterButton.textContent = `Acheter ${etage.nom_minerai} pour ${etage.prix_etage}`;
                    etageDiv.appendChild(acheterButton);
    
                    acheterButton.addEventListener('click', () => {
                        etage.est_achete = true;
                        this.score -= etage.prix_etage;
                        this.displayEtages(); // Met à jour l'affichage des étages
                        this.update_score();
                        initializePopups();
                    });
                }
    
                etageDiv.style.cursor = 'pointer';
                etageDiv.style.pointerEvents = 'auto'; 
                etageDiv.style.opacity = '1'; 
    
                // Retirer le cadenas s'il existe
                let img_cadenas = etageDiv.querySelector('img[src="images/cadenas-verrouille.png"]');
                if (img_cadenas) {
                    etageDiv.removeChild(img_cadenas);
                }
    
            } else {
                // Ajouter la classe de verrouillage et afficher le cadenas
                etageDiv.classList.add('locked'); 
                etageDiv.style.cursor = 'not-allowed';
                etageDiv.style.pointerEvents = 'none';
                etageDiv.style.opacity = '0.5'; // Rendre l'étage moins visible
    
                // Ajout d'un cadenas s'il n'existe pas déjà
                let img_cadenas = etageDiv.querySelector('img[src="images/cadenas-verrouille.png"]');
                if (!img_cadenas) {
                    img_cadenas = document.createElement('img');
                    img_cadenas.src = "images/cadenas-verrouille.png";
                    img_cadenas.className = "lock-icon";  // Appliquer la classe pour le style
                    img_cadenas.draggable = false;
                    etageDiv.appendChild(img_cadenas);
                }
            }
        });
    }
    
    

    updateAcheterButtons() {
        this.etages.forEach((etage, index) => {
            let parent = document.querySelector('#middle-section');
            let etageDiv = parent.children[index];
            let acheterButton = etageDiv.querySelector('.acheter-button');
            let img_cadena = etageDiv.querySelector('img[src="images/lock.png"]');

            if (acheterButton) {
                if (this.score < etage.prix_etage) {
                    acheterButton.style.display = 'none'; 
                    if (!img_cadena) {
                        img_cadena = document.createElement('img');
                        img_cadena.src = "images/lock.png";
                        img_cadena.className = "lock-icon";  
                        img_cadena.style.backgroundImage = "url('images/etages/lock.png')";
                        etageDiv.appendChild(img_cadena);  
                    }
                } else {
                    acheterButton.style.display = 'block'; 

                    if (img_cadena) {
                        etageDiv.removeChild(img_cadena);
                    }
                }
            }
        });
    }

    
    

    apparaitreBonusDoree() {
        const BonusDoree = document.createElement("div");
        BonusDoree.classList.add("bonus-doree");

        const centerWidthPercentage = 60;  
        const centerHeightPercentage = 40;

        const leftBoundary = (100 - centerWidthPercentage) / 2; 
        const topBoundary = (100 - centerHeightPercentage) / 2; 

        BonusDoree.style.left = `${leftBoundary + Math.random() * centerWidthPercentage}vw`;
        BonusDoree.style.top = `${topBoundary + Math.random() * centerHeightPercentage}vh`;

        document.body.appendChild(BonusDoree);

        BonusDoree.addEventListener("click", () => {
            this.activerBonusDoreParClicMultiplier();
            BonusDoree.remove();
        });

        setTimeout(() => {
            BonusDoree.remove(); 
        }, 10000);  

        setTimeout(() => {
            this.apparaitreBonusDoree();
        }, Math.random() * 10000 + 100000); 
    }
    
    boostEtage3(etage) {
        if (etage.id === 1 && etage.points_gagnes_click >= 4000) { 
            const etageSuperieur = this.etages[2]; 
            etageSuperieur.nb_click *= 1.1; 
            etageSuperieur.nb_autoclick *= 1.1; 
            console.log(`La production de ${etageSuperieur.nom_minerai} a été augmentée de 10%!`);
            etage.points_gagnes_click = 0; 
        }
    }

    activerBonusDoreParClicMultiplier() {
        console.log("Bonus doré activé pour 30 secondes !");
        alert("Bonus doré activé pour 30 secondes !")
        this.scoreMultiplier = 3;

        setTimeout(() => {
            this.scoreMultiplier = 1;
            console.log("Bonus doré terminé");
        }, 30000); 
    }

    update_dom(element, message) {
        element.textContent = message; 
    }

    update_score() {
        let score = document.getElementById("score");
        this.update_dom(score, "Score : " + this.score);
    }
}

const game = new Game();


var animateButton = function(e) {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function() {
        e.target.classList.remove('animate');
    }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
}

