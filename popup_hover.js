function updatePopupContent(button, popup, nb_click, nb_autoclick) {
    popup.textContent = button.classList.contains('bonus-click-button')
        ? `Ce bonus de clic produit ${nb_click} par clic.`
        : `Cet autoclicker produit ${nb_autoclick} par seconde.`;
}

function createHoverPopup(buttonElement, popupElement, etage) {
    buttonElement.addEventListener('mouseenter', function() {
        updatePopupContent(buttonElement, popupElement, etage.production_par_click, etage.production_par_seconde);
        popupElement.style.display = 'block';
        const rect = buttonElement.getBoundingClientRect();
        popupElement.style.left = rect.left + "px";
        popupElement.style.top = (rect.top + rect.height) + "px";
    });
    buttonElement.addEventListener('mouseleave', function() {
        popupElement.style.display = 'none';
    });
}

// Boucle pour chaque bouton d'achat
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

// Initialisation des popups au chargement de la page
initializePopups();
