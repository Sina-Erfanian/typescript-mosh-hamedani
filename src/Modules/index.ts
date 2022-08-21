// import Square from "./Square";
// import { Circle } from "./Circle";

// import * as Shape from "./Shape"  => Wildcard Imports

// let circle = new Circle("22");

import { Circle, Square } from "./Shpaes";

import { tax } from "./tax";

let calculateTax = tax(1); // by using JSDoc we have type checking

import { greet } from "./greet";

greet("sina"); // just accept string because we declare the type of the parameter and the return value of function in greet.d.ts


