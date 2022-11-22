import React, { FC, FormEvent, useState } from "react";
import style from './string.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils";
import { MAXLEN, reversString, stateCircle, swap } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [reversArray, setReversArray] = useState<Array<string>>([]);

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value.trim();
    setInputValue(string);
  }

  const onClickRevers = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    reversString(inputValue, setCurrentIndex, setIsLoader, setReversArray, delay);
    setInputValue('');
  }

  return (
    <SolutionLayout
      title="Строка"
    >
      <form className={style.form} onSubmit={onClickRevers}>
        <Input
          data-testid="input"
          onChange={onChange}
          isLimitText={true}
          maxLength={MAXLEN}
          value={inputValue}
          extraClass="mr-6"
        />
        <Button
          data-testid="button"
          isLoader={isLoader}
          text="Развернуть"
          onClick={onClickRevers}
          disabled={!inputValue}
        />
      </form>
      <ul className={style.list}>
        {reversArray.map((letter: string, index: number) => {
          return (
            <Circle
              data-testid="circle"
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
