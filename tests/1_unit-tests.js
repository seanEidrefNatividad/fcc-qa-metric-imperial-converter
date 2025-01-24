const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler.getNum(input)', function () {
    // #1
    test('Whole number input', function () {
      let input = '4gal'
      assert.equal(convertHandler.getNum(input), 4, "These numbers must be Equal.");
    });
    // #2
    test('Decimal number input', function () {
      let input = '45.50gal'
      assert.equal(convertHandler.getNum(input), 45.50, "These numbers must be Equal.");
    });
    // #3
    test('Fraction number input', function () {
      let input = '1/2gal'
      assert.equal(convertHandler.getNum(input), 1/2, "These numbers must be Equal.");
    });
    // #4
    test('invalid decimal number input', function () {
      let input = '4.0.0gal'
      assert.equal(convertHandler.getNum(input), undefined, "These numbers must be Equal.");
    });
    // #5
    test('invalid fraction number input', function () {
      let input = '4/3/10gal'
      assert.equal(convertHandler.getNum(input), undefined, "These numbers must be Equal.");
    });
    // #6
    test('No number input', function () {
      let input = 'gal'
      assert.equal(convertHandler.getNum(input), 1, "These numbers must be Equal.");
    });
  });

  suite('convertHandler.getUnit(input)', function () {
    // #1
    test('For each valid input units', function () {
      let inputs = ['4gal', '5l', '23L', '10km', '453mi', '25kg', '45lbs', 'GAL', 'KM', 'kilometers']
      let expected = ['gal', 'L', 'L', 'km', 'mi', 'kg', 'lbs', 'gal', 'km', undefined]
      inputs.forEach((input, i) => {
        assert.equal(convertHandler.getUnit(input), expected[i], "These must be Equal.");
      })
    });
     // #2
     test('Invalid input unit', function () {
      let input = 'Liters'
      assert.equal(convertHandler.getReturnUnit(input), undefined, "These must be Equal.");
    });
  });

  suite('convertHandler.getReturnUnit(input)', function () {
    // #1
    test('For each valid unit inputs', function () {
      let inputs = ['gal', 'L', 'km', 'mi', 'kg', 'lbs']
      let expected = ['L', 'gal', 'mi', 'km', 'lbs', 'kg']
      inputs.forEach((input, i) => {
        assert.equal(convertHandler.getReturnUnit(input), expected[i], "These must be Equal.");
      })
    });
  });

  suite('convertHandler.spellOutUnit(input)', function () {
    // #1
    test('For each valid unit inputs', function () {
      let inputs = ['gal', 'L', 'km', 'mi', 'kg', 'lbs']
      let expected = ['gallons', 'liters', 'kilometers', 'miles', 'kilograms', 'pounds']
      inputs.forEach((input, i) => {
        assert.equal(convertHandler.spellOutUnit(input), expected[i], "These must be Equal.");
      })
    });
  });

  suite('convertHandler.convert(num, unit)', function () {
    // #1
    test('Gallons to Liters', function () {
      let inputs = [4, 'gal']
      let expected = 15.14164
      assert.approximately(
        convertHandler.convert(inputs[0],inputs[1]), 
        expected, 
        0.1 // tolerance
      );
    });
    // #2
    test('Liters to Gallons', function () {
      let inputs = [4, 'L']
      let expected = 1.05669
      assert.approximately(
        convertHandler.convert(inputs[0],inputs[1]), 
        expected, 
        0.1 // tolerance
      );
    });
    // #3
    test('Kilometer to Miles', function () {
      let inputs = [4, 'km']
      let expected = 2.48549
      assert.approximately(
        convertHandler.convert(inputs[0],inputs[1]), 
        expected, 
        0.1 // tolerance
      );
    });
    // #4
    test('Miles to Kilometers', function () {
      let inputs = [4, 'mi']
      let expected = 6.43736
      assert.approximately(
        convertHandler.convert(inputs[0],inputs[1]), 
        expected, 
        0.1 // tolerance
      );
    });
    // #5
    test('Kilograms to Pounds', function () {
      let inputs = [4, 'kg']
      let expected = 8.8185
      assert.approximately(
        convertHandler.convert(inputs[0],inputs[1]), 
        expected, 
        0.1 // tolerance
      );
    });
    // #6
    test('Pounds to Kilograms', function () {
      let inputs = [4, 'lbs']
      let expected = 1.81437
      assert.approximately(
        convertHandler.convert(inputs[0],inputs[1]), 
        expected, 
        0.1 // tolerance
      );
    });
  });

  // I can create more test for other functions
});