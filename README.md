<mat-form-field>
  <mat-label>First Dropdown</mat-label>
  <mat-select (selectionChange)="onFirstDropdownChange($event)" formControlName="firstDropdownControl">
    <mat-option *ngFor="let option of dropdownOptions" [value]="option.value">{{ option.label }}</mat-option>
  </mat-select>
</mat-form-field>

<mat-form-field>
  <mat-label>Second Dropdown</mat-label>
  <mat-select formControlName="secondDropdownControl">
    <mat-option *ngFor="let option of secondDropdownOptions" [value]="option.value">{{ option.label }}</mat-option>
  </mat-select>
</mat-form-field>


import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dropdownOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    // Add more options as needed
  ];

  // Create a form group
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form group with form controls
    this.formGroup = this.formBuilder.group({
      firstDropdownControl: [''], // Initialize the first dropdown control
      secondDropdownControl: [''] // Initialize the second dropdown control
    });
  }

  onFirstDropdownChange(event: any) {
    const selectedValue = event.value;
    // Filter the dropdownOptions array to get the options for the second dropdown based on the selected value
    this.secondDropdownOptions = this.dropdownOptions.filter(option => option.value === selectedValue);
    // Reset the second dropdown value when the first dropdown changes
    this.formGroup.get('secondDropdownControl')?.setValue('');
  }
}




