class Sprite {
    constructor(config) {
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        };

        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false;
        if (this.useShadow) {
            this.shadow.src = "/img/char/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        };

        this.animations = config.animations || {
            idleDown: [[0, 0]],
        };
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

        this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
    }
}
