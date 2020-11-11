var Matter = require('matter-js');

module.exports = class MatterDriver {
    // module aliases
    Engine = Matter.Engine;
    Render = Matter.Render;
    World = Matter.World;
    Bodies = Matter.Bodies;

    _engine;
    _renderer;

    constructor(doc) {

        this._engine = this.createEngine();
        this._renderer = this.createRenderer(doc);

        // create two boxes and a ground
        var bodies = [
            boxA = Bodies.rectangle(400, 200, 80, 80),
            boxB = Bodies.rectangle(450, 50, 80, 80),
            ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })
        ];

        this.addBodiesToWorld(bodies);
            
    }

    // create an engine
    createEngine() {
        return Engine.create();
    }

    createRenderer(doc) {
        return Render.create({
            // should be document.body
            element: doc,
            engine: this._engine
        });
    }

    // add all of the bodies to the world
    addBodiesToWorld(bodies) {
        // World.add(engine.world, [boxA, boxB, ground]);
        World.add(this._engine.World, bodies);
    }

    // run the engine
    runEngine() {
        Engine.run(this._engine);
    }

    // run the renderer
    runRenderer() {
        Render.run(this._renderer);
    }
};
