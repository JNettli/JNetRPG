class Combatant {
    constructor(config, battle) {
        Object.keys(config).forEach(key => {
            this[key] = config[key];
        });
        this.battle = battle;
    }

    get hpPercent() {
        const percent = this.hp/this.maxHp * 100;
        return percent > 0 ? percent : 0;
    }

    get xpPercent() {
        return this.xp / this.maxXp * 100;
    }

    get isActive() {
        return this.battle.activeCombatants[this.team] === this.id;
    }

    createElement() {
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("combatant");
        this.hudElement.setAttribute("data-combatant", this.id);
        this.hudElement.setAttribute("data-team", this.team);
        this.hudElement.innerHTML = (`
            <p class="combatant_name">${this.name}</p>
            <p class="combatant_level"></p>
            <div class="combatant_character_crop">
              <img class="combatant_character" alt="${this.name}" src="${this.src}" />
            </div>
            <img class="combatant_type" src="${this.icon}" alt="${this.type}" />
            <svg viewBox="0 0 26 3" class="combatant_life-container">
              <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
              <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
            </svg>
            <svg viewBox="0 0 26 2" class="combatant_xp-container">
              <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
              <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
            </svg>
            <p class="combatant_status"></p>
          `);

          this.fighterElement = document.createElement("img");
          this.fighterElement.classList.add("fighter");
          this.fighterElement.setAttribute("src", this.src);
          this.fighterElement.setAttribute("alt", this.name);
          this.fighterElement.setAttribute("data-team", this.team);

            this.hpFills = this.hudElement.querySelectorAll(".combatant_life-container > rect");
            this.xpFills = this.hudElement.querySelectorAll(".combatant_xp-container > rect");
    }

    update(changes={}) {
        Object.keys(changes).forEach(key => {
            this[key] = changes[key];
        });

        this.hudElement.setAttribute("data-active", this.isActive);

        this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`)
        this.xpFills.forEach(rect => rect.style.width = `${this.xpPercent}%`)

        this.hudElement.querySelector(".combatant_level").innerText = this.level;

    }

    init(container) {
        this.createElement();
        container.appendChild(this.hudElement);
        container.appendChild(this.fighterElement);
        this.update();
    }
}
