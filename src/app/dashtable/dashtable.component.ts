import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashtable',
  templateUrl: './dashtable.component.html',
  styleUrls: ['./dashtable.component.css']
})
export class DashtableComponent implements OnInit {
  addCarForm: FormGroup;
  products: any = [];
  cols: any[];
  addModalPopup = false;
  constructor(private fb: FormBuilder) {
    this.addCarForm = fb.group({
      'brand': ['', [Validators.required]],
      'color': ['', [Validators.required]],
      'year': ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      'vin': ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.products = [
      { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
      { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
      { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
      { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
      // { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
      // { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
      // { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
      // { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
      // { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
      // { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
    ];

    this.cols = [
      { field: 'brand', header: 'Brand' },
      { field: 'year', header: 'Year' },
      { field: 'color', header: 'Color' },
      { field: 'vin', header: 'Vin' }
    ];
  }

  addCar() {
    // this.addModalPopup = true;
    this.products.push(this.addCarForm.value);
  }

  updateFromChild($event) {
    console.log($event);
    this.addModalPopup = false;
    if ($event !== null) {
      this.products.push($event);
    }
  }

}
