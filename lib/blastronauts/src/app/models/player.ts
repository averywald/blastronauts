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

    constructor(id: number) {
        this.id = id;
        this.body = Matter.Bodies.polygon(100, 100, 3, 15); // needs to be changed to show the front;
    }

    public get position(): PositionCoordinatePair {
        return this.body.position;
    }

    // todo: define action methods?
        // how are the actions broadcasted?
}
