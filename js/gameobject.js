class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";

        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/img/char/people/hero.png",
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        this.talking = config.talking || [];
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        // If we have a behavior, kick off after a short delay.
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10);
    }

    update() {
        
    }

    async doBehaviorEvent(map) {
        // Don't do anything if there's an important cutscene or if no config to do anything is present.
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return;
        }

        // Check if the loop is already running
        if (this.isBehaviorLoopRunning) {
            return;
        }

        // Set the flag to indicate the loop is running
        this.isBehaviorLoopRunning = true;

        while (true) {
            // Setting up our event with relevant information
            let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
            eventConfig.who = this.id;

            // Create an event instance out of our next event config
            const eventHandler = new OverworldEvent({ map, event: eventConfig });
            await eventHandler.init(); 

            // Setting the next event to fire
            this.behaviorLoopIndex += 1;
            if (this.behaviorLoopIndex === this.behaviorLoop.length) {
                this.behaviorLoopIndex = 0;
                console.log("looping!");
            }

            // Introduce a delay before the next iteration
            await delay(100); // Delay in milliseconds (e.g., 100ms = 0.1 second)

            // Break the loop if the map changes or other conditions are met
            if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
                break;
            }
        }

        // Reset the flag when the loop ends
        this.isBehaviorLoopRunning = false;
    }
    
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
