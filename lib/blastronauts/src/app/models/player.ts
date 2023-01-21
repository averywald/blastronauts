import * as Matter from 'matter-js';
import { IEntity, PositionCoordinatePair } from "./entity.interface";

export class Player implements IEntity {

    id: number; // todo: assign IDs from API/DB?
    body: Matter.Body;
    // todo: how to handle dynamically?

    health: number = 100;
    ammo: {} = {
        bullets: 100,
        rockets: 10
    };

    /**
     * set up the player's body with Matter.js
     * 
     * @param id player's ID in the canonical game state
     *
     */
    constructor(id: number, world: Matter.Composite) {
        this.id = id;
        this.body = Matter.Bodies.polygon(0, 0, 3, 15); // needs to be changed to show the front;
        // Matter.Body.setAngle(this.body, ); // turn it around

        console.log(Matter.Composite.bounds(world));
    }

    public get position(): PositionCoordinatePair {
        return this.body.position;
    }

    // todo: define action methods?
        // how are the actions broadcasted?
}
