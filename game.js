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

    }
    update_acheter_bonus_clique_button(acheter_bonus_cliqueButton) {
        acheter_bonus_cliqueButton.textContent = "Acheter le multiplicateur : " + this.prix_acheter_bonus_clique; 
    }
    update_autoclicker_button(autoclickerButton) {
        autoclickerButton.textContent = "Acheter l'autoclicker : " + this.prix_autoclicker; 
    }
    click(){
        this.score += this.one_click
        this.total_score += this.one_click
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