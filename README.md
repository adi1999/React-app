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

  selectedOption: string;

  constructor() {
    // Initialize selectedOption here if needed
  }

  onSelectionChange(event: any) {
    if (this.selectedOption === 'select-all') {
      // Select all options
      this.options.forEach(option => {
        if (option.value !== 'select-all') {
          this.selectedOption = option.value;
        }
      });
    } else {
      // Handle other selections
      console.log('Selected option:', this.selectedOption);
    }
  }
}

