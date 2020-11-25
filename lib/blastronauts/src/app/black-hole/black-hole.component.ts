import { Component, OnInit } from '@angular/core';
import * as Matter from 'matter-js';

@Component({
  selector: 'app-black-hole',
  templateUrl: './black-hole.component.html',
  styleUrls: ['./black-hole.component.sass']
})
export class BlackHoleComponent implements OnInit {

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
    this.World.add(this.engine.world, [boxA, boxB, ground]);

    // run the engine
    this.Engine.run(this.engine);

    // run the renderer
    this.Render.run(this.renderer);
  }

  ngOnInit(): void {
  }

}
