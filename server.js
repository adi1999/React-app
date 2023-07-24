const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [
  { id: 1, username: 'user1', password: 'password1', metamaskKey: 'metamaskKey1' },
  { id: 2, username: 'user2', password: 'password2', metamaskKey: 'metamaskKey2' },
  { id: 3, username: 'user3', password: 'password3', metamaskKey: 'metamaskKey3' },
  { id: 4, username: 'user4', password: 'password4', metamaskKey: 'metamaskKey4' },
  { id: 5, username: 'user5', password: 'password5', metamaskKey: 'metamaskKey5' },
  { id: 6, username: 'user6', password: 'password6', metamaskKey: 'metamaskKey6' }
];

// API to get the list of users
app.get('/users', (req, res) => {
    console.log("users is called");
  res.json(users.map(({ id, username, password, metamaskKey }) => ({ id, username , password, metamaskKey})));
});

// API for user login
app.post('/login', (req, res) => {
    console.log("login is called");
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');


  
});





<mat-form-field>
  <mat-label>First Dropdown</mat-label>
  <mat-select (selectionChange)="onFirstDropdownChange($event)">
    <mat-option *ngFor="let option of firstDropdownOptions" [value]="option.value">
      {{ option.name }}
    </mat-option>
  </mat-select>
</mat-form-field>

<mat-form-field *ngIf="secondDropdownOptions.length > 0">
  <mat-label>Second Dropdown</mat-label>
  <mat-select>
    <mat-option *ngFor="let option of secondDropdownOptions" [value]="option.value">
      {{ option.name }}
    </mat-option>
  </mat-select>
</mat-form-field>




import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-component',
  templateUrl: './dropdown-component.component.html',
  styleUrls: ['./dropdown-component.component.css'],
})
export class DropdownComponent {
  firstDropdownOptions = [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
    { name: 'Option 3', value: 'option3' },
  ];

  secondDropdownOptions: any[] = [];

  onFirstDropdownChange(event: any) {
    const selectedValue = event.value;
    // Replace this switch statement with your logic to fetch options based on the selectedValue.
    switch (selectedValue) {
      case 'option1':
        this.secondDropdownOptions = [
          { name: 'Option A', value: 'optionA' },
          { name: 'Option B', value: 'optionB' },
        ];
        break;
      case 'option2':
        this.secondDropdownOptions = [
          { name: 'Option X', value: 'optionX' },
          { name: 'Option Y', value: 'optionY' },
        ];
        break;
      case 'option3':
        this.secondDropdownOptions = [
          { name: 'Option P', value: 'optionP' },
          { name: 'Option Q', value: 'optionQ' },
        ];
        break;
      default:
        this.secondDropdownOptions = [];
    }
  }
}

