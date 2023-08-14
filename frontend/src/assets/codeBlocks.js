const codeBlocksData = [
	{
		id: 1,
		title: "Reverse a String",
		instructions: "Write a function to reverse a given string.",
		code: `
        function reverseString(str) {
			
        }`,
		solution: `
        function reverseString(str) {
            return str.split('').reverse().join('');
        }`,
	},
	{
		id: 2,
		title: "Factorial",
		instructions:
			"Write a function to calculate the factorial of a positive integer.",
		code: `
        function factorial(n) {

        }`,
		solution: `
        function factorial(n) {
            if (n === 0 || n === 1) {
            return 1;
            }
            return n * factorial(n - 1);
        }`,
	},
	{
		id: 3,
		title: "Sum of Even Numbers",
		instructions:
			"Write a function to find the sum of all even numbers from 1 to a given positive integer.",
		code: `
        function sumOfEvenNumbers(n) {

        }`,
		solution: `
        function sumOfEvenNumbers(n) {
            let sum = 0;
            for (let i = 2; i <= n; i += 2) {
            sum += i;
            }
            return sum;
        }`,
	},
	{
		id: 4,
		title: "Palindrome Check",
		instructions:
			"Write a function to check if a given string is a palindrome.",
		code: `
        function isPalindrome(str) {

        }`,
		solution: `
        function isPalindrome(str) {
            const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
            const reversedStr = cleanedStr.split('').reverse().join('');
            return cleanedStr === reversedStr;
        }`,
	},
	{
		id: 5,
		title: "Fibonacci Sequence",
		instructions:
			"Write a function to generate the first n numbers of the Fibonacci sequence.",
		code: `
        function fibonacci(n) {

        }`,
		solution: `
        function fibonacci(n) {
            const sequence = [0, 1];
            for (let i = 2; i < n; i++) {
            sequence[i] = sequence[i - 1] + sequence[i - 2];
            }
            return sequence;
        }`,
	},
];

export default codeBlocksData;
