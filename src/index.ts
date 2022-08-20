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

// Generic Classes

class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) {}
}

let pair = new KeyValuePair<number, string>(2, "sina");
// let pair = new KeyValuePair(2,"sina") same with above code

let pair2 = new KeyValuePair("sina", "erfanian");

// Generic Function

function wrapInArray<T>(value: T) {
  return [value];
}

let numbers = wrapInArray(1); // number[]
let strings = wrapInArray("sina"); // string[]

// Generic Interfaces

interface Result<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: null };
}

interface User {
  username: string;
}

interface Product {
  title: string;
}

let result = fetch<User>("url");
let result2 = fetch<Product>("url");

// Generic Constraints

function echo<T extends number | string>(value: T): T {
  return value;
}

// echo(true) error (just string or number)
echo(1);
echo("sina");

interface Person2 {
  name: string;
}

function echo2<T extends Person2>(value: T): T {
  return value;
}

echo2({ name: "ali" });
// echo2({name : "sina"})

class Person3 {
  constructor(public name: string) {}
}
function echo3<T extends Person3>(value: T): T {
  return value;
}

echo3(new Person3("sina"));

// Extending Generic Classes

interface Product {
  name: string;
  price: number;
}

class Store<T> {
  protected objects: T[] = [];
  add(obj: T): void {
    this.objects.push(obj);
  }
}

class CompressibleStore<T> extends Store<T> {
  compress() {}
}
let store = new CompressibleStore<Product>();

class SearchableStore<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    return this.objects.find((obj) => obj.name === name);
  }
}

class ProductStore extends Store<Product> {
  filterByCategory(category: string): Product[] {
    return [];
  }
}

// keyof operator

interface Products {
  name: string;
  price: number;
}

class Store2<T> {
  protected objects: T[] = [];
  add(obj: T): void {
    this.objects.push(obj);
  }

  // T is Products
  // keyof T => "name" | "price"
  find(property: keyof T, value: unknown): T | undefined {
    return this.objects.find((obj) => obj[property] === value);
  }
}

let store2 = new Store2<Products>();
store2.add({ name: "sina", price: 1 });
store2.find("name", "sina");
// store2.find("nonExistingProperty",1) Error (not available in keyof T)

// Type Mapping

interface Pd {
  name: string;
  price: number;
}

// T is Pd
// in the below code K is the each key of Pd interface
// iterate => first time name : string
// second time price : number
// actually we add readonly to each property
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

let product1: ReadOnly<Pd> = {
  name: "a",
  price: 10,
};

// product1.name = "b" Error (readonly)
// https://www.typescriptlang.org/docs/handbook/utility-types.html

// Class Decorators

// https://dev.to/danywalls/decorators-in-typescript-with-example-part-1-m0f

function Component(constructor: Function) {
  console.log("Component Decorator Called");
  constructor.prototype.uniqueId = Date.now();
  constructor.prototype.insertInDom = () => {
    console.log("Inserting in DOM");
  };
}
@Component
class ProfileComponent {}

// Parameterized Decorators and Decorator composition

type ComponentOptions = {
  selector: string;
};

function Component2(options: ComponentOptions) {
  return (constructor: Function) => {
    constructor.prototype.options = options;
  };
}

function Pipe(constructor: Function) {
  console.log("Pipe Decorator Called");
  constructor.prototype.pipe = true;
}

// first pipe run then component2
@Component2({ selector: "#value" })
@Pipe
class ProfileComponent2 {}

// Method Decorators

function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  // we can completely replace method to a new method
  // https://medium.com/jspoint/a-quick-introduction-to-the-property-descriptor-of-the-javascript-objects-5093c37d079
  const original = descriptor.value as Function;
  descriptor.value = function (...args: any) {
    console.log("Before");
    // in the call method the second one is the argument(s) we want to pass to the target function
    original.call(this, ...args);
    console.log("After");
  };
}

class NewPerson {
  @Log
  say(message: string) {
    console.log("Person Says " + message);
  }
}

let newPerson = new NewPerson();

// Accessor Decorators

function Capitalize(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.get;
  descriptor.get = function () {
    const result = original?.call(this);
    return typeof result === "string" ? result.toUpperCase() : result;
  };
}

class Prs {
  constructor(public firstName: string, public lastName: string) {}

  @Capitalize
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const prs = new Prs("sina", "erfanian");
console.log(prs.fullName);

// Property Decorators

function MinLength(length: number) {
  return (target: any, propertyName: string) => {
    let value: string;

    const descriptor: PropertyDescriptor = {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length < length)
          throw new Error(`${propertyName} should be at least ${length}`);
        value = newValue;
      },
    };
    Object.defineProperty(target, propertyName, descriptor);
  };
}

class MyUser {
  @MinLength(4)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}

let myUser = new MyUser("1234");

console.log(myUser.password);

// Parameter Decorators

type WatchedParameter = {
  methodName: string;
  parameterIndex: number;
};

const watchedParameter: WatchedParameter[] = [];

function Watch(target: any, methodName: string, parameterIndex: number) {
  watchedParameter.push({
    methodName,
    parameterIndex,
  });
}

class Vehicle {
  move(@Watch speed: number) {}
}

console.log(watchedParameter);
