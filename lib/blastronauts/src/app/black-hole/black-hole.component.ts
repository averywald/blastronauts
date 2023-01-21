import { Component, OnInit } from '@angular/core';
import { MatterService } from '../services/matter.service';

@Component({
  selector: 'app-black-hole',
  templateUrl: './black-hole.component.html',
  styleUrls: ['./black-hole.component.sass'],
  providers: [MatterService]
})
export class BlackHoleComponent implements OnInit {

  // private matterService: MatterService = new MatterService();

  /**
   * perform DI service(s) setup
   * 
   * @param matterService Matter.js game engine instance;
   * handles rendering data sent to and from backend
   */
  constructor(private matterService: MatterService) {
    this.matterService.run(); // run the matter engine
  }

  /**
   * component lifecycle method;
   * 
   * @todo add all listeners
   */
  ngOnInit(): void {
    // works in ngOnInit() without browser window focus?
    addEventListener('keypress', this.matterService.handleInput);
  }

}
