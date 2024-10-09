    class Game{
        constructor() {
            this.total_score = 0 //achievement
            this.score = 0
            this.i = 1
            this.prix_multiplicateur_2_clique = 10
        }
        increment_score() {
            this.score += this.i
            this.total_score += this.i
        }
        click(){
            this.increment_score()

        }
        multiplicateur_2_clique(){
            this.i *= 2
            
        }
        buy(){
            if (score >= this.prix_multiplicateur_2_clique) {
                this.score -= this.prix_multiplicateur_2_clique
                this.prix_multiplicateur_2_clique = Math.ceil(this.prix_multiplicateur_2_clique * 1.15)
                this.multiplicateur_2_clique()
            }
        }
    }


    const game = new Game();
    clique = document.getElementById("clique")
    score = document.getElementById("score")
    buy = document.getElementById("buy")
    
    clique.addEventListener("click", function() {
        game.click()
        score.textContent = "Score : " + game.score;
    });

    
    buy.addEventListener("click", function() {
        game.buy()  
        buy.textContent = "Acheter : " + this.prix_multiplicateur_2_clique;
    });




            

