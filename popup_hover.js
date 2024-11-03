function updatePopupContent(button, popup, production_par_click, production_par_seconde, nb_bonus_click_achete, nb_autoclick_achete, x_bonus_click_produit, x_autoclicker_produit, total_cookies_autoclicker) {
    popup.innerHTML = button.classList.contains('bonus-click-button')
        ? `Ce bonus de clic produit ${production_par_click} cookies par clic.<br>
        ${nb_bonus_click_achete} bonus click produits ${x_bonus_click_produit} cookies juqu’à présent.`

        : `Cet autoclicker produit ${production_par_seconde} par seconde.<br>
        ${nb_autoclick_achete} autoclickers produisant ${x_autoclicker_produit} score.<br>
        ${total_cookies_autoclicker} cookies produits juqu’à présent`;
}

function createHoverPopup(buttonElement, popupElement, etage) {
    buttonElement.addEventListener('mouseenter', function() {
        updatePopupContent(buttonElement, popupElement, etage.production_par_click, etage.production_par_seconde, etage.nb_bonus_click_achete, etage.nb_autoclick_achete, etage.x_bonus_click_produit, etage.x_autoclicker_produit, etage.total_cookies_autoclicker);
        popupElement.style.display = 'block';
        const rect = buttonElement.getBoundingClientRect();
        popupElement.style.left = rect.left + "px";
        popupElement.style.top = (rect.top + rect.height) + "px";
    });
    buttonElement.addEventListener('mouseleave', function() {
        popupElement.style.display = 'none';
    });
}

function initializePopups() {
    const hoverBonusButtons = document.querySelectorAll('.bonus-click-button');
    const hoverAutoclickerButtons = document.querySelectorAll('.autoclicker-button');
    hoverBonusButtons.forEach(button => {
        const etageName = button.getAttribute("data-etage");
        const etage = game.etages.find(e => e.nom_minerai === etageName);
        createHoverPopup(button, document.getElementById("elementToPopup_bonus"), etage, etage.production_par_click, etage.production_par_seconde);
    });
    hoverAutoclickerButtons.forEach(button => {
        const etageName = button.getAttribute("data-etage");
        const etage = game.etages.find(e => e.nom_minerai === etageName);
        createHoverPopup(button, document.getElementById("elementToPopup_autoclicker"), etage);
    });
}

initializePopups();
