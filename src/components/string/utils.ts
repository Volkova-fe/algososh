import { Dispatch, SetStateAction } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states"

export const MAXLEN = 11;

export const stateCircle = (index: number, currIndex: number, arr: Array<string | number>) => {
	let arrLength = arr.length - 1
	if (currIndex < index || currIndex > arrLength - index) {
		return ElementStates.Modified
	}
	if (currIndex === index || currIndex === arrLength - index) {
		return ElementStates.Changing
	}
	return ElementStates.Default
}

export const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
	[arr[firstIndex], arr[secondIndex - firstIndex]] = [arr[secondIndex - firstIndex], arr[firstIndex]];
};

export const reversString = async (
	string: string,
	setCurrentIndex: Dispatch<SetStateAction<number>>,
	setIsLoader: Dispatch<SetStateAction<boolean>>,
	setReversArray: Dispatch<SetStateAction<string[]>>,
	delay: (ms: number) => Promise<void>
	): Promise<string[]> => {
	const arrayOfLetters = string.split('');
	let end = arrayOfLetters.length;

	setCurrentIndex(0);
	setIsLoader(true);
	setReversArray([...arrayOfLetters]);
	await delay(DELAY_IN_MS);

	for (let i = 0; i < Math.floor(end / 2); i++) {
		swap(arrayOfLetters, i, end - 1);
		setCurrentIndex(i => i + 1);
		setReversArray([...arrayOfLetters]);
		await delay(DELAY_IN_MS);
	}

	setCurrentIndex(i => i + 1);
	setIsLoader(false);

	return arrayOfLetters;
}