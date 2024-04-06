export type USER_TYPE = 'Admin' | 'Driver';
export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  type: USER_TYPE;
  email: string;
  password: string;
}
export class DatasetGenerator {
  dataset: any;

  constructor() {
    this.dataset = [];
  }

  init() {
    this.generate();
  }

  generate() {
    const records = [];

    for (let i = 1; i <= 10; i++) {
      const record = {
        id: i,
        userName: `User ${i}`,
        firstName: `First Name ${i}`,
        lastName: `Last Name ${i}`,
        email: `email@user${i}.com`,
        password: `Password${i}`,
        type: ['Admin', 'Driver'][Math.floor(Math.random() * 2)], // Random type
      };
      records.push(record);
    }

    this.dataset = records;
  }

  generateRandomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
}
