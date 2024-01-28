import { PRODUCT_TYPE } from './FilteringHelpers';

export interface IProduct {
  id: number;
  name: string;
  price: string;
  type: PRODUCT_TYPE;
  description: string;
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

    for (let i = 1; i <= 1000; i++) {
      const record = {
        id: i,
        name: `Product ${i}`,
        price: this.generateRandomPrice(5, 100), // Generating price between 5 and 100
        type: ['Electronic', 'Hardware', 'Household'][Math.floor(Math.random() * 3)], // Random type
        description: `Description for Product ${i}.`
      };
      records.push(record);
    }

    this.dataset = records;
  }

  generateRandomPrice(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
}
