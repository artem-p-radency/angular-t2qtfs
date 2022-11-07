import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { oneLowercaseCharacterValidator } from './validators/one-lowercase.validator';
import { oneSpecialCharacterValidator } from './validators/one-special.validator';
import { oneUppercaseCharacterValidator } from './validators/one-uppercase.validator';

// CODE HERE
//
// I want to be able to create a new user for the application. Implement a reactive form that I can submit
//
// Form:
// - username (required, min 3, max 24 characters)
// - email (required, valid email address)
// - type (required, select dropdown with either 'user' or 'admin')
// - password (required, min 5, max 24 characters, upper and lower case, at least one special character)
//
// Requirements:
// The form should submit a valid UserDto object (call createUser() function)
// The submit button should be disabled if the form is invalid
// The submit button should be disabled while the submit request is pending
// If the request fails the button must become submittable again (error message must not be displayed)
// Errors should be displayed under each input if not valid
//
// Futher Notes:
// Styling is not important, use default HTML elements (no angular material or bootstrap)

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm = this.fb.group({
    username: ['', [Validators.minLength(3), Validators.maxLength(24)]],
    email: ['', [Validators.email]],
    type: [''],
    password: [
      '',
      [
        Validators.minLength(3),
        Validators.maxLength(24),
        oneUppercaseCharacterValidator(),
        oneLowercaseCharacterValidator(),
        oneSpecialCharacterValidator(),
        // Validators.pattern(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~])[A-Za-z\d@ !"#$%&'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~]+$/
        // ),
      ],
    ],
  });

  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }

  get type() {
    return this.userForm.get('type');
  }

  get password() {
    return this.userForm.get('password');
  }

  formActive = true;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {}

  async onSubmit() {
    this.formActive = false;
    try {
      await this.appService.createUser({
        username: this.username.value,
        email: this.email.value,
        type: this.type.value,
        password: this.password.value,
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.formActive = true;
    }
  }
}
