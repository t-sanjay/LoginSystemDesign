import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { UserDashboardService } from '../../services/user-dashboard.service';

@Component({
  selector: 'user-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
  ],
  template: `
    <div class="container">
      <div class="grid">
        <div class="col">
          <div class="field">
            <div class="flex align-content-left justify-content-left">
              <button
                pButton
                pRipple
                label="Add Filter +"
                class="p-button-secondary"
                (click)="addFilterSet()"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <div *ngFor="let set of filterSet.controls; let i = index">
        <div [formGroup]="getFormGroup(set)">
          <div class="grid">
            <div class="col-3 ">
              <div class="field">
                <p-dropdown
                  class="w-100"
                  [options]="fields"
                  formControlName="field"
                  (onChange)="fieldChange(i)"
                  [style]="{ width: '100%' }"
                  [showClear]="true"
                  placeholder="Select a field to filter"
                ></p-dropdown>
              </div>
            </div>
            <div class="col-3">
              <div class="field">
                @if (operatorValue[i] ) {
                <p-dropdown
                  class="w-100"
                  [options]="operatorValue[i]"
                  formControlName="operator"
                  [style]="{ width: '100%' }"
                  [showClear]="true"
                  placeholder="Select operator"
                ></p-dropdown>
                }
              </div>
            </div>
            <div class="col-4">
              <div class="field">
                <input
                  type="text"
                  pInputText
                  [style]="{ width: '100%' }"
                  formControlName="value"
                />
              </div>
            </div>
            <div class="col-1">
              <div class="field flex">
                <div class="mr-3">
                  <button
                    pButton
                    pRipple
                    class="p-button-secondary"
                    (click)="addFilterSet()"
                  >
                    <span class="pi pi-plus"></span>
                  </button>
                </div>
                <div>
                  <button
                    pButton
                    pRipple
                    class="p-button-danger"
                    (click)="removeFilterSetAt(i)"
                  >
                    <span class="pi pi-minus"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
      <button
        pButton
        pRipple
        label="Search"
        class="p-button-secondary"
        (click)="search()"
      ></button>
      </div>
    </div>

  `,
  styles: [
    `
      .p-dropdown .p-component .p-inputwrapper .p-dropdown-clearable {
        width: 100%;
      }
    `,
  ],
})
export class UserDashboardComponent implements OnInit {
  filterSet: FormArray;

  fields = [
    { label: 'Birth Date', key: '', type: 'date' },
    { label: 'Gender', key: '', type: 'nvarchar' },
    { label: 'Martial Status', key: '', type: 'nvarchar' },
    { label: 'Car Year', key: '', type: 'nvarchar' },
    { label: 'Car Make', key: '', type: 'nvarchar' },
    { label: 'Car Model', key: '', type: 'nvarchar' },
    { label: 'Insurance Company', key: '', type: 'nvarchar' },
    { label: 'City', key: '', type: 'nvarchar' },
    { label: 'State', key: '', type: 'nvarchar' },
    { label: 'County', key: '', type: 'nvarchar' },
    { label: 'ZIP Code', key: '', type: 'nvarchar' },
    { label: 'Own or Rent', key: '', type: 'nvarchar' },
    { label: 'Credit Rating', key: '', type: 'nvarchar' },
    { label: 'Primary Phone', key: '', type: 'number' },
    { label: 'Email', key: '', type: 'string' },
  ];

  operator = [
    { label: 'Contains', key: '', type: ['nvarchar', 'string'] },
    { label: 'Does Not Contain', key: '', type: ['nvarchar', 'string'] },
    { label: 'Is', key: '', type: ['nvarchar', 'string', 'date'] },
    { label: 'Is Not', key: '', type: ['nvarchar', 'string', 'date'] },
    { label: 'Between', key: '', type: ['date'] },
  ];

  operatorValue: any[] = [];

  /**
   *
   */
  constructor(
    private router: Router,
    private userService: UserDashboardService
  ) {}

  ngOnInit(): void {
    this.filterSet = new FormArray([]);
    this.getDefaultValues();
  }
  getDefaultValues() {}

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  getFilterSetFg() {
    return new FormGroup({
      field: new FormControl(''),
      operator: new FormControl(''),
      value: new FormControl(''),
    });
  }

  addFilterSet() {
    this.filterSet.push(this.getFilterSetFg());
    console.log(this.filterSet.value);
  }

  removeFilterSetAt(index) {
    this.filterSet.removeAt(index);
    this.operatorValue.splice(index, 1);
  }

  getFormGroup(set): FormGroup {
    return set as FormGroup;
  }

  getFilterSet(index) {
    return this.filterSet.value[index];
  }

  getOperators(index) {
    const set = this.getFilterSet(index);
    if (set.field) {
      const res = this.operator.filter((x) => x.type.includes(set.field.type));
      return res;
    }
    return this.operator;
  }

  fieldChange(index) {
    const set = this.getFilterSet(index);
    if (set.field && !this.operatorValue[index]) {
      const operators = this.operator.filter((x) =>
        x.type.includes(set.field.type)
      );
      this.operatorValue.push([...operators]);
    }
  }

  search(){
    
  }
}
