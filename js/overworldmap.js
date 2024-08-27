class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
}
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/img/maps/DemoLower.png",
        upperSrc: "/img/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
              isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
            }),
            npc: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(6),
                src: "/img/char/people/npc1.png",
            }),
            npc2: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: "/img/char/people/npc2.png",
            }),
      }
    },
    Kitchen: {
        lowerSrc: "/img/maps/KitchenLower.png",
        upperSrc: "/img/maps/KitchenUpper.png",
        gameObjects: [
            new GameObject({
                x: 2,
                y: 6,
            }),
            new GameObject({
                x: 9,
                y: 6,
                src: "/img/char/people/npc2.png",
            }),
            new GameObject({
              x: 4,
              y: 4,
              src: "/img/char/people/npc3.png"
            })
        ],
    },
};
