class Battle {
    constructor() {

    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("battle");
        this.element.innerHTML = (`
            <div class="battle_hero">
                <img src="${'/img/char/people/hero.png'}" alt="Hero">
            </div>
            <div class="battle_enemy">
                <img src="${'/img/char/people/npc3.png'}" alt="Enemy">
            </div>
            `);
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);
    }
}