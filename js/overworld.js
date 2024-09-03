class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    startGameLoop() {
        const step = () => {

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Main camera person (Can be used for cutscenes)
            const cameraPerson = this.map.gameObjects.hero;

            // Could be unoptimized.
            Object.values(this.map.gameObjects).forEach((object) => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map
                });
            });

            this.map.drawLowerImage(this.ctx, cameraPerson);
            
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach((object) => {
                object.sprite.draw(this.ctx, cameraPerson);
            });

            this.map.drawUpperImage(this.ctx, cameraPerson);

            requestAnimationFrame(() => {
                step();
            });
        }
        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // Talk button
            this.map.checkForActionCutscene();
        })
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if(e.detail.whoId === "hero") {
                this.map.checkForFootstepCutscene();
            }
        });
    }

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();

    }
    
    init() {
        this.startMap(window.OverworldMaps.Kitchen);

        this.bindActionInput();
        this.bindHeroPositionCheck();
        
        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

//        this.map.startCutscene([
//            { who: "hero", type: "walk", direction: "down" },
//            { who: "hero", type: "walk", direction: "down" },
//            { who: "hero", type: "walk", direction: "right" },
//            { who: "hero", type: "walk", direction: "right" },
//            { who: "hero", type: "walk", direction: "right" },
//            { who: "hero", type: "walk", direction: "right" },
//            { who: "hero", type: "walk", direction: "right" },
//            { who: "hero", type: "stand", direction: "right", time: 10 },
//        ]);
    }
}
