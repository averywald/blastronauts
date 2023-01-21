import { Injectable } from '@angular/core';
import * as Matter from 'matter-js';
import { IEntity } from '../models/entity.interface';
import { Player } from '../models/player';

/**
 * @todo get world from server
 * @todo should Matter.Engine be here, not singleton?
 * @todo implement deleteBody(entityId: <tbd>)
 * @todo implement ServiceWorker interface?
 * @todo world runoff should come out the other side
 */
@Injectable()
export class MatterService {

  private engine: Matter.Engine;
  private renderer: Matter.Render;
  private clientEntity: Player;

  /**
   * handle "this" scope binding for all EventListener callbacks
   */
  constructor() {
    this.handleInput = this.handleInput.bind(this);
  }

  /**
   * @param width the width to create the Matter world
   * @param height the height to create the Matter world
   * 
   * @todo give method params to hook up client to master world copy
   */
  private init(width: number, height: number): void {
    this.engine = Matter.Engine.create(); // init the physics engine instance
    this.engine.world.gravity.y = 0; // remove gravity

    // init the renderer to run the engine in-browser
    this.renderer = Matter.Render.create({
      element: document.body,
      engine: this.engine,
      options: {
        width: width,
        height: height
      }
    });

    // create a player to render in the world
    this.clientEntity = new Player(1, this.engine.world);

    // add all of the bodies to the world
    // todo: gotta retrieve all other players in game
    this.addBodies([this.clientEntity]);
  }

  /**
   * runs the physics engine in the client's web page;
   * called by component 'BlackHole', ie. the game's UI
   * 
   * @param width the width to create the Matter world
   * @param height the height to create the Matter world
   * 
   * @todo: provide world bounds from BlackHoleComponent
   */
  run(width: number, height: number): void {
    this.init(width, height); // set up the Matter world, engine
    Matter.Engine.run(this.engine); // run the engine
    Matter.Render.run(this.renderer); // run the renderer
  }

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

  /**
   * @param bodies array of entities
   * to add to the world; kept generic
   * so any entity can be added
   * 
   * @todo get bodies from the server
   */
  private addBodies(bodies: IEntity[]): void {
    bodies.forEach(body => Matter.Composite.add(this.engine.world, body.body));
  }

  private thrust(): void {
    let force = 0.0005;

    let vector = {
      x: Math.cos(this.clientEntity.body.angle) * force,
      y: Math.sin(this.clientEntity.body.angle) * force
    };

    Matter.Body.applyForce(
      this.clientEntity.body, this.clientEntity.position, vector);
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
