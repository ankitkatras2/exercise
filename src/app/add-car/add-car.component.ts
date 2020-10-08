import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any
@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  @Input()
  showModal: boolean = false;
  @Output()
  popupClose: EventEmitter<any> = new EventEmitter<any>();
  addCarForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addCarForm = fb.group({
      'brand': ['', [Validators.required]],
      'color': ['', [Validators.required]],
      'year': ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      'vin': ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.showModal) {
      this.show();
    }
  }

  show() {
    $('#myLargeModalLabel').modal('show');
  }

  close() {
    $('#myLargeModalLabel').modal('hide');
    this.popupClose.emit(null);

  }

  addCar() {
    $('#myLargeModalLabel').modal('hide');
    this.popupClose.emit(this.addCarForm.value);
  }
}
