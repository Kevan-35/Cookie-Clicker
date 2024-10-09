    class Game{
        constructor() {
            this.total_score = 0 //achievement
            this.score = 0
            this.i = 1
            this.prix_multiplicateur_2_clique = 50
        }
        increment_score() {
            this.score += this.i
            this.total_score += this.i
        }
        click(){
            this.increment_score()

        }
        multiplicateur_2_clique(){
            this.i *= Math.ceil(1.5)
            
        }
        buy(){
            if (this.score >= this.prix_multiplicateur_2_clique) {
                this.score -= this.prix_multiplicateur_2_clique
                this.prix_multiplicateur_2_clique = Math.ceil(this.prix_multiplicateur_2_clique * 1.15)
                this.multiplicateur_2_clique()
            }
        }
        update_buy_button(buyButton) {
            buyButton.textContent = "Acheter : " + this.prix_multiplicateur_2_clique; // Met à jour le texte du bouton
        }
        autoclick(){
            
        }
    }


    const game = new Game();
    clique = document.getElementById("clique")
    score = document.getElementById("score")
    buy = document.getElementById("buy")

    game.update_buy_button(buy)
    
    clique.addEventListener("click", function() {
        game.click()
        score.textContent = "Score : " + game.score;
    }); 

    
    buy.addEventListener("click", function() {
        game.buy()  
        score.textContent = "Score : " + game.score;
        buy.textContent = "Acheter : " + game.prix_multiplicateur_2_clique;
    });




            

