const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function is_nice_vowel_check(string='') {
    let total = 0;
    for (const char of 'aeiou') {
        for (const c of string) {
            if (c == char) total += 1;
        }
    }
    return total >= 3;
}

function is_nice_repetition_check(string='') {
    for (let i=0;i<string.length-1;i++) {
        if (string[i] == string[i+1]) return true;
    }
    return false;
}

function is_nice_substring_check(string='') {
    const substrings = ['ab','cd','pq','xy'];
    for (const sub of substrings) {
        if (string.includes(sub)) return false;
    }
    return true;
}

module.exports.part_1 = ()=>{
    const strings = input.split('\n');
    let nice_strings = 0;
    for (string of strings) {
        if (is_nice_vowel_check(string) && is_nice_repetition_check(string) && is_nice_substring_check(string)) {
            nice_strings += 1;
        }
    }
    console.log(`${nice_strings} strings are nice`)
}


function is_nice_pair_check(string='') {
    const pair_check = /([a-z][a-z])[a-z]*\1/.test(string); //string.match(/([a-z][a-z])[a-z]*\1/);
    return pair_check;
}

function is_nice_split_check(string='') {
    const split_check = /([a-z])[a-z]\1/.test(string);
    return split_check;
}

module.exports.part_2 = ()=>{
    const strings = input.split('\n');
    let nice_strings = 0;
    for (string of strings) {
        if (is_nice_pair_check(string) && is_nice_split_check(string)) {
            nice_strings += 1;
        }
    }
    console.log(`${nice_strings} strings are nice`)
}