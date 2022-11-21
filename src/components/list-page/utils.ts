import { ElementStates } from "../../types/element-states";
import { IListArr } from "../../types/list-page";

export const MAXLEN: number = 1;
export const MAXINDEX: number = 9;

export const initialArr = ['0', '34', '8', '1'];
export const listArr: IListArr[] = initialArr.map((item) => ({
	value: item,
	state: ElementStates.Default,
	shiftElement: null
}))
