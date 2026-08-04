// ==UserScript==
// @name         Visa 100 annonser per sida i "Mina annonser"
// @namespace    hammarn
// @version      1.0
// @description  Ändrar antal visade annonser till 100 på mina annonser
// @match        https://www.bokborsen.se/user/product*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ANTAL = "100";

    function ändraAntal() {

        // Leta efter select-menyer
        document.querySelectorAll("select").forEach(select => {

            const alternativ = [...select.options];

            const hundra = alternativ.find(
                option => 
                option.value === ANTAL ||
                option.text.includes("100")
            );

            if (hundra && select.value !== hundra.value) {
                select.value = hundra.value;

                select.dispatchEvent(
                    new Event("change", {
                        bubbles: true
                    })
                );
            }
        });

    }

    ändraAntal();

    new MutationObserver(() => {
        ändraAntal();
    }).observe(document.body, {
        childList: true,
        subtree: true
    });

})();
