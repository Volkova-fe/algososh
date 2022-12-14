import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import style from "./sorting-page.module.css";
import { delay } from "../../utils";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { array, asc, desc, initial, MAXLEN, MINLEN, randomIntFromInterval, swap } from "./utils";
import { IRandomArr } from "../../types/sorting-page";


export const SortingPage: React.FC = () => {
    const [radioOption, setRadioOption] = useState<string>("selection-sort");
    const [isLoader, setIsLoader] = useState<string>(initial);
    const [randomArray, setRandomArray] = useState<IRandomArr[]>([]);

    const randomArr = (min: number, max: number, minLen = MINLEN, maxLen = MAXLEN): IRandomArr[] => {
        setIsLoader('array')
        const length: number = randomIntFromInterval(minLen, maxLen);
        const lotteryNumbers: IRandomArr[] = [];

        for (let i = 0; i <= length - 1; i++) {
            lotteryNumbers.push({
                num: randomIntFromInterval(min, max),
                state: ElementStates.Default
            });
        }
        return lotteryNumbers;
    }

    useEffect(() => {
        setRandomArray(randomArr(0, 100))
    }, []);

    const onClickNewArr = (): void => {
        setRandomArray(randomArr(0, 100));
    }

    const onChangeRadio = (e: ChangeEvent<HTMLInputElement>): void => {
        setRadioOption((e.target as HTMLInputElement).value);
    };


    const selectionSort = async (array: IRandomArr[], direction: boolean): Promise<IRandomArr[]> => {
        const { length } = array;
        for (let i = 0; i < length; i++) {
            let maxInd = i;
            array[maxInd].state = ElementStates.Changing;
            for (let j = i + 1; j < length; j++) {
                array[j].state = ElementStates.Changing;
                setRandomArray([...array]);
                await delay(DELAY_IN_MS);
                if (direction ? array[j].num < array[maxInd].num : array[j].num > array[maxInd].num) {
                    maxInd = j;
                    array[j].state = ElementStates.Changing;
                    array[maxInd].state = i === maxInd ? ElementStates.Changing : ElementStates.Default;
                }
                if (j !== maxInd) {
                    array[j].state = ElementStates.Default;
                }
                setRandomArray([...array]);
            }
            swap(array, maxInd, i);
            array[maxInd].state = ElementStates.Default;
            array[i].state = ElementStates.Modified;
            setRandomArray([...array]);
        }
        setIsLoader('default');
        return array;
    };

    const bubbleSort = async (array: IRandomArr[], direction: boolean): Promise<IRandomArr[]> => {
        const { length } = array;
        for (let i = 0; i < length; i++) {
            for (let compareIndex = 0; compareIndex < length - i - 1; compareIndex++) {
                const left = array[compareIndex].num;
                const right = array[compareIndex + 1].num;
                array[compareIndex].state = ElementStates.Changing;
                array[compareIndex + 1].state = ElementStates.Changing;
                setRandomArray([...array]);
                await delay(DELAY_IN_MS);
                if (direction ? left > right : left < right) {
                    array[compareIndex].num = right;
                    array[compareIndex + 1].num = left;
                }
                array[compareIndex].state = ElementStates.Default;
                if (array[compareIndex + 1]) {
                    array[compareIndex + 1].state = ElementStates.Default;
                }
                setRandomArray([...array]);
            }
            array[array.length - i - 1].state = ElementStates.Modified;
            setRandomArray([...array])
        }
        setIsLoader('default');
        return array;
    }


    const onClickSort = async (direction: string): Promise<void> => {
        setIsLoader(direction);
        const compare = direction === 'Direction.Ascending';
        if (radioOption === 'selection-sort') {
            setRandomArray([...await selectionSort(randomArray, compare)]);
        } else {
            setRandomArray([...await bubbleSort(randomArray, compare)]);
        }
    }

    return (
        <SolutionLayout title="???????????????????? ??????????????">
            <form className={style.form}>
                <div className={style.group}>
                    <RadioInput
                        disabled={isLoader === desc || isLoader === asc}
                        label="??????????"
                        name={"sorting-type"}
                        value={"selection-sort"}
                        defaultChecked
                        extraClass="mr-20"
                        onChange={onChangeRadio}
                    />
                    <RadioInput
                        disabled={isLoader === desc || isLoader === asc}
                        label="??????????????"
                        name={"sorting-type"}
                        value={"bubble-sort"}
                        onChange={onChangeRadio}
                    />
                </div>
                <div className={style.group}>
                    <Button
                        isLoader={isLoader === asc}
                        disabled={isLoader === desc}
                        text="???? ??????????????????????"
                        onClick={() => onClickSort(asc)}
                        sorting={Direction.Ascending}
                        extraClass="mr-6"
                    />
                    <Button
                        isLoader={isLoader === desc}
                        disabled={isLoader === asc}
                        text="???? ????????????????"
                        onClick={() => onClickSort(desc)}
                        sorting={Direction.Descending}
                        extraClass="mr-40"
                    />
                    <Button
                        disabled={isLoader !== array && isLoader !== initial}
                        text="?????????? ????????????"
                        onClick={onClickNewArr}
                    />
                </div>
            </form>
            <ul className={style.list}>
                {randomArray.map((element: IRandomArr, index: number, state: IRandomArr[]) => {
                    return (
                        <Column
                            key={index}
                            index={element.num}
                            state={element.state}
                        />)
                })}
            </ul>
        </SolutionLayout>
    );
};
