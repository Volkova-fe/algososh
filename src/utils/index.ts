import {ElementStates} from "../types/element-states";

export const swap = (arr: any[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const delay = (ms: number) => new Promise<void>(
    resolve => setTimeout(resolve, ms)
);

export const stateCircle = (index: number, currIndex: number, arr: Array<string | number>) => {
    let arrLength = arr.length - 1
    if(currIndex < index || currIndex > arrLength - index) {
        return ElementStates.Modified
    }
    if (currIndex === index || currIndex === arrLength - index) {
        return ElementStates.Changing
    }
    return ElementStates.Default
}