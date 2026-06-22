function formatValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value * 10;
  return !value;
}

function getLength(value: string | unknown[]): number {
  if (typeof value === "string") return value.length;
  return value.length;
}

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

interface RatedItem {
  title: string;
  rating: number;
}

function filterByRating(items: RatedItem[]): RatedItem[] {
  return items.filter((item) => item.rating >= 4);
}

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function filterActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive);
}

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

function printBookDetails(book: Book): void {
  const availability = book.isAvailable ? "Yes" : "No";
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${availability}`
  );
}

function getUniqueValues(
  array1: (string | number)[],
  array2: (string | number)[]
): (string | number)[] {
  const combined: (string | number)[] = [];

  for (let i = 0; i < array1.length; i++) {
    let found = false;
    for (let j = 0; j < combined.length; j++) {
      if (combined[j] === array1[i]) {
        found = true;
        break;
      }
    }
    if (!found) combined[combined.length] = array1[i];
  }

  for (let i = 0; i < array2.length; i++) {
    let found = false;
    for (let j = 0; j < combined.length; j++) {
      if (combined[j] === array2[i]) {
        found = true;
        break;
      }
    }
    if (!found) combined[combined.length] = array2[i];
  }

  return combined;
}

interface Product {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

function calculateTotalPrice(products: Product[]): number {
  if (products.length === 0) return 0;

  return products.reduce((total, product) => {
    const subtotal = product.price * product.quantity;
    const discountAmount = product.discount
      ? (subtotal * product.discount) / 100
      : 0;
    return total + subtotal - discountAmount;
  }, 0);
}
