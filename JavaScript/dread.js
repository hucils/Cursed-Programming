#!/usr/bin/env node
// dread.js: enterprise-grade FizzBuzz plus a self-verifying test suite.
// Run with: node dread.js
//
// Do NOT add "use strict". Sloppy mode holds this whole thing up: `with`,
// `arguments` aliasing and shadowing `undefined` only work without it.

// Created on 27th October 2026
// by Liliana Silvia Huci
// Vibe coded, so some of the code may be weird.

// ═══════════════════════════════════════════════════════════════════════
// 0. GLOBAL "DEPENDENCIES"
// ═══════════════════════════════════════════════════════════════════════

// THE JOKE: defineProperty can put a *getter* on the global object, so a
// bare identifier like `random` silently runs a function on every read.
// The comment is the xkcd #221 random number generator.
Object.defineProperty(globalThis, 'random', {
  get: () => 4, // chosen by fair dice roll. guaranteed to be random.
});

// THE JOKE: you can monkey-patch built-in prototypes, Symbol.iterator
// included. After this, every number can be iterated: [...3] is [0, 1, 2]
// and `for (const i of 10)` just works. Python's range(), sort of, now
// living inside every number in your program.
Number.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i < this; i++) yield i;
};

// ═══════════════════════════════════════════════════════════════════════
// 1. CONSTANTS (with invisible names)
// ═══════════════════════════════════════════════════════════════════════

// THE JOKE: these variable names are NOT empty. The first is U+3164
// HANGUL FILLER and the second is U+FFA0 HALFWIDTH HANGUL FILLER. Unicode
// classes both as "letters", so JS accepts them as identifiers, but they
// render as blank space. Security researchers have hidden backdoors this way.
//
// The values are numbers written in base 36, where the "digits" run 0-9
// and then a-z. 724463 in base 36 is "fizz" and 553391 is "buzz". The
// double dot is needed because `724463.toString` reads as a decimal
// point; `724463..toString` is "724463." followed by `.toString`.
const ㅤ = 724463..toString(36);
const ﾠ = 553391..toString(36);

// THE JOKE: these are three DIFFERENT variables that all look like `total`:
//   1. plain ASCII
//   2. the "о" is CYRILLIC SMALL LETTER O (U+043E)
//   3. ends with an invisible ZERO WIDTH JOINER (U+200D), which JS allows
//      in the middle or at the end of an identifier
// Good luck finding the right one with Ctrl+F.
const total = 'the real total';
const tоtal = 'a cyrillic impostor';
const total‍ = 'a zero-width stowaway';

// ═══════════════════════════════════════════════════════════════════════
// 2. CONFIGURATION, loaded from a comment
// ═══════════════════════════════════════════════════════════════════════

// THE JOKE: Function.prototype.toString() returns a function's exact
// source text, comments included. Before template literals existed, people
// really did write multi-line strings like this: put the text in a
// comment inside a function and slice it out at runtime. Here the config
// file is a comment.
function config() {/*
  { "upTo": 16 }
*/}
const src = String(config);
const { upTo } = JSON.parse(src.slice(src.indexOf('/*') + 2, src.lastIndexOf('*/')));

// ═══════════════════════════════════════════════════════════════════════
// 3. THE ALGORITHM
// ═══════════════════════════════════════════════════════════════════════

var out = [];

// THE JOKES, in order:
//  - `for (var n of upTo)` loops over a NUMBER (thanks, section 0).
//  - FIZZBUZZ: is a label. JS has labels and labelled `continue`, which is
//    the closest thing it has to `goto`.
//  - `switch (true)` turns switch into an if/else chain: whichever case
//    expression comes out `true` matches first.
//  - `!(n % 15)` means "n is divisible by 15", because 0 is falsy.
//  - ㅤ + ﾠ is "fizz" + "buzz", using the invisible variables above.
FIZZBUZZ: for (var n of upTo) {
  if (!n) continue FIZZBUZZ; // 0 is skipped. Zero isn't a number, it's a vibe.
  switch (true) {
    case !(n % 15): out.push(ㅤ + ﾠ); continue FIZZBUZZ;
    case !(n % 3):  out.push(ㅤ);     continue FIZZBUZZ;
    case !(n % 5):  out.push(ﾠ);      continue FIZZBUZZ;
    default:        out.push(n);
  }
}
console.log(out.join(' '));
console.log();

// ═══════════════════════════════════════════════════════════════════════
// 4. THE TEST SUITE. Every assertion here passes. That's the problem.
// ═══════════════════════════════════════════════════════════════════════

const assert = (cond, msg) => console.log(`${cond ? '✓' : '✗'} ${msg}`);

// ── 4a. Global getter ────────────────────────────────────────────────
assert(random === 4 && random === 4, 'random is random (twice in a row!)');

// ── 4b. Iterable numbers ─────────────────────────────────────────────
assert(JSON.stringify([...5]) === '[0,1,2,3,4]', '[...5] spreads a number into an array');

// ── 4c. The three totals ─────────────────────────────────────────────
assert(total !== tоtal && tоtal !== total‍ && total !== total‍,
  `total, tоtal and total‍ are three different variables: "${total}", "${tоtal}", "${total‍}"`);

