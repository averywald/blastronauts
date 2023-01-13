import { Injectable } from '@angular/core';
import * as Matter from 'matter-js';
import { IEntity } from '../models/entity.interface';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class MatterService {

  // todo: get world from server
    // is engine supposed to be shared?

  private engine: Matter.Engine;
  private renderer: Matter.Render;

  private clientEntity: Player;

  constructor() {
    this.engine = Matter.Engine.create();
    this.engine.world.gravity.y = 0; // remove gravity

    this.renderer = Matter.Render.create({
      element: document.body,
      engine: this.engine
    });

    this.clientEntity = new Player(1);

    // add all of the bodies to the world
    // todo: gotta retrieve all other players in game
    this.addBodies([this.clientEntity]);
  }

  //#region: server interfacing
  /**
   * @todo obfuscate API endpoint routes
   */
  async registerNewPlayer(): Promise<number> {
    // get an id from the server
    return await fetch('localhost:8080/api/registerNewPlayer')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        console.log(response);
        return response.json();
      })
      .then(payload => payload.id);
  }

  // most other actions will need clientEntity ID

  //#endregion server interfacing

  /**
   * @param bodies array of entities
   * to add to the world
   * 
   * @todo get bodies from the server
   */
  private addBodies(bodies: IEntity[]): void {
    bodies.forEach(body => Matter.World.add(this.engine.world, body.body));
  }

  private applyForce(): void {
    // Matter.Body.applyForce(body, position, force)
  }

  /**
   * runs the physics engine in the client's web page
   *
   * called by component 'BlackHole', ie. the game's UI
   */
  run(): void {
    // run the engine
    Matter.Engine.run(this.engine);

    // run the renderer
    Matter.Render.run(this.renderer);
  }

  /**
   * public wrapper that interfaces with component
   * to handle player body movment
   * @param event KeyboardEvent that determines the
   * forces applied to player's body
   */
  handleInput(event: KeyboardEvent): void {
    switch (event.key) {
      case 'w': // thrust
        console.log(this.clientEntity.id);
        // Matter.Body.applyForce();
        break;
      case 'a': // turn anti-clockwise
        console.log('a !!!!');
        break;
      case 's': // reverse thrust???
        console.log('s !!!!');
        break;
      case 'd': // turn clockwise
        console.log('d !!!!');
        break;
      default:
        break; // do nothing if not [WASD] || Spacebar
    }
  }

}
