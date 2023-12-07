import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge-meter',
  templateUrl: './gauge-meter.component.html',
  styleUrls: ['./gauge-meter.component.css']
})
export class GaugeMeterComponent implements OnInit {
  gaugeType = "semi";
  gaugeValue = 90;
  gaugeLabel = "MAtch";
  gaugeAppendText = "%";
  
  public canvasWidth
  public needleValue
  public centralLabel
  public label
  public options
  constructor() { }

  ngOnInit(): void {
    this.canvasWidth = 300
    this.needleValue =50
    this.centralLabel = ''
    this.options = {
    hasNeedle: true,
    needleColor: 'grayblack',
    needleUpdateSpeed: 800,
    arcColors: ['red','red','red', 'yellow','yellow','yellow','yellow','green','green','green'],
    arcDelimiters: [10,20,30,40,50,60,70,80,90],
    rangeLabel: ['0', '100'],
    needleStartValue: 0,
    arcLabels:['10','20','30','40','50','60','70','80','90'],
    arcpadding: 5
  }}

}
