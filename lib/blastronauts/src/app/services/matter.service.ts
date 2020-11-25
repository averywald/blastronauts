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

  private engine;
  private renderer;

  constructor() {

    this.engine = this.Engine.create();
    this.renderer = this.Render.create({
      element: document.body,
      engine: this.engine
    });

    // create two boxes and a ground
    var boxA = this.Bodies.rectangle(400, 200, 80, 80);
    var boxB = this.Bodies.rectangle(450, 50, 80, 80);
    var ground = this.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    this.addBodies([boxA, boxB, ground]);

  }

  /**
   * @param bodies array of matter-js
   * bodies to add to the world
   * @todo should restrict array type
   */
  private addBodies(bodies: object[]): void {
    this.World.add(this.engine.world, bodies);
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

}
