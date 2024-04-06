import { Injectable } from '@angular/core';
import { DATASET_MOCK } from '../../../data-models/mocks/DATASET_MOCK';
import { IUser } from '../../../data-models/DatasetGenerator';
import { IUserForm } from '../user-form/user-form.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  productDataset = JSON.parse(JSON.stringify(DATASET_MOCK, null, 2));
  userCreationError = new Subject<string[]>();
  userCreationSuccess = new Subject<boolean>();
  constructor() {}

  public getAll(): IUser[] {
    return this.productDataset;
  }

  public getById(id: number): IUser | null {
    return this.productDataset.find((product) => product.id === id) || null;
  }

  public createUser(data: IUser): void {
    data.id = this.productDataset.length + 1;
    this.productDataset.push(data);
  }

  public updateUser(id: number, data: IUser): void {
    const index = this.productDataset.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.productDataset[index] = data;
    }
  }

  public deleteUser(id: number): void {
    const index = this.productDataset.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.productDataset.splice(index, 1);
    }
  }

  validateUser(value: IUserForm, userId?: number): {result: boolean, message: string} {
    const errors = [];
    if (value.password !== value.repeatPassword) {
      errors.push('Passwords do not match');
    }
    if(value.password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (this.productDataset.find((user) => user.username === value.username && user.id !== userId)) {
      errors.push('Username already exists');
    }

    if (errors.length) {
      this.userCreationError.next(errors);
      return {result: false, message: errors.join(', ')};
    } else {
      this.userCreationSuccess.next(true);
      return {result: true, message: 'User created successfully'};
    }
  }
}
