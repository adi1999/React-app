@Component({
  selector: 'app-present-time',
  template: '<div>{{ presentTime }}</div>'
})
export class PresentTimeComponent {
  presentTime: string;

  constructor() {
    // Get the current date
    const currentDate = new Date();

    // Extract individual date and time components
    const year = currentDate.getFullYear();
    const month = this.padNumber(currentDate.getMonth() + 1);
    const day = this.padNumber(currentDate.getDate());
    const hours = this.padNumber(currentDate.getHours());
    const minutes = this.padNumber(currentDate.getMinutes());
    const seconds = this.padNumber(currentDate.getSeconds());

    // Build the formatted string
    this.presentTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  private padNumber(num: number): string {
    // Function to add leading zero to numbers less than 10
    return num < 10 ? `0${num}` : num.toString();
  }
}

    
