class Battle {
    constructor() {
        this.combatants = {
            "player1": new Combatant({
                ...Fighters.w001,
                team: "player",
                hp: 100,
                maxHp: 100,
                xp: 34,
                maxXp: 50,
                level: 1,
                status: null
            }, this),
            /*"enemy1": new Combatant({
                ...Fighters.n001,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 0,
                maxXp: 50,
                level: 1,
                status: null
            }, this),*/
            "enemy2": new Combatant({
                ...Fighters.f001,
                team: "enemy",
                hp: 100,
                maxHp: 100,
                xp: 0,
                maxXp: 50,
                level: 1,
                status: null
            }, this),
        }
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy2"
        }
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

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element);
        })
    }
}