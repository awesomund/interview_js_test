// This is an alternative credit card validation case, using the Luhn-formula:
//
// Implement each of the following steps as its own method (using TDD), and then refactor them into one final validator method:

// Some input validation requirements:
// a) The credit card should not be null
// b) The credit card number should only contain digits
// c) The credit card number should contain 13 or more digts
// d) The credit card number should contain 16 or less digts

// Luhn algorithm:
// 1. Drop the last digit from the number. The last digit is what we want to check against
// 2. Reverse the numbers
// 3. Multiply the digits in odd positions (1, 3, 5, etc.) by 2 and subtract 9 to any result higher than 9. Positions are not 0-indexed.
//    Alternative description: multiply all even positioned digits by 2 and subtract 9 if the result is greater than 9. Positions are 0-indexed.
// 4. Add all the numbers together
// 5. The check digit (the last number of the card) is the amount that you would need to add to get a multiple of 10 (Modulo 10)

var assert = require("assert");

var creditCardNumber = "4556705936228745";

// input validation methods

var isNotNull = function(creditCardNumber){
	return creditCardNumber !== null;
};

var containsOnlyDigits = function(creditCardNumber){
	return isNaN(creditCardNumber) === false;
};

var isCorrectLength = function(creditCardNumber){
	return creditCardNumber.length >= 13 && creditCardNumber.length <= 16;
};

var isInputValid = function(creditCardNumber){
	var valid = false;

	valid = isNotNull(creditCardNumber);
	valid = containsOnlyDigits(creditCardNumber);
	valid = isCorrectLength(creditCardNumber);

	return valid;
};

// Luhn methods
var getLastDigit = function(creditCardNumber){
	lastDigit = creditCardNumber.charAt(creditCardNumber.length-1);
	return parseInt(lastDigit, 10);
};

var removeLastDigit = function(creditCardNumber){
	return creditCardNumber.substring(0, creditCardNumber.length-1);
};

var reverseString = function(inputString){
	return inputString.split('').reverse().join('');
};

var processOddNumbers = function(creditCardNumber){
	stringArray = creditCardNumber.split('');
	stringArray.forEach(function(element, index, array){
		position = index + 1;
		if (position % 2) {
			element = element * 2;
			element = element > 9 ? element-9 : element;
		}
		array[index] = element;
	});
	return stringArray.join('');
};

var addAllDigits = function(creditCardNumber){
	sum = 0;
	creditCardNumber.split('').forEach(function(element){
		sum += parseInt(element, 10);
	});
	return sum;
};

var calculateCheckSum = function(creditCardNumber){
	sum = addAllDigits(creditCardNumber);
	checkSum = sum % 10;
	return checkSum;
};

var isCreditCardNumberValid = function(creditCardNumber){
	var valid = false;

	if (!isNotNull(creditCardNumber) || !containsOnlyDigits(creditCardNumber) || !isCorrectLength(creditCardNumber)) {
		return false;
	}

	lastDigit = getLastDigit(creditCardNumber);
	creditCardNumber = removeLastDigit(creditCardNumber);
	creditCardNumber = reverseString(creditCardNumber);
	creditCardNumber = processOddNumbers(creditCardNumber);

	checkSum = calculateCheckSum(creditCardNumber);

	if (checkSum === lastDigit) {
		valid = true;
	}

	return valid;
};

describe('Credit Card Validation', function(){

	describe('the credit card number', function(){
		it('should not be empty', function(){
			assert.equal(isNotNull(creditCardNumber), true);
		});

		it('should contain only digits', function(){
			assert.equal(containsOnlyDigits(creditCardNumber), true);
		});

		it('should contain 13 to 16 digits', function(){
			assert.equal(isCorrectLength(creditCardNumber), true);
		});
	});

	describe('the Luhn algorithm', function(){

		it('should drop the last digit of the credit card number', function(){
			testCreditCardNumber = "4485705063868244";
			assert.equal(removeLastDigit(testCreditCardNumber), "448570506386824");
		});

		it('should reverse the credit card number', function(){
			testCreditCardNumber = "4485705063868244";
			assert.equal(reverseString(testCreditCardNumber), "4428683605075844");
		});

		it('should multiply all digits in odd positions by 2 and subtract 9 to all results greater than 9', function(){
			testCreditCardNumber = "4485705063868244";
			processedCreditCardNumber = "8475501033767284";
			assert.equal(processOddNumbers(testCreditCardNumber), processedCreditCardNumber);
		});

		it('should add all the numbers together', function(){
			testCreditCardNumber = "4485705063868244";
			correctSum = 74;
			assert.equal(addAllDigits(testCreditCardNumber), 74);
		});

		it('should produce a checksum equal to the number that was removed earlier', function(){

			testCreditCardNumber = "4556705936228745";
			//need to put credit card number through all the steps to calculate correct checksum:
			testCreditCardNumber = removeLastDigit(testCreditCardNumber);
			testCreditCardNumber = reverseString(testCreditCardNumber);
			testCreditCardNumber = processOddNumbers(testCreditCardNumber);

			assert.equal(calculateCheckSum(testCreditCardNumber), 5);
		});

	});

	describe('the isCreditCardNumberValid() method', function(){

		it('should take a credit card number, put it through all the Luhn-steps and yield the correct result', function(){
			testCreditCardNumber = "4556705936228745";
			assert.equal(isCreditCardNumberValid(testCreditCardNumber), true);
		});
	});

});