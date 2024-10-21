    class Game{
        constructor() {
            // init
            this.total_score = 0 
            this.score = 0
            this.one_click = 1  

            // count
            this.nb_bonus_click = 0
            this.nb_autoclicker = 0 

            // prix
            this.prix_acheter_bonus_click = 18
            this.prix_autoclicker = 15

            this.update_acheter_bonus_click_button()
            this.update_autoclicker_button()

            this.etages = []
            this.initEtage()
            this.displayEtages()


        }
        initEtage(){
            this.etages.push(new Etage("Pierre", "images/pierre.png", 1, 10, 100, true))
            this.etages.push(new Etage("Or", "images/or.png", 100, 10, 10, false))
            this.etages.push(new Etage("Diament", "images/diament.png", 100, 100, 10, false))
            this.etages.push(new Etage("Emeraude", "images/emeraude.png", 1000, 1000, 10, false));

        }
        displayEtages() {
            let parent = document.querySelector('#middle-section');
            parent.innerHTML = ''; 
        
            this.etages.forEach(etage => {
                let html_etage = document.createElement('div');
                html_etage.className = "etage";
                html_etage.title = 'click moi dessus!';
        
                let img = document.createElement('img');
                img.src = etage.image_minerai;
                img.alt = "image à clicker";
        
                
                html_etage.appendChild(img);
        
                
                img.addEventListener("click", () => this.click(etage));
        
                parent.appendChild(html_etage);
            });
        
            this.checkUnlockableEtages(); 
        }


        checkUnlockableEtages(etage) {
            this.etages.forEach((etage, index) => {
                let parent = document.querySelector('#middle-section');
                let etageDiv = parent.children[index]; 
        
                if (etage.est_achete) {
                    etageDiv.style.cursor = 'pointer';
                    etageDiv.style.pointerEvents = 'auto'; 
                    etageDiv.style.opacity = '1';  
                } else if (this.score >= etage.prix_etage) {
        
                    let img_cadena = etageDiv.querySelector('img[src="images/lock.png"]');
                    if (img_cadena) etageDiv.removeChild(img_cadena);
        
                    let acheterButton = etageDiv.querySelector('.acheter-button');
                    if (!acheterButton) {
                        acheterButton = document.createElement('button');
                        acheterButton.className = 'acheter-button';
                        acheterButton.textContent = `Acheter ${etage.nom} pour ${etage.prix_etage}`;
                        etageDiv.appendChild(acheterButton);
        
                        acheterButton.addEventListener('click', () => {
                            etage.est_achete = true
                            this.score = this.score - etage.prix_etage
                            this.displayEtages()
                            this.update_score()
                        });
                    }
        
                    etageDiv.style.cursor = 'not-allowed';
                    etageDiv.style.pointerEvents = 'none'; 
                    etageDiv.style.opacity = '0.5'; 
                } else {
                    etageDiv.style.cursor = 'not-allowed';
                    etageDiv.style.pointerEvents = 'none';
                    etageDiv.style.opacity = '0.5';
        
                    let img_cadena = etageDiv.querySelector('img[src="images/lock.png"]');
                    if (!img_cadena) {
                        img_cadena = document.createElement('img');
                        img_cadena.src = "images/lock.png";
                        etageDiv.appendChild(img_cadena);
                    }
                }
            });
        }
    
       

        update_dom(element, message){
            element.textContent = message; 
        
        }
        update_score() {
            let score = document.getElementById("score");
            this.update_dom(score, "Score : " + this.score);
        }
        update_acheter_bonus_click_button() {
            let acheter_bonus_clickButton = document.getElementById("acheter_bonus_click");
            this.update_dom(acheter_bonus_clickButton, "Acheter le multiplicateur : " + this.prix_acheter_bonus_click); 
        }
        update_autoclicker_button() {
            let autoclickerButton = document.getElementById("autoclicker");
            this.update_dom(autoclickerButton, "Acheter l'autoclicker : " + this.prix_autoclicker); 
        }
        
        click(etage, toto){
            console.log(this)
            console.log(toto)
            this.score += etage.nb_click
            this.total_score += etage.nb_click
            this.update_score()
            this.checkUnlockableEtages(); 
        }
        bonus_click(){
            this.one_click += 1
        }
        acheter_bonus_click(){ // Achat
            if (this.score >= this.prix_acheter_bonus_click) {
                this.score -= this.prix_acheter_bonus_click
                this.prix_acheter_bonus_click = Math.ceil(this.prix_acheter_bonus_click * 1.15)
                this.bonus_click()

                this.nb_bonus_click += 1
                console.log(this.nb_bonus_click)
                this.update_score()
                this.update_acheter_bonus_click_button()
            }
        }
        timer(etage){
            setInterval(() => {
                this.score += etage.nb_autoclick
                score.textContent = "Score : " + this.score;

                console.log(this.score)
            }, 1000);
        }
        autoclicker(){ // Achat
            if (this.score >= this.prix_autoclicker){
                this.score -= this.prix_autoclicker
                this.prix_autoclicker = Math.ceil(this.prix_autoclicker * 1.15)

                this.timer()
                console.log(this.score)

                this.nb_autoclicker += 1
                this.update_autoclicker_button()
                this.update_score()
            }
        }        
    }


    const game = new Game();
    click = document.getElementById("click")
    score = document.getElementById("score")
    autoclicker = document.getElementById("autoclicker")

    // popup hover
    elementToHover = document.getElementById("elementToHover")
    elementToPopup = document.getElementById("elementToPopup")

    
   
    let acheter_bonus_click = document.getElementById("acheter_bonus_click")
    acheter_bonus_click.addEventListener("click", function() {
        game.acheter_bonus_click()  
    });

    autoclicker.addEventListener("click", function() {
        game.autoclicker()
    });





    