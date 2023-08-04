import { Component } from '@angular/core';

@Component({
  selector: 'app-your-component',
  templateUrl: './your-component.component.html',
  styleUrls: ['./your-component.component.css']
})
export class YourComponent {
  options = [
    { label: 'Select All', value: 'select-all' },
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    // Add more options if needed
  ];

  selectedOptions: string[] = [];

  constructor() {
    // Initialize selectedOptions here if needed
  }

  onSelectionChange(event: any) {
    if (this.selectedOptions.includes('select-all')) {
      // If "Select All" is already selected, remove it from the selectedOptions array
      this.selectedOptions = this.selectedOptions.filter(option => option !== 'select-all');
    } else if (this.selectedOptions.length === this.options.length - 1) {
      // If all other options are already selected, replace with "Select All"
      this.selectedOptions = ['select-all'];
    } else {
      // Handle other selections
      console.log('Selected options:', this.selectedOptions);
    }
  }
}


