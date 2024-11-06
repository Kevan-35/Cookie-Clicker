class Etage{
	constructor(id, nom_minerai, image_minerai, nb_click = 1, prix_etage = 0, est_achete = false, nb_autoclick = 1, prix_autoclick = 10, nb_bonus_click = 1, prix_bonus_click = 13, production_par_click = nb_bonus_click, production_par_seconde = 0, nb_bonus_click_achete = 1, nb_autoclick_achete = 0, x_bonus_click_produit = production_par_click, x_autoclick_produit = 0, total_cookies_autoclicker = 0, points_gagnes_click = 0){
		this.id = id
		this.nom_minerai = nom_minerai
		this.image_minerai = image_minerai
		this.nb_click = nb_click 
		this.prix_etage = prix_etage 
		this.est_achete = est_achete
		this.nb_autoclick= nb_autoclick
		this.prix_autoclick = prix_autoclick
		this.nb_bonus_click = nb_bonus_click
		this.prix_bonus_click = prix_bonus_click
		this.production_par_click = production_par_click
		this.production_par_seconde = production_par_seconde
		this.nb_bonus_click_achete = nb_bonus_click_achete
		this.nb_autoclick_achete = nb_autoclick_achete
		this.x_bonus_click_produit = x_bonus_click_produit
		this.x_autoclick_produit = x_autoclick_produit
		this.total_cookies_autoclicker = total_cookies_autoclicker
		this.points_gagnes_click  = points_gagnes_click 
	}
} 

