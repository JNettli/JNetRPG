class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
}
window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/img/maps/DemoLower.png",
        upperSrc: "/img/maps/DemoUpper.png",
        gameObjects: [
            new GameObject({
                x: 5,
                y: 6,
            }),
            new GameObject({
                x: 4,
                y: 4,
                src: "/img/char/people/npc1.png",
            }),
        ],
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
