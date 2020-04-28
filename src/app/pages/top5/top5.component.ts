import { Component, OnInit } from '@angular/core';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss']
})
export class Top5Component implements OnInit {

  constructor(private north: NorthwindService) { }
  // Data Variables
  dataDimension: Label[] = [];
  dataValues: number[] = [];

  ngOnInit(): void {
    this.north.getTop5('Cliente', 'DESC').subscribe((result: any)=> {
      this.dataDimension = result.datosDimension;
      this.dataValues = result.datosVenta;
    });
  }
  
}
