import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rotelle',
  templateUrl: './rotelle.component.html',
  styleUrls: ['./rotelle.component.scss']
})
export class RotelleComponent implements OnInit {
  fontColor = "green";

  constructor() { }

  ngOnInit(): void {
  }

  updateLike(){
    console.log('hi')
    this.fontColor ='red';
  }

  updateShare(){
    console.log('hi')
    this.fontColor ='green';
  }

}
