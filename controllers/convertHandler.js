function numberStringSplitter(input){
  let num = input.match(/[.\d\/]+/g) || ["1"];
  let str = input.match(/[a-zA-Z]+/g)[0].toLowerCase();
  return [num[0], str]
}

function checkDiv(possibleFraction){
 let nums = possibleFraction.split("/");
 if(nums.length > 2 ) {
  return false;
 }
 return nums;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0]
    let num = checkDiv(result) 
    if(!num) {
      return undefined;
    }
    let num1 = num[0];
    let num2 = num[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if(isNaN(num1) || isNaN(num2)) {
      result = undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1]
    switch(result){
      case 'l':
        return 'L';
      case 'gal':
        return 'gal';
      case 'lbs':
        return 'lbs';
      case 'kg':
        return 'kg';
      case 'km':
        return 'km';
      case 'mi':
        return 'mi';
      default:
        return undefined
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
      case 'L':
        return 'gal';
      case 'gal':
        return 'L';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      case 'km':
        return 'mi';
      case 'mi':
        return 'km';
    }
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch(unit){
      case 'L':
        result = 'liters';
      break;
      case 'gal':
        result = 'gallons';
      break;
      case 'lbs':
        result = 'pounds';
      break;
      case 'kg':
        result = 'kilograms';
      break;
      case 'km':
        result = 'kilometers';
      break;
      case 'mi':
        result = 'miles';
      break;
      default:
        result = 'invalid unit'
      break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit) {
      case 'gal':
        result = (initNum * galToL).toFixed(5) - 0;
      break;
      case 'lbs':
        result = (initNum * lbsToKg).toFixed(5) - 0;
      break;
      case 'mi':
        result = (initNum * miToKm).toFixed(5) - 0;
      break;
      case 'L':
        result = (initNum / galToL).toFixed(5) - 0;
      break;
      case 'kg':
        result = (initNum / lbsToKg).toFixed(5) - 0;
      break;
      case 'km':
        result = (initNum / miToKm).toFixed(5) - 0;
      break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const spellOutInitUnit = this.spellOutUnit(initUnit)
    const spellOutReturnUnit = this.spellOutUnit(returnUnit)
    result = `${initNum} ${spellOutInitUnit} converts to ${returnNum} ${spellOutReturnUnit}`
    return result;
  };
  
}

module.exports = ConvertHandler;
