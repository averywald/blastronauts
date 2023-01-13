import * as Matter from 'matter-js';
import { IEntity, PositionCoordinatePair } from "./entity.interface";

export class Player implements IEntity {

    public id: number; // todo: assign IDs from API/DB?
    body: Matter.Body;
    // todo: how to handle dynamically?
    position: PositionCoordinatePair = {
        x: 100,
        y: 100
    }

    health: number = 100;
    ammo: {} = {
        bullets: 100,
        rockets: 10
    };

    constructor(id: number) {
        this.id = id;
        this.body = Matter.Bodies.polygon(this.position.x, this.position.y, 3, 15); // needs to be changed to show the front;
    }

    // todo: define action methods?
        // how are the actions broadcasted?
}
