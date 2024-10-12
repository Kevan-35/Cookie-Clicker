    class Game{
        constructor() {
            // init
            this.total_score = 0 
            this.score = 0
            this.one_click = 1
            this.max_score = 20
            this.timer_transport = 5000

            // count
            this.nb_bonus_clique = 0
            this.nb_autoclicker = 0

            // prix
            this.prix_acheter_bonus_clique = 18
            this.prix_autoclicker = 15

        }
        update_acheter_bonus_clique_button(acheter_bonus_cliqueButton) {
            acheter_bonus_cliqueButton.textContent = "Acheter le multiplicateur : " + this.prix_acheter_bonus_clique; 
        }
        update_autoclicker_button(autoclickerButton) {
            autoclickerButton.textContent = "Acheter l'autoclicker : " + this.prix_autoclicker; 
        }
        increment_score() {
            this.score += this.one_click
            this.total_score += this.one_click
        }
        click(){
            this.increment_score()

        }
        bonus_clique(){
            this.one_click += 1
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
                this.score += 1
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
            }
        }        
    }


    const game = new Game();
    clique = document.getElementById("clique")
    score = document.getElementById("score")
    acheter_bonus_clique = document.getElementById("acheter_bonus_clique")
    autoclicker = document.getElementById("autoclicker")

    // popup hover
    elementToHover = document.getElementById("elementToHover")
    elementToPopup = document.getElementById("elementToPopup")
    

    game.update_acheter_bonus_clique_button(acheter_bonus_clique)
    game.update_autoclicker_button(autoclicker)

    
    clique.addEventListener("click", function() {
        game.click()
        score.textContent = "Score : " + game.score;
    }); 
    
    acheter_bonus_clique.addEventListener("click", function() {
        game.acheter_bonus_clique()  
        score.textContent = "Score : " + game.score;
        acheter_bonus_clique.textContent = "Acheter le multiplicateur : " + game.prix_acheter_bonus_clique;
    });

    autoclicker.addEventListener("click", function() {
        game.autoclicker()
        score.textContent = "Score : " + game.score;
        autoclicker.textContent = "Acheter l'autoclicker : " + game.prix_autoclicker;
    });
    
   






    