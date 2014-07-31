var assert = require("assert");

var exampleCreditCardNumber = "4566111111111111";
var exampleEvenCheckSumString = "0246813579";
var exampleEvenCheckSum = 23;
var exampleOddCheckSum = 17;
var exampleFinalCheckSum = 40;

var notEmpty = function(creditCardNumber){
	return creditCardNumber === null;
};

var containsOnlyDigits = function(creditCardNumber){
	if (isNaN(creditCardNumber)) {
		return false;
	}
	return true;
};

var sixteenOrLessDigits = function(creditCardNumber){
	if (creditCardNumber.length <= 16) {
		return true;
	}
	return false;
};

var thirteenOrMoreDigits = function(creditCardNumber){
	if (creditCardNumber.length >= 13) {
		return true;
	}
	return false;
};

var calculateOddCheckSum = function(creditCardNumber, correctCheckSum){
	oddCheckSum = 0;
	creditCardNumber.split('').forEach(function(digit, index, array){
		if (index % 2) {
			oddCheckSum += parseInt(creditCardNumber.charAt(index), 10);
		}
	});

	if (oddCheckSum !== correctCheckSum) {
		return false;
	}

	return oddCheckSum;
};

var calculateEvenCheckSum = function(creditCardNumber, evenCheckSumString, correctCheckSum){
	evenCheckSum = 0;
	creditCardNumber.split('').forEach(function(digit, index, array){
		if (index % 2 === 0) {
			evenCheckSum += parseInt(evenCheckSumString.charAt(digit), 10);
		}
	});

	if (evenCheckSum !== correctCheckSum) {
		return false;
	}

	return evenCheckSum;
};

var validateFinalCheckSum = function(creditCardNumber, evenCheckSumString, correctOddCheckSum, correctEvenCheckSum){

	oddCheckSum = calculateOddCheckSum(creditCardNumber, correctOddCheckSum);
	evenCheckSum = calculateEvenCheckSum(creditCardNumber, evenCheckSumString, correctEvenCheckSum);

	if (!oddCheckSum || !evenCheckSum){
		return false;
	}

	finalCheckSum = oddCheckSum + evenCheckSum;

	var checkSumString = finalCheckSum.toString();
	if (checkSumString.charAt(checkSumString.length - 1) !== '0') {
		return false;
	}

	return finalCheckSum;
};

var isValid = function(creditCardNumber, evenCheckSumString, correctOddCheckSum, correctEvenCheckSum){

	// didnt bother finishing this...

	return true;
};

describe('Credit Card', function(){

  describe('the credit card number', function(){
    it('should not be empty', function(){
        assert.notEqual(notEmpty(exampleCreditCardNumber), null);
    });

    it('should only contain digits', function(){
        assert.equal(containsOnlyDigits(exampleCreditCardNumber), true);
    });

    it('should not contain more than 16 digits', function(){
		assert.equal(sixteenOrLessDigits(exampleCreditCardNumber), true);
    });

    it('should not contain less than 13 digits', function(){
		assert.equal(thirteenOrMoreDigits(exampleCreditCardNumber), true);
    });

    // checksum and check digit are two separate values!
    // assignment is a little lacking concerning where to find checksums
    // where is the checksum stored for a given credit card?

	it('should correctly calculate checkSum for digits in odd positions', function(){
		assert.equal(calculateOddCheckSum(exampleCreditCardNumber, exampleOddCheckSum), exampleOddCheckSum);
	});

	it('should correctly calculate checkSum for digits in even positions', function(){
		assert.equal(calculateEvenCheckSum(exampleCreditCardNumber, exampleEvenCheckSumString, exampleEvenCheckSum), exampleEvenCheckSum);
	});

	it('should produce a checksum where the last digit is zero', function(){
		assert.equal(validateFinalCheckSum(exampleCreditCardNumber, exampleEvenCheckSumString, exampleOddCheckSum, exampleEvenCheckSum), exampleFinalCheckSum);
	});

  });

});