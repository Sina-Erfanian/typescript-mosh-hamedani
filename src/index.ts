let num = 123_456_789;
// num = "sina" // error

let str = "SinaErfanian";
// str = true // error

// type any
// we can use "noImplicitAny": false in tsconfig to remove the error of any type
// we should avoid type any
function render(document) {
  console.log(document);
}

// Arrays
let arr: number[] = [1, 2, 3];
// or
let arr2 = [1, 2, 3]; // this line is exactly same with the above code
// if we loop over line above we see that get the method of number in autocomplete

// tuples
let user: [string, number] = ["sina", 12];
// when we compile tuples are just a regular array
// tuples are useful when we have 2 value (if we have more is somehow trouble to read it)

// enum
const enum Size {
  Small = 1,
  Medium,
  Large,
}
const enum StringSize {
  Small = "s",
  Medium = "m",
  Large = "l",
}

const mySize: Size = Size.Small;
const mySize2: Size = Size.Medium;
const mySize3: Size = Size.Large;
const StrSize: StringSize = StringSize.Small;
const StrSize2: StringSize = StringSize.Medium;
const StrSize3: StringSize = StringSize.Large;

// functions
// we can make a parameter optional with question mark (?) like  taxYear?:number
function calculateTax(income: number, taxYear: number = 2022): number {
  if (taxYear < 2022) {
    return income * 1.2;
  }
  return income * 1.3;
}
// we use default parameter for second one
calculateTax(10_000);

// Objects
// let employee = {id :1}
// employee.name = "sina" // error
// the above line is not valid in typescript

let employee: {
  readonly id: number;
  name: string;
  retire?: (date: Date) => void;
} = {
  id: 1,
  name: "",
};

employee.name = "Sina";
// employee.id = 2 error (readonly)
// we can also use optional property with ?

// type aliases
// the benefit of the type is that we can use it for multiple object
type Employee = {
  readonly id: number;
  name: string;
  retire?: (date: Date) => void;
};

let newEmployee: Employee = {
  id: 2,
  name: "sina",
};

// Union Types

function kgToLbs(weight: string | number): number {
  if (typeof weight === "number") {
    return weight * 2.2;
  } else {
    return parseInt(weight) * 2.2;
  }
}

kgToLbs(10);
kgToLbs("10");

// Intersection Types

type Draggable = {
  drag: () => void;
};
type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;

// we should have both drag and resize method in our object
let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

// Literal Types
// in here example we can just put 50 or 100 in our variable
// in the other word we specify exactly what value we want
type Quantity = 50 | 100;
let quantity: Quantity = 50;

// Nullable Types
// Typescript is very strict about undefined and null
// because they are make problem

function greet(name: string | null | undefined) {
  if (name) {
    console.log(name.toUpperCase());
  } else {
    console.log("Hola!");
  }
}

greet(null);

// Optional Chaining

type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);
// here when we pass 0 to our function we get null so we don't have birthday property
// to avoid this error we can use Optional property access operator
// this piece of code gets executed only if you have a customer that is not null
console.log(customer?.birthday?.getFullYear());

// Optional element access operator
// customers?.[0] => for arrays
// we also have optional call (search about it)

// Nullish Coaelscing Operator

let speed: number | null = null;

// if the speed is not null or undefined use that value otherwise use 30
let ride = {
  speed: speed ?? 30,
};

// Type Assertions
// this is for telling the compiler that we know more about the type of this object

let phone = document.getElementById("phone") as HTMLInputElement;
// or
let phone2 = <HTMLInputElement>document.getElementById("phone");

phone.value;

// the unknown type

// using the unknown type is preferred to using the any type
// because the compiler forces us to do some type checking to make sure the methods we are calling exists on the target object

// function render2(document : any) {
//     document.move()
// }
// function render3(document : unknown) {
//     document.move()
// }

// never type

// we have a function that will never return
// function reject(message : string) : never {
//     throw new Error(message)
// }

// reject("...")
// console.log("Hello world");

// function processEvent() : never {
//     while(true) {
//         // code
//     }
// }

// processEvent()
// console.log("Hello World"); // Unreachable code

// Classes

class Account {
  readonly id: number;
  owner: string;
  private balance: number;
  nickname?: string;

  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Invalid Amount");
    }
    this.balance += amount;
  }

  getBalance() {
    return this.balance;
  }
}

let account = new Account(1, "Sina", 20);
account.deposit(100);
console.log(account instanceof Account); // true
// we can use readonly and optional property in classes
// we can use private keyword to access that property or method only in class
// console.log(account.balance); error (private)

// Parameter Properties and getter & setter

class Employees {
  constructor(public id: number, public name: string, private age: number) {}
  get userAge(): number {
    return this.age;
  }
  set userAge(value: number) {
    if (value < 0) {
      throw new Error("Invalid Age");
    }
    this.age = value;
  }
}
// we can validate the value inside setter

let employee1 = new Employees(1, "sina", 20);
console.log(employee1.userAge);

// Index Signatures

// when we want to add properties to an object dynamically we use index signatures

class SeatAssignment {
  [seatNumber: string]: string;
}

let seats = new SeatAssignment();
seats.A1 = "Mosh";
seats.A2 = "Sina";

// Static

class Ride {
  private static _activeRides: number = 0;

  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }

  static get activeRides() {
    return Ride._activeRides;
  }
}

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();

console.log(Ride.activeRides);

// Inheritance

class Person {
  constructor(public firstname: string, public lastname: string) {}
  get fullName() {
    return this.firstname + " " + this.lastname;
  }
  walk() {
    console.log("walking");
  }
}

class Student extends Person {
  constructor(public studentId, firstname, lastname) {
    super(firstname, lastname);
  }
  takeTest() {
    console.log("Taking a test");
  }
}

let student = new Student(1, "sina", "erfanian");

// Method Overriding

class Teacher extends Person {
  override get fullName() {
    return "Professor " + super.fullName;
  }
}

let teacher = new Teacher("John", "Smith");
console.log(teacher.fullName);

// Polymorphism

function printNames(people: Person[]) {
  for (let person of people) {
    console.log(person.fullName);
  }
}

printNames([
  new Student(1, "sina", "Erfanian"),
  new Teacher("mosh", "Hamedani"),
]);

// Protected vs Private
// the difference is that protected members are inherited but private members are not

// Abstract
// we are telling the typescript compiler that this class is abstract or simple or not ready
// so another class like circle has to extend it
abstract class Shape {
  constructor(public color: string) {}
  abstract render(): void;
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  override render(): void {
    console.log("Rendering circle");
  }
}

// const shape = new Shape(); error (Abstract)

// Interfaces

interface Calendar {
  name: string;
  addEvent(): void;
  removeEvent(): void;
}

interface CloudCalendar extends Calendar {
  sync(): void;
}

class GoogleCalendar implements Calendar {
  constructor(public name: string) {}
  addEvent(): void {
    throw new Error("Method not implemented.");
  }
  removeEvent(): void {
    throw new Error("Method not implemented.");
  }
}
