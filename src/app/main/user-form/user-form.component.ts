import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser,  } from '../../../data-models/DatasetGenerator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface IUserForm {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  type: string;
}

@Component({
  selector: 'df-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
  public readonly userForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    repeatPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    type: new FormControl(null, [Validators.required]),
  });

  @Input() user?: IUser;
  @Output() userCreated = new EventEmitter<IUser>();
  @Output() userDeleted = new EventEmitter<IUser>();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.user) {
      this.userForm.reset();
      this.userForm.patchValue(this.user);
    }
  }

  close() {
    this.userCreated.emit();
  }

  createUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const validation = this.user ?
      this.userService.validateUser(this.userForm.value, this.user.id) :
      this.userService.validateUser(this.userForm.value);
    if (!validation.result) {
      return;
    }
    const validatedUser = this.userForm.value;
    if (this.user) { validatedUser.id = this.user.id; }

    this.userCreated.emit(validatedUser);
  }

  deleteUser() {
    this.userDeleted.emit(this.user);
  }
}
