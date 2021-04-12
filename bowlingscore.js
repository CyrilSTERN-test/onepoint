const controlPattern = new RegExp('^([0-9]{1}[0-9\/]{1})|([Xx]{1})$');
const patternSpare = new RegExp("^([0-9]\/{1})$");
const patternStrike = new RegExp("^[Xx]{1}$");
const patternNumber = new RegExp("^[0-9]{2}");
const NO_SCORE = new RegExp("\\-", 'gm');

function rawValueRolls(rolls){
    return rolls.map(roll => {
        if(patternSpare.test(roll) || patternStrike.test(roll)){
            return 10;
        }
        return parseInt(roll.charAt(0)) + parseInt(roll.charAt(1))
    });
}
function scoreCalculation(rolls) {
    let score = 0;
    let _rawValueRolls = rawValueRolls(rolls);
    for (let i = rolls.length - 1; 0 <= i ; i--) {
        score += patternStrike.test(rolls[i]) && i+2 <=rolls.length - 1 && i < 10 ? 10 + _rawValueRolls[i + 1]+ _rawValueRolls[i + 2]
            : patternSpare.test(rolls[i]) && i+1 <=rolls.length - 1 &&  i < 10 ? 10 + _rawValueRolls[i + 1]
                : patternNumber.test(rolls[i]) && i < 10 ? _rawValueRolls[i] : 0;
    }
    return score;
}

function inputScoreDecodeToRolls(score){
    return score.replace(NO_SCORE, 0).split(/ +/);
}

function controlListScoreRolls(rolls){
    if((rolls.length === 11  && !(patternStrike.test(rolls[9]) || patternSpare.test(rolls[9]))) || (rolls.length === 12  && !patternStrike.test(rolls[9]))){
        throw new Error("the input is incorrect should no be longer thant 10 roll without spare or strike: " + rolls);
    }
    return rolls.map(roll => {
        if(!controlPattern.test(roll) || roll.length > 2 ||
            (patternNumber.test(roll) && parseInt(roll.charAt(0)) + parseInt(roll.charAt(1)) > 9)
        ){
            throw new Error("a roll is incorrect: " + roll);
        }
        return roll;
    });
}

console.log(scoreCalculation(controlListScoreRolls(inputScoreDecodeToRolls(process.argv[2]))));
