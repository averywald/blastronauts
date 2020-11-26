import { Injectable } from '@angular/core';
import * as Matter from 'matter-js';

@Injectable({
  providedIn: 'root'
})
export class MatterService {

  // matter-js aliases
  private Engine = Matter.Engine;
  private Bodies = Matter.Bodies;
  private Render = Matter.Render;
  private World = Matter.World;

  private engine = this.Engine.create();
  private renderer;

  constructor() {

    this.engine.world.gravity.y = 0; // remove gravity

    this.renderer = this.Render.create({
      element: document.body,
      engine: this.engine
    });

    var player = this.Bodies.polygon(300, 300, 3, 15); // needs to be changed to show the front

    // add all of the bodies to the world
    this.addBodies([player]);

  }

  /**
   * @param bodies array of matter-js
   * bodies to add to the world
   * @todo should restrict array type
   */
  private addBodies(bodies: object[]): void {
    this.World.add(this.engine.world, bodies);
  }

  private applyForce(): void {
    // Matter.Body.applyForce(body, position, force)
  }

  /**
   * runs the physics engine in the client's web page
   *
   * called by component 'view'
   */
  run(): void {
    // run the engine
    this.Engine.run(this.engine);

    // run the renderer
    this.Render.run(this.renderer);
  }

  /**
   * public wrapper that interfaces with component
   * to handle player body movment
   * @param event KeyboardEvent that determines the
   * forces applied to player's body
   */
  handleInput(event: KeyboardEvent): void {

    switch (event.key) {
      case 'w':
        console.log(this.World);
        // Matter.Body.applyForce();
        break;
      case 'a':
        console.log('a !!!!');
        break;
      case 's':
        console.log('s !!!!');
        break;
      case 'd':
        console.log('d !!!!');
        break;
      default:
        break; // do nothing if not WASD / Spacebar
    }

  }

}
