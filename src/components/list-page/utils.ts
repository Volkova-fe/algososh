import { ElementStates } from "../../types/element-states";
import { IListArr } from "../../types/list-page";

export const initialArr = ['0', '34', '8', '1'];
export const listArr: IListArr[] = []
for (let i = 0; i <= initialArr.length - 1; i++) {
	listArr.push({
		value: initialArr[i],
		state: ElementStates.Default,
		shiftElement: null
	});
}