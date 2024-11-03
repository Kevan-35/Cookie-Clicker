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
    }

    initEtage() {
        this.etages.push(new Etage("Pierre", "images/minerai/pierre.png", 1, 10, true, 1, 15, 1, 20));
        this.etages.push(new Etage("Or", "images/minerai/or.png", 100, 10, false, 5, 100, 5, 200));
        this.etages.push(new Etage("Diament", "images/minerai/diament.png", 1000, 100, false, 10, 1000, 20, 1000));
        this.etages.push(new Etage("Emeraude", "images/minerai/emeraude.png", 10000, 1000, false, 20, 10000, 50, 10000));
    }

    displayEtages() {
        let parent = document.querySelector('#middle-section');
        parent.innerHTML = ''; 

        this.etages.forEach((etage, index) => {
            let html_etage = document.createElement('div');
            html_etage.className = "etage";
            html_etage.title = 'click moi dessus!';

            let img = document.createElement('img');
            img.src = etage.image_minerai;
            img.draggable = false;
            img.alt = "image à clicker";
            
            html_etage.appendChild(img);
            img.addEventListener("click", () => this.click(etage));
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

            let bonusButton = document.createElement('button');
            bonusButton.textContent = `Acheter Bonus Click de ${etage.nom_minerai} pour ${etage.prix_bonus_click}`;
            bonusButton.className = 'bonus-click-button';
            bonusButton.setAttribute("data-etage", etage.nom_minerai);
    
            let autoClickerButton = document.createElement('button');
            autoClickerButton.textContent = `Acheter Auto Clicker pour ${etage.nom_minerai} pour ${etage.prix_autoclick}`;
            autoClickerButton.className = 'autoclicker-button';
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
                    etage.nb_click += etage.nb_bonus_click; 
                    etage.production_par_click += etage.nb_bonus_click;
                    etage.nb_bonus_click_achete += 1
                    etage.x_bonus_click_produit = Math.ceil(etage.nb_bonus_click_achete * etage.production_par_click)
                    console.log(`Bonus click acheté pour ${etage.nom_minerai}`);
                    this.update_score();
                } else {
                    alert("Vous n'avez pas assez de points pour acheter ce bonus.");
                }
            });
            
            autoClickerButton.addEventListener('click', () => {
                if (this.score >= etage.prix_autoclick) {
                    this.score -= etage.prix_autoclick; 
                    this.timer(etage);
                    etage.production_par_seconde = etage.nb_autoclick;
                    etage.nb_autoclick_achete += 1
                    etage.x_autoclicker_produit = Math.ceil(etage.nb_autoclick_achete * etage.production_par_seconde)
                    console.log(this.score)
                    console.log(`Auto Clicker acheté pour ${etage.nom_minerai}`);
                    this.update_score();
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
            this.score += etage.nb_autoclick;
            etage.total_cookies_autoclicker += etage.nb_autoclick;
            this.update_score();
            this.updateAcheterButtons();
    
            const parent = document.querySelector('#middle-section');
            const etageDiv = parent.children[this.etages.indexOf(etage)];
            const img = etageDiv.querySelector('img');
    
            const autoIncrement = document.createElement('div');
            autoIncrement.className = 'score-increment';
            autoIncrement.textContent = `+${etage.nb_autoclick}`;
    
            const rect = img.getBoundingClientRect();
            const randomOffsetX = (Math.random() - 0.5) * 100; 
            const randomOffsetY = (Math.random() - 0.5) * 50; 
            autoIncrement.style.left = `${rect.left + rect.width / 2 + randomOffsetX}px`;
            autoIncrement.style.top = `${rect.top + randomOffsetY}px`;
    
            document.body.appendChild(autoIncrement);
    
            setTimeout(() => {
                autoIncrement.remove();
            }, 1000);
    
        }, 1000);
    }
    
    

    checkUnlockableEtages() {
        this.etages.forEach((etage, index) => {
            let parent = document.querySelector('#middle-section');
            let etageDiv = parent.children[index]; 

            if (etage.est_achete) {
                etageDiv.style.cursor = 'pointer';
                etageDiv.style.pointerEvents = 'auto'; 
                etageDiv.style.opacity = '1';  
            } else if (this.score >= etage.prix_etage) {

                let img_cadenas = etageDiv.querySelector('img[src="images/lock.png"]');
                if (img_cadenas) etageDiv.removeChild(img_cadenas);

                let acheterButton = etageDiv.querySelector('.acheter-button');
                if (!acheterButton) {
                    acheterButton = document.createElement('button');
                    acheterButton.className = 'acheter-button';
                    acheterButton.textContent = `Acheter ${etage.nom_minerai} pour ${etage.prix_etage}`;
                    etageDiv.appendChild(acheterButton);

                    acheterButton.addEventListener('click', () => {
                        etage.est_achete = true;
                        this.score -= etage.prix_etage;
                        this.displayEtages();
                        this.update_score();
                    });
                }

                etageDiv.style.cursor = 'not-allowed';
                etageDiv.style.pointerEvents = 'none'; 
                acheterButton.style.pointerEvents = 'auto'; 
                etageDiv.style.opacity = '0.5'; 
            } else {
                etageDiv.style.cursor = 'not-allowed';
                etageDiv.style.pointerEvents = 'none';
                etageDiv.style.opacity = '0.5';

                let img_cadenas = etageDiv.querySelector('img[src="images/lock.png"]');
                if (!img_cadenas) {
                    img_cadenas = document.createElement('img');
                    img_cadenas.src = "images/lock.png";
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

    click(etage) {
        const parent = document.querySelector('#middle-section');
        const etageDiv = parent.children[this.etages.indexOf(etage)];
        const img = etageDiv.querySelector('img');
    
        // Ajouter l'animation de zoom
        img.classList.add('zoom');
        setTimeout(() => {
            img.classList.remove('zoom');
        }, 100);
    
        // Créer l'élément de texte pour "+1" (ou le nombre de points ajoutés)
        const scoreIncrement = document.createElement('div');
        scoreIncrement.className = 'score-increment';
        scoreIncrement.textContent = `+${etage.nb_click}`;
    
        const rect = img.getBoundingClientRect();
        const randomOffsetX = (Math.random() - 0.5) * 100; 
        const randomOffsetY = (Math.random() - 0.5) * 50; 
        scoreIncrement.style.left = `${rect.left + rect.width / 2 + randomOffsetX}px`;
        scoreIncrement.style.top = `${rect.top + randomOffsetY}px`;
    
        document.body.appendChild(scoreIncrement);
    
        setTimeout(() => {
            scoreIncrement.remove();
        }, 1000);
    
        this.score += etage.nb_click;
        this.total_score += etage.nb_click;
        this.update_score();
        this.updateAcheterButtons();
        this.checkUnlockableEtages();
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