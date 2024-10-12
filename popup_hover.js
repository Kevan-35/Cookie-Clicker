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
