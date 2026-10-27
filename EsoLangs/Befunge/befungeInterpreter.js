// Test of the Befunge interpreter. This going to be fun! Creation date: 15th October 2026.
// String.raw is the only part that is AI assisted.
// Created by Liliana Silvia Huci
const Befunge = require('befunge93');
let befunge = new Befunge();

// You are my saviour in the world of Befunge, String.raw
// and I will worship you to the JavaScript
// gods for the rest of my life.
let program = String.raw`9762230228>\#+:#*9-#\_$.@`;

befunge.run(program)
    .then((output) => {
        console.log(output);
        // I am calm. Calm as the wind.
    })
    .catch((err) => {
        console.error('Error running program:', err.message);
        //FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU---------------------------
    });

// I HATE THIS! WHO DECIDED THIS WAS A GOOD IDEA?!
let testInput = `9006055768>\#+:#*9-#\_$.@`;
// JavaScript is hell. Befunge is worse. Send help. I think I am going to die from EsoLang Syndrome.
// This was the worst idea I have ever had. I am going to die.