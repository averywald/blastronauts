import { Component, OnInit } from '@angular/core';
import { MatterService } from '../services/matter.service';

@Component({
  selector: 'app-black-hole',
  templateUrl: './black-hole.component.html',
  styleUrls: ['./black-hole.component.sass'],
  providers: [MatterService]
})
/**
 * @todo handle viewport resizing; translate to MatterService world bounds
 */
export class BlackHoleComponent implements OnInit {
  /**
   * perform DI service(s) setup
   * 
   * @param matterService Matter.js game engine instance;
   * handles rendering data sent to and from backend
   */
  constructor(private matterService: MatterService) {
    this.matterService.run(window.innerWidth, window.innerHeight); // run the matter engine
  }

  /**
   * component lifecycle method;
   * 
   * @todo add all listeners
   */
  ngOnInit(): void {
    // works in ngOnInit() without browser window focus?
    addEventListener('keydown', this.matterService.registerInput);
    addEventListener('keyup', this.matterService.releaseInput)
  }

}
