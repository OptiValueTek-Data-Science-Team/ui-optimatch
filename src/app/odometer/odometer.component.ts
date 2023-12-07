// odometer.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-odometer',
  templateUrl: './odometer.component.html',
  styleUrls: ['./odometer.component.css']
})
export class OdometerComponent {
  @Input() counterValue = 0;

  increment() {
    this.counterValue += 1000;
  }
}
