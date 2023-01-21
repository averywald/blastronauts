import { Injectable } from '@angular/core';
import * as Matter from 'matter-js';
import { IEntity } from '../models/entity.interface';
import { Player } from '../models/player';

/**
 * @todo get world from server
 * @todo should Matter.Engine be here, not singleton?
 * @todo implement deleteBody(entityId: <tbd>)
 * @todo implement ServiceWorker interface?
 */
@Injectable()
export class MatterService {

  private engine: Matter.Engine;
  private renderer: Matter.Render;
  private clientEntity: Player;

  /**
   * @todo handle "this" scope binding for all EventListener callbacks
   */
  constructor() {
    this.handleInput = this.handleInput.bind(this);
  }

  /**
   * @todo give method params to hook up client to master world copy
   */
  private init(): void {
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

  /**
   * runs the physics engine in the client's web page;
   * called by component 'BlackHole', ie. the game's UI
   */
  run(): void {
    this.init();

    // run the engine
    Matter.Engine.run(this.engine);

    // run the renderer
    Matter.Render.run(this.renderer);
  }

  // #region: server interfacing
  /**
   * @todo obfuscate API endpoint routes
   * @todo POST ajax
   */
  async registerNewPlayer(): Promise<number> {
    // get an id from the server
    return await fetch('/api/assignSessionId')
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

  // #endregion server interfacing

  /**
   * @param bodies array of entities
   * to add to the world; kept generic
   * so any entity can be added
   * 
   * @todo get bodies from the server
   */
  private addBodies(bodies: IEntity[]): void {
    bodies.forEach(body => Matter.World.add(this.engine.world, body.body));
  }

  thrust(): void {
    console.log(this.clientEntity);
    // Matter.Body.applyForce(this.clientEntity.body, this.clientEntity.position, 1);
  }

  /**
   * public wrapper that interfaces with component
   * to handle player body movment
   * 
   * @param event KeyboardEvent that determines the
   * force vector applied to player's body
   * 
   * @todo implement message return type for socket.io msg
   * @todo handle spacebar - shoot
   */
  handleInput(event: KeyboardEvent): void {
    console.log(this);

    switch (event.key) {
      case 'w':
        this.thrust();
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
