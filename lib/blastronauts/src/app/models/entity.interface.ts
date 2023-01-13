import * as Matter from 'matter-js';

export class PositionCoordinatePair {
    x: number;
    y: number;
}

export interface IEntity {
    id: number;
    body: Matter.Body;
    position: PositionCoordinatePair;
}