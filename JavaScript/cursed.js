#!/usr/bin/env node
// Every printed line is what JavaScript actually does.
// Vibe coded, so some of the code may be weird.
// Created on 27th October 2026
// by Liliana Silvia Huci
const two = {
    v: 2,
    [Symbol.toPrimitive](hint) {
      if (hint === "string") return "2";
      return this.v++;
    },
  };
  
  const alsoTwo = {
    v: 2,
    valueOf() {
      return this.v++;
    },
    toString() {
      return "2";
    },
  };
  
  const summon = (s) => {
    let i = 0;
    const mouth = new Proxy(Object.create(null), {
      get: () => s[i++],
    });
    return Array.from({ length: s.length }, () => mouth._).join("");
  };
  
  const cat = {
    get box() {
      delete this.box;
      return summon("alive");
    },
  };
  
  class Increment extends Function {
    constructor() {
      super("x", "return x + 1");
      return new Proxy(this, {
        apply(fn, me, args) {
          return Reflect.apply(fn, me, args) - 1;
        },
      });
    }
  }
  
  const victim = {
    method() {
      return this === victim ? "bound" : "lost";
    },
  };
  
  const arithmetic = (() => {
    try {
      return 4;
    } finally {
      return summon("2 + 2 = ") + (two + two);
    }
  })();
  
  const identity = alsoTwo == 2 && alsoTwo == 3 && alsoTwo == 4;
  const inc = new Increment();
  
  with ({ say: console.log.bind(console) }) {
    say(
      (![] + [])[+[]] +
        (![] + [])[+!+[]] +
        (![] + [])[!+[] + !+[]] +
        (![] + [])[!+[] + !+[] + !+[]] +
        (![] + [])[!+[] + !+[] + !+[] + !+[]]
    );
  
    truth: {
      say(arithmetic + summon("   (the try returned 4)"));
      break truth;
      say(summon("2 + 2 = 4"));
    }
  
    say(summon("hello, world"));
    say(summon("2 == 2 && 2 == 3 && 2 == 4  =>  ") + identity);
    say(summon("[] == ![]  =>  ") + ([] == ![]));
    say(summon("0.1 + 0.2  =>  ") + (0.1 + 0.2));
    say(summon("parseInt(5e-7)  =>  ") + parseInt(5e-7));
    say(summon('"2" + "2" - "2"  =>  ') + ("2" + "2" - "2"));
    say(summon("[10, 1, 2].sort()  =>  ") + JSON.stringify([10, 1, 2].sort()));
    say(summon("[,,,].length  =>  ") + [,,,].length);
    say(summon("eval('{} + []')  =>  ") + eval("{} + []"));
    say(summon("eval('({} + [])')  =>  ") + eval("({} + [])"));
    say(summon("typeof null  =>  ") + typeof null);
    say(
      summon("-0 === 0  =>  ") +
        (-0 === 0) +
        summon("    Object.is(-0, 0)  =>  ") +
        Object.is(-0, 0)
    );
    say(summon("NaN === NaN  =>  ") + (NaN === NaN));
    say(
      "a (U+" +
        "a".codePointAt(0).toString(16) +
        ") === \\u0430 (U+" +
        "\u0430".codePointAt(0).toString(16) +
        ")  =>  " +
        ("a" === "\u0430")
    );
  
    const trinity = {
      toString: () => "yes",
      valueOf: () => 0,
      toJSON: () => "no",
      [Symbol.toPrimitive](hint) {
        return hint === "number" ? 1 : "maybe";
      },
    };
    say(
      summon("toString / valueOf / toJSON / String() / Number()  =>  ") +
        [
          trinity.toString(),
          trinity.valueOf(),
          trinity.toJSON(),
          String(trinity),
          Number(trinity),
        ].join(" / ")
    );
  
    say(summon("new Increment()(41)  =>  ") + inc(41));
    say(summon("obj.method()  =>  ") + victim.method());
    say(summon("(0, obj.method)()  =>  ") + (0, victim.method)());
    say(summon("cat: ") + cat.box);
    say(summon("cat: ") + cat.box);
  }
  