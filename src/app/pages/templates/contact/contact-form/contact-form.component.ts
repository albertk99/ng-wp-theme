import { Component, OnInit } from '@angular/core';
import { Email } from './email.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  public model: Email;
  public submitted: Boolean = false;
  public error: Boolean = false;

  ngOnInit() {
    this.model = new Email();
  }

  onSubmit() {
    console.log('submitted!');
    this.submitted = true;
    this.error = true;
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