// ── 4d. A lying instanceof ───────────────────────────────────────────
// THE JOKE: `x instanceof C` actually calls C[Symbol.hasInstance](x),
// and you can override that. So instanceof can mean anything at all,
// including "is this number even?". 4 has never been an object, never
// mind an instance of a class.
class Even { static [Symbol.hasInstance](n) { return n % 2 === 0; } }
assert(4 instanceof Even && !(3 instanceof Even), '4 instanceof Even (3 is not)');

// ── 4e. The arguments object is haunted ──────────────────────────────
// THE JOKE: in sloppy mode, with simple parameters, `arguments[0]` and
// the parameter `x` are the SAME storage slot. Writing to one changes
// the other. So this function ignores the 1 you passed in.
function add(x, y) { arguments[0] = 40; return x + y; }
assert(add(1, 2) === 42, 'add(1, 2) === 42');

// ── 4f. undefined is defined ─────────────────────────────────────────
// THE JOKE: `undefined` is not a keyword. It's an ordinary global
// variable. You can't reassign the global one any more, but nothing stops
// you naming a PARAMETER `undefined` and passing it whatever you like.
(function (undefined) {
  assert(undefined === 'defined', `undefined === "${undefined}"`);
})('defined');

// ── 4g. Automatic Semicolon Insertion ────────────────────────────────
// THE JOKE: JS inserts a semicolon after a bare `return` that ends a
// line. This function is really `return; 'the truth';` so it returns
// undefined, and the string underneath is dead code.
function honest() {
  return
    'the truth';
}
assert(honest() === undefined, 'honest() returns undefined, not "the truth"');

// ── 4h. A function that replaces itself ──────────────────────────────
// THE JOKE: a function declaration is just a variable, so the function can
// reassign its own name while it runs. Every call after the first runs
// different code. Real libraries do this ("lazy function definition")
// to skip setup work, so you can't even call it wrong.
function greet() {
  greet = () => 'you again?';
  return 'hello, first-time caller!';
}
assert(greet() === 'hello, first-time caller!' && greet() === 'you again?',
  'greet() returns something different the second time');

// ── 4i. Date math ────────────────────────────────────────────────────
// THE JOKE (two of them): months count from 0, so 1 means FEBRUARY.
// And when a date overflows, it quietly rolls forward instead of failing,
// so "February 31st" becomes March 3rd (2026 is not a leap year).
const feb31 = new Date(2026, 1, 31);
assert(feb31.getMonth() === 2 && feb31.getDate() === 3, 'February 31st, 2026 is March 3rd');

// ── 4j. The universal "yes" ──────────────────────────────────────────
// THE JOKE: a Proxy wrapping a function can intercept property reads
// (get), calls (apply) and `new` (construct). This one hands back ITSELF
// for every one of them, so you can chain anything forever and it never
// throws. When converted to a string (Symbol.toPrimitive) it says "yes".
// It's the null-safety you get when nothing is ever null.
const yes = new Proxy(function () {}, {
  get: (_, key) => (key === Symbol.toPrimitive ? () => 'yes' : yes),
  apply: () => yes,
  construct: () => yes,
});
assert(`${yes.does.this.actually.work()()().in(new yes.production.env)}` === 'yes',
  'yes.does.this.actually.work()()().in(new yes.production.env) is "yes"');

// ── 4k. Undeclared variables are just strings ────────────────────────
// THE JOKE: `with (obj) { foo }` first asks obj whether it "has" foo
// (`foo in obj`). This Proxy says "yes" to any lowercase word that isn't
// a real global, and its `get` returns the word's own name. Inside the
// block, every undeclared identifier becomes the string of its own name,
// so no ReferenceError ever happens. You no longer need quotes.
// (Symbol.unscopables is the hook `with` checks for names to skip; we
// return undefined so nothing is skipped.)
//
// BONUS JOKE: the result variable MUST have a capital letter in its name.
// When it was called `sentence`, the Proxy claimed that name too, so the
// assignment went into the Proxy and the real variable stayed undefined.
var aSentence;
with (new Proxy({}, {
  has: (_, k) => typeof k === 'string' && /^[a-z]+$/.test(k) && !(k in globalThis),
  get: (_, k) => (k === Symbol.unscopables ? undefined : k),
})) {
  aSentence = [who, needs, quotes, anyway].join(' ');
}
assert(aSentence === 'who needs quotes anyway', `[who, needs, quotes, anyway] is "${aSentence}"`);

// ── 4l. Every object is a Promise ────────────────────────────────────
// THE JOKE: `await x` checks whether x has a `.then` method. If it does,
// x counts as a "thenable" and await calls that method. Put `then` on
// Object.prototype and suddenly EVERY object is a Promise. Awaiting a
// plain empty object `{}` then produces a string.
//
// Leave this patch in place and every `await someObject` in the program
// hangs or misbehaves, so it deletes itself the first time it runs.
// Very responsible.
Object.prototype.then = function (resolve) {
  delete Object.prototype.then;
  resolve('a string, from awaiting {}');
};
(async () => {
  const result = await {};
  assert(result === 'a string, from awaiting {}', `await {} gave back "${result}"`);
  // This line runs whether or not any test passed. Like real CI, honestly.
  console.log('\nAll tests passed. Ship it.');
})();
