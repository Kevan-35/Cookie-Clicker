    class Game{
        constructor() {
            // init
            this.total_score = 0 
            this.score = 0
            this.one_click = 1  

            // count
            this.nb_bonus_clique = 0
            this.nb_autoclicker = 0 

            // prix
            this.prix_acheter_bonus_clique = 18
            this.prix_autoclicker = 15

            this.update_acheter_bonus_clique_button()
            this.update_autoclicker_button()

        }
        update_dom(element, message){
            element.textContent = message; 
        
        }
        update_score() {
            let score = document.getElementById("score");
            this.update_dom(score, "Score : " + this.score);
        }
        update_acheter_bonus_clique_button() {
            let acheter_bonus_cliqueButton = document.getElementById("acheter_bonus_clique");
            this.update_dom(acheter_bonus_cliqueButton, "Acheter le multiplicateur : " + this.prix_acheter_bonus_clique); 
        }
        update_autoclicker_button() {
            let autoclickerButton = document.getElementById("autoclicker");
            this.update_dom(autoclickerButton, "Acheter l'autoclicker : " + this.prix_autoclicker); 
        }
        click(){
            this.score += this.one_click
            this.total_score += this.one_click
            this.update_score()
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
                this.update_score()
                this.update_acheter_bonus_clique_button()
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
                this.update_autoclicker_button()
                this.update_score()
            }
        }        
    }


    const game = new Game();
    clique = document.getElementById("clique")
    score = document.getElementById("score")
    autoclicker = document.getElementById("autoclicker")

    // popup hover
    elementToHover = document.getElementById("elementToHover")
    elementToPopup = document.getElementById("elementToPopup")

    
    clique.addEventListener("click", function() {
        game.click()
        
    }); 
    let acheter_bonus_clique = document.getElementById("acheter_bonus_clique")
    acheter_bonus_clique.addEventListener("click", function() {
        game.acheter_bonus_clique()  
    });

    autoclicker.addEventListener("click", function() {
        game.autoclicker()
    });
    
   






    