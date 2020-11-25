import { Component, OnInit } from '@angular/core';
import { MatterService } from '../services/matter.service';

@Component({
  selector: 'app-black-hole',
  templateUrl: './black-hole.component.html',
  styleUrls: ['./black-hole.component.sass']
})
export class BlackHoleComponent implements OnInit {

  constructor(private matterService: MatterService) {
    this.matterService.run();
  }

  ngOnInit(): void {}

}
