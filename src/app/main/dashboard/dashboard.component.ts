import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../data-models/DatasetGenerator';
import { UserService } from '../services/user.service';

@Component({
  selector: 'df-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: IUser[];
  showForm: boolean;
  selectedUser: IUser;
  creationErrors: string[];
  creationSuccess: boolean;
  constructor(private productService: UserService) {
  }
  ngOnInit(): void {
    this.users = this.productService.getAll();
    this.productService.userCreationError.subscribe((errors) => {
      this.creationErrors = errors;
      setTimeout(() => {
        this.creationErrors = [];
      }, 3000);
    });
    this.productService.userCreationSuccess.subscribe(() => {
      this.creationSuccess = true;
      setTimeout(() => {
        this.creationSuccess = false;
      }, 3000);
    });

  }

  idTrackBy(index, product: IUser) {
    return product.id;
  }

  saveUser(user: IUser) {
    if (!user) {
      this.showForm = false;
      return;
    }

    user.id ? this.productService.updateUser(user.id, user) : this.productService.createUser(user);
    this.showForm = false;
  }

  selectUser(user: IUser) {
    this.showForm = false;
    this.selectedUser = user;
    this.showForm = true;
  }

  deleteUser($event: IUser) {
    this.productService.deleteUser($event.id);
    this.showForm = false;
  }

  onCreateUserClicked() {
    this.showForm = true;
    setTimeout(() => {
      scrollTo(0, document.body.scrollHeight);
    }, 500);
  }
}
