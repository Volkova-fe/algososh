import React, {FC, FormEvent, useState} from "react";
import style from './string.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay, stateCircle} from "../../utils";

const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex], arr[secondIndex - firstIndex]] = [arr[secondIndex - firstIndex], arr[firstIndex]];
};

export const StringComponent: FC = () => {
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [reversArray, setReversArray] = useState<Array<string>>([]);

    const onChange = (e:FormEvent<HTMLInputElement>): void => {
        const string = e.currentTarget.value.trim();
        setInputValue(string);
    }

    const reversString = async (string: string): Promise<string[]> => {
        const arrayOfLetters = string.split('');
        let end = arrayOfLetters.length;
        setCurrentIndex(0);
        setIsLoader(true);
        setReversArray([...arrayOfLetters]);
        await delay(1000);
        for (let i = 0; i < Math.floor(end / 2); i++ ) {
            swap(arrayOfLetters, i, end - 1);
            setCurrentIndex(i => i + 1);
            setReversArray([...arrayOfLetters]);
            await delay(1000);
        }
        setCurrentIndex(i => i + 1);
        setIsLoader(false);

        return arrayOfLetters;
    }

    const onClickRevers = (e:FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        reversString(inputValue);
        setInputValue('');
    }

  return (
    <SolutionLayout
        title="Строка"
    >
        <form className={style.form} onSubmit={onClickRevers}>
            <Input
                onChange={onChange}
                isLimitText={true}
                maxLength={11}
                value={inputValue}
                extraClass="mr-6"
            />
                <Button
                    isLoader={isLoader}
                    text="Развернуть"
                    onClick={onClickRevers}
                    disabled={!inputValue}
                 />
        </form>
        <ul className={style.list}>
            {reversArray.map((letter:string, index:number) => {
               return  (
                   <Circle
                       key={index}
                       letter={letter}
                       index={index + 1}
                       state={stateCircle(currentIndex, index, reversArray)}
                   />)
            })}
        </ul>
    </SolutionLayout>
  );
};
