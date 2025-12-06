const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname,'./input.txt'),'utf8');

function password_check_abc(/** @type {string} */ password) {
    for (let i=0;i<password.length-2;i++) {
        const a = password.charCodeAt(i);
        const b = password.charCodeAt(i+1);
        const c = password.charCodeAt(i+2);
        if (b-a == 1 && c-b == 1) {
            return true;
        }
    }
    return false;
}

function password_check_iol(/** @type {string} */ password) {
    return !/[iol]/.test(password);
}

function password_check_double_letters(/** @type {string} */ password) {
    let doubles = [];
    for (let i=0;i<password.length-1;i++) {
        if (password[i] == password[i+1] && !doubles.includes(i-1)) {
            doubles.push(i);
        }
    }
    return doubles.length > 1;
}

function password_cycle(/** @type {string} */ password) {
    let newpass = [...password];
    let valid = false;
    while (valid == false) {
        newpass = [...password];
        for (let i=password.length-1;i>=0;i--) {
            if (password[i] == 'z') {
                newpass[i] = 'a';
            } else {
                newpass[i] = String.fromCharCode(password.charCodeAt(i) + 1);
                break;
            }
        }
        newpass = newpass.join('');
        //console.log(newpass);
        valid = password_check_abc(newpass) && password_check_double_letters(newpass) && password_check_iol(newpass);
        password = newpass;
    }
    return newpass;
}

module.exports.part_1 = ()=>{
    console.log(password_cycle(input));
}

module.exports.part_2 = ()=>{
    console.log(password_cycle(password_cycle(input)));

}