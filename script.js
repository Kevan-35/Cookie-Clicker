    class Game{
        constructor() {
            this.total_score = 0 //achievement
            this.score = 0
            this.one_click = 1

            this.prix_multiplicateur_2_clique = 50
            this.prix_autoclicker = 20

        }
        update_buy_button(buyButton) {
            buyButton.textContent = "Acheter : " + this.prix_multiplicateur_2_clique; // Met à jour le texte du bouton
        }
        update_autoclicker_button(autoclickerButton) {
            autoclickerButton.textContent = "Acheter : " + this.prix_autoclicker; // Met à jour le texte du bouton
        }
        increment_score() {
            this.score += this.one_click
            this.total_score += this.one_click
        }
        click(){
            this.increment_score()

        }
        multiplicateur_2_clique(){
            this.one_click *= Math.ceil(1.5)
            
        }
        buy(){
            if (this.score >= this.prix_multiplicateur_2_clique) {
                this.score -= this.prix_multiplicateur_2_clique
                this.prix_multiplicateur_2_clique = Math.ceil(this.prix_multiplicateur_2_clique * 1.15)
                this.multiplicateur_2_clique()
            }
        }
        timer(){
            setInterval(() => {
                this.score += 1
                score.textContent = "Score : " + game.score;

                console.log(this.score)
            }, 1000);
        }
        autoclicker(){
            if (this.score >= this.prix_autoclicker){
                this.score -= this.prix_autoclicker
                this.timer()
            }
        }
    }


    const game = new Game();
    clique = document.getElementById("clique")
    score = document.getElementById("score")
    buy = document.getElementById("buy")
    autoclicker = document.getElementById("autoclicker")


    game.update_buy_button(buy)
    game.update_autoclicker_button(autoclicker)

    
    clique.addEventListener("click", function() {
        game.click()
        score.textContent = "Score : " + game.score;
    }); 
    
    buy.addEventListener("click", function() {
        game.buy()  
        score.textContent = "Score : " + game.score;
        buy.textContent = "Acheter : " + game.prix_multiplicateur_2_clique;
    });

    autoclicker.addEventListener("click", function() {
        game.autoclicker()  
        score.textContent = "Score : " + game.score;
        autoclicker.textContent = "Acheter : " + game.prix_autoclicker;
    });




            

