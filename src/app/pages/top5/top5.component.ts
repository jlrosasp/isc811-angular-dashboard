import { Component, OnInit } from '@angular/core';
import { NorthwindService } from 'src/app/services/northwind.service';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs/internal/Observable';

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
  // Data Ng Select 
  defaultBindingsList = [
    { value: 1, label: 'Cliente', dimension: '[Dim Cliente].[Dim Cliente Nombre]' },
    { value: 2, label: 'Producto', dimension: '[Dim Producto].[Dim Producto Nombre]' },
    { value: 3, label: 'Empleado', dimension: '[Dim Empleado].[Dim Empleado Nombre]' }
  ];
  selectedDimension = null;
  // Ng-Select Multiple
  customer$: Observable<any>;
  selectedCustomer: string[] = [];

  ngOnInit(): void {
    
    this.selectedDimension = this.defaultBindingsList[0];
    // this.north.getTop5(this.selectedDimension.label, 'DESC').subscribe((result: any)=> {
    //   this.dataDimension = result.datosDimension;
    //   this.dataValues = result.datosVenta;
    // });

    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC');
  }

  onChangeDimension($event) {
    
    this.selectedDimension = $event;
    this.customer$ = this.north.getItemsByDimension(`${this.selectedDimension.dimension}`, 'ASC');

    // this.north.getTop5(this.selectedDimension.label, 'DESC').subscribe((result: any)=> {
    //   this.dataDimension = result.datosDimension;
    //   this.dataValues = result.datosVenta;
    // });
  }

  onChangeValues() {
    this.north.getDataPieByDimension(this.selectedDimension.dimension, 'DESC', this.selectedCustomer).subscribe((result: any)=> {
      this.dataDimension = result.datosDimension;
      this.dataValues = result.datosVenta;
    });
  }

  clearModel() {
    this.selectedCustomer = [];
  }
  
}
