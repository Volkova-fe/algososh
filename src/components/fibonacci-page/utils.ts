export const MINVALUE: number = 1;
export const MAXVALUE: number = 19;
export const MAXLEN: number = 2;

export function getFibonacciNumbers(count: number) {
	const fibonacciNumbers = [1, 1];
	for (let i = 2; i <= count; i++) {
		const a = fibonacciNumbers[i - 1];
		const b = fibonacciNumbers[i - 2];
		fibonacciNumbers.push(a + b);
	}
	return fibonacciNumbers;
}