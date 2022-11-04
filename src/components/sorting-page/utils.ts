import { IRandomArr } from "../../types/sorting-page";

export const MINLEN: number = 3;
export const MAXLEN: number = 17;
export const desc: string = 'Direction.Descending';
export const asc: string = 'Direction.Ascending';
export const initial: string = 'default';
export const array: string = 'array';

export const randomIntFromInterval = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const swap = (arr: IRandomArr[], firstIndex: number, secondIndex: number): void => {
	const temp = arr[firstIndex];
	arr[firstIndex] = arr[secondIndex];
	arr[secondIndex] = temp;
};