class CharacterStats {
    #hitPoints
    #manaPoints
    #attack
    #defence
    #loot
    #message
    constructor(hitPoints, manaPoints, attack, defence, loot, message) {
        this.#hitPoints = hitPoints;
        this.#manaPoints = manaPoints;
        this.#attack = attack;
        this.#defence = defence;
        this.#loot = loot;
        this.#message = message;
    }
    monsterExamine() {
        console.log(

`HP: ${this.#hitPoints}, MP: ${this.#manaPoints}, ATK: ${this.#attack}, DEF: ${this.#defence},
${this.#message}`

    )
  }

  get hitPoints() {
    return this.#hitPoints;
  }

  set hitPoints(hp) {
    this.#hitPoints = hp;
    console.log(`HP is now: ${this.#hitPoints}`);
  }
}

const goblin = new CharacterStats(10, 10, 1, 1, "10 gold", "Ugly green guy");
const imp = new CharacterStats(5, 5, 2, 2, "5 gold", "Evil little red guy");
const evilRabbit = new CharacterStats(999, 999, 999, 999, "Holy Grail", "Big mistake");

goblin.monsterExamine();

goblin.hitPoints = 5;