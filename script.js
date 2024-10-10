    class Game{
        constructor() {
            this.total_score = 0 //achievement
            this.score = 0
            this.score_attente = 0
            this.one_click = 1
            this.max_score = 20

            this.prix_acheter_bonus_clique = 18
            this.prix_autoclicker = 15

        }
        update_acheter_bonus_clique_button(acheter_bonus_cliqueButton) {
            acheter_bonus_cliqueButton.textContent = "Acheter le multiplicateur : " + this.prix_acheter_bonus_clique; // Met à jour le texte du bouton
        }
        update_autoclicker_button(autoclickerButton) {
            autoclickerButton.textContent = "Acheter l'autoclicker : " + this.prix_autoclicker; // Met à jour le texte du bouton
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
        acheter_bonus_clique(){
            if (this.score >= this.prix_acheter_bonus_clique) {
                this.score -= this.prix_acheter_bonus_clique
                this.prix_acheter_bonus_clique = Math.ceil(this.prix_acheter_bonus_clique * 1.15)
                this.bonus_clique()
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
        autoclicker(){
            if (this.score >= this.prix_autoclicker){
                this.score -= this.prix_autoclicker
                this.timer()
                console.log(this.score_attente)
            }
        }
        transport_score(){
            if (this.score_attente = this.max_score){
                this.score += this.score_attente
                this.score_attente = 0
                score.textContent = "Score : " + this.score;
            }
        }
        max_score_attente(){
            if (this.score_attente >= this.max_score){
                this.score_attente = this.max_score
                this.transport_score()
            }
        }
        
    }


    const game = new Game();
    clique = document.getElementById("clique")
    score = document.getElementById("score")
    score_attente = document.getElementById("score_attente")
    acheter_bonus_clique = document.getElementById("acheter_bonus_clique")
    autoclicker = document.getElementById("autoclicker")


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
    


            

