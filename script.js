    class Game{
        constructor() {
            // init
            this.total_score = 0 
            this.score = 0
            this.score_attente = 0
            this.one_click = 1
            this.max_score = 20
            this.timer_transport = 5000

            // count
            this.nb_bonus_clique = 0
            this.nb_autoclicker = 0
            this.nb_max_attente = 0
            this.nb_transport = 0

            // prix
            this.prix_acheter_bonus_clique = 18
            this.prix_autoclicker = 15
            this.prix_max_attente = 20
            this.prix_transport = 10

            this.transport_score()

        }
        update_acheter_bonus_clique_button(acheter_bonus_cliqueButton) {
            acheter_bonus_cliqueButton.textContent = "Acheter le multiplicateur : " + this.prix_acheter_bonus_clique; 
        }
        update_autoclicker_button(autoclickerButton) {
            autoclickerButton.textContent = "Acheter l'autoclicker : " + this.prix_autoclicker; 
        }
        increment_score() {
            this.score_attente += this.one_click
            this.total_score += this.one_click
            this.max_score_attente()
        }
        click(){
            this.increment_score()

        }
        bonus_clique(){
            this.one_click += Math.ceil(1)
        }
        acheter_bonus_clique(){ // Achat
            if (this.score >= this.prix_acheter_bonus_clique) {
                this.score -= this.prix_acheter_bonus_clique
                this.prix_acheter_bonus_clique = Math.ceil(this.prix_acheter_bonus_clique * 1.15)
                this.bonus_clique()

                this.nb_bonus_clique += 1
                console.log(this.nb_bonus_clique)
            }
        }
        timer(){
            setInterval(() => {
                this.score_attente += 1
                this.max_score_attente()
                score_attente.textContent = "Score d'attente : " + this.score_attente;

                console.log(this.score)
            }, 1000);
        }
        autoclicker(){ // Achat
            if (this.score >= this.prix_autoclicker){
                this.score -= this.prix_autoclicker
                this.prix_autoclicker = Math.ceil(this.prix_autoclicker * 1.15)

                this.timer()
                console.log(this.score_attente)

                this.nb_autoclicker += 1
            }
        }
        transport_score(){
            setTimeout(() => {
                if (this.score_attente > 0) {
                    this.score += this.score_attente
                    this.score_attente = 0
                    score.textContent = "Score : " + this.score;
                    score_attente.textContent = "Score d'attente: " + this.score_attente;
                }
                this.transport_score()
            }, this.timer_transport);
        }
        accelerer_transport() { // Achat
            if (this.score >= this.prix_transport){
                this.score -= this.prix_transport
                this.prix_transport = Math.ceil(this.prix_transport * 1.15)
                this.timer_transport = Math.ceil(this.timer_transport / 1.25)

                this.nb_transport += 1
            }
        }       
        max_score_attente(){
            if (this.score_attente >= this.max_score){
                this.score_attente = this.max_score
            }
        }
        augmenter_max_attente(){ // Achat
            if (this.score >= this.prix_max_attente){
                this.score -= this.prix_max_attente
                this.prix_max_attente = Math.ceil(this.prix_max_attente * 1.5)
                this.max_score = Math.ceil(this.max_score * 1.25)

                this.nb_max_attente += 1
            }
        }
        
    }


    const game = new Game();
    clique = document.getElementById("clique")
    score = document.getElementById("score")
    score_attente = document.getElementById("score_attente")
    acheter_bonus_clique = document.getElementById("acheter_bonus_clique")
    autoclicker = document.getElementById("autoclicker")
    augmenter_max_attente = document.getElementById("augmenter_max_attente")
    accelerer_transport = document.getElementById("accelerer_transport")

    // popup hover
    elementToHover = document.getElementById("elementToHover")
    elementToPopup = document.getElementById("elementToPopup")
    

    game.update_acheter_bonus_clique_button(acheter_bonus_clique)
    game.update_autoclicker_button(autoclicker)

    
    clique.addEventListener("click", function() {
        game.click()
        score_attente.textContent = "Score d'attente : " + game.score_attente;
    }); 
    
    acheter_bonus_clique.addEventListener("click", function() {
        game.acheter_bonus_clique()  
        score.textContent = "Score : " + game.score;
        acheter_bonus_clique.textContent = "Acheter le multiplicateur : " + game.prix_acheter_bonus_clique;
    });

    autoclicker.addEventListener("click", function() {
        game.autoclicker()
        score.textContent = "Score : " + game.score;
        score_attente.textContent = "Score d'attente : " + game.score_attente;
        autoclicker.textContent = "Acheter l'autoclicker : " + game.prix_autoclicker;
    });
    
    augmenter_max_attente.addEventListener("click", function() {
        game.augmenter_max_attente()
        score.textContent = "Score : " + game.score;
        score_attente.textContent = "Score d'attente : " + game.score_attente;
        augmenter_max_attente.textContent = "Augmenter le plafond de score_attente : " + game.prix_max_attente;
    });

    accelerer_transport.addEventListener("click", function() {
        game.accelerer_transport()
        score.textContent = "Score : " + game.score;
        accelerer_transport.textContent = "Augmenter la rapidité du transport : " + game.prix_transport;
    });

    // Créer les popups hover afin de connaitre le nombre d'achat 
    // Bonus clique popup
    let hoverBonus = document.getElementById("elementToHover_bonus");
    let popupBonus = document.getElementById("elementToPopup_bonus");

    hoverBonus.addEventListener('mouseenter', function() {
        popupBonus.style.display = 'block';
        popupBonus.textContent = "Nombre de bonus clique : " + game.nb_bonus_clique;
    });
    hoverBonus.addEventListener('mouseleave', function() {
        popupBonus.style.display = 'none';
    });

    // Autoclicker popup
    let hoverAutoclicker = document.getElementById("elementToHover_autoclicker");
    let popupAutoclicker = document.getElementById("elementToPopup_autoclicker");

    hoverAutoclicker.addEventListener('mouseenter', function() {
        popupAutoclicker.style.display = 'block';
        popupAutoclicker.textContent = "Nombre d'autoclickers : " + game.nb_autoclicker;
    });
    hoverAutoclicker.addEventListener('mouseleave', function() {
        popupAutoclicker.style.display = 'none';
    });

    // Max attente popup
    let hoverMaxAttente = document.getElementById("elementToHover_max_attente");
    let popupMaxAttente = document.getElementById("elementToPopup_max_attente");

    hoverMaxAttente.addEventListener('mouseenter', function() {
        popupMaxAttente.style.display = 'block';
        popupMaxAttente.textContent = "Nombre de plafonds augmentés : " + game.nb_max_attente;
    });
    hoverMaxAttente.addEventListener('mouseleave', function() {
        popupMaxAttente.style.display = 'none';
    });

    // Transport popup
    let hoverTransport = document.getElementById("elementToHover_transport");
    let popupTransport = document.getElementById("elementToPopup_transport");

    hoverTransport.addEventListener('mouseenter', function() {
        popupTransport.style.display = 'block';
        popupTransport.textContent = "Nombre d'accélérations : " + game.nb_transport;
    });
    hoverTransport.addEventListener('mouseleave', function() {
        popupTransport.style.display = 'none';
    });
