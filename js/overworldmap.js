class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = true;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;

            //TO DO: Determine if this object should actually mount
            object.mount(this);
        });
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;
        
        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({ 
                map: this, 
                event: events[i] 
            });
            await eventHandler.init();
        }
        this.isCutscenePlaying = false;
    }

    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX,wasY,direction) {
        this.removeWall(wasX, wasY);
        const {x, y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
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
            npcA: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(6),
                src: "/img/char/people/npc3.png",
            }),
        },
        walls: {
            [utils.asGridCoord(7,6)] : true,
            [utils.asGridCoord(8,6)] : true,
            [utils.asGridCoord(7,7)] : true,
            [utils.asGridCoord(8,7)] : true,
        }
    },
    Kitchen: {
        lowerSrc: "/img/maps/KitchenLower.png",
        upperSrc: "/img/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
              isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(6),
            }),
            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(6),
                src: "/img/char/people/npc4.png",
                behaviorLoop: [
                    { type: "stand", direction: "down", time: 1000 },
                    { type: "walk", direction: "left" },
                    { type: "walk", direction: "left" },
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "up" },
                    { type: "stand", direction: "up", time: 1500 },
                    { type: "walk", direction: "down" },
                    { type: "walk", direction: "down" },
                    { type: "walk", direction: "right" },
                    { type: "walk", direction: "right" },
                ]
            }),
            npcC: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "/img/char/people/npc5.png",
                behaviorLoop: [
                    { type: "walk", direction: "left" },
                    { type: "stand", direction: "up", time: 600 },
                    { type: "walk", direction: "right" },
                    { type: "stand", direction: "up", time: 1000 },
                    { type: "stand", direction: "down", time: 1000 },
                ]
            }),
            npcD: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(4),
                src: "/img/char/people/erio.png",
                behaviorLoop: [
                    { type: "stand", direction: "down", time: 600 },
                    { type: "stand", direction: "left", time: 1000 },
                    { type: "stand", direction: "down", time: 1000 },
                    { type: "stand", direction: "right", time: 1000 },
                ]
            }),
        },
        walls: {
            // Top wall
            [ utils.asGridCoord(1,4) ] : true,
            [ utils.asGridCoord(2,3) ] : true,
            [ utils.asGridCoord(3,3) ] : true,
            [ utils.asGridCoord(4,3) ] : true,
            [ utils.asGridCoord(5,3) ] : true,
            [ utils.asGridCoord(6,3) ] : true,
            [ utils.asGridCoord(7,3) ] : true,
            [ utils.asGridCoord(8,3) ] : true,
            [ utils.asGridCoord(9,3) ] : true,
            [ utils.asGridCoord(10,3) ] : true,
            [ utils.asGridCoord(11,4) ] : true,
            [ utils.asGridCoord(12,4) ] : true,

            // Right wall
            [ utils.asGridCoord(13,5) ] : true,
            [ utils.asGridCoord(13,6) ] : true,
            [ utils.asGridCoord(13,7) ] : true,
            [ utils.asGridCoord(13,8) ] : true,
            [ utils.asGridCoord(13,9) ] : true,

            // Bottom wall
            [ utils.asGridCoord(1,9) ] : true,
            [ utils.asGridCoord(2,9) ] : true,
            [ utils.asGridCoord(3,10) ] : true,
            [ utils.asGridCoord(4,10) ] : true,
            [ utils.asGridCoord(5,11) ] : true,
            [ utils.asGridCoord(6,10) ] : true,
            [ utils.asGridCoord(7,10) ] : true,
            [ utils.asGridCoord(8,10) ] : true,
            [ utils.asGridCoord(9,9) ] : true,
            [ utils.asGridCoord(10,9) ] : true,
            [ utils.asGridCoord(11,10) ] : true,
            [ utils.asGridCoord(12,10) ] : true,

            // Left wall
            [ utils.asGridCoord(1,5) ] : true,
            [ utils.asGridCoord(1,6) ] : true,
            [ utils.asGridCoord(1,7) ] : true,
            [ utils.asGridCoord(0,8) ] : true,

            // Other objects
            [ utils.asGridCoord(6,7) ] : true,
            [ utils.asGridCoord(7,7) ] : true,

            [ utils.asGridCoord(9,7) ] : true,
            [ utils.asGridCoord(10,7) ] : true,
        }
    },
};
