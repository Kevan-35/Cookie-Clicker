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