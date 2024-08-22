class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector('.game-canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    init() {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };
        image.src = 'img/maps/DemoLower.png';

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow, 0, 0, 32, 32, x * 16, y * 16, 32, 32
            );
        };
        shadow.src = 'img/char/shadow.png';

        const x = .5;
        const y = 3;
        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero, 0, 0, 32, 32, x * 16, y * 16, 32, 32
            );
        };
        hero.src = 'img/char/people/hero.png';
    }
}