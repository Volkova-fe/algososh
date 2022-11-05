import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacciNumbers, MAXLEN, MAXVALUE, MINVALUE } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | string>('');
  const [fibArray, setFibArray] = useState<Array<number>>([])

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const number = e.currentTarget.value.trim();
    setInputValue(number);
  }

  const onClickForm = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setFibArray(getFibonacciNumbers(Number(inputValue)));
    setInputValue('');
  }

  const inputLimit = MINVALUE <= inputValue && inputValue <= MAXVALUE ? false : true;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onClickForm}>
        <Input
          type="number"
          onChange={onChange}
          isLimitText={true}
          maxLength={MAXLEN}
          max={MAXVALUE}
          value={inputValue}
          extraClass="mr-6"
        />
        <Button
          isLoader={isLoader}
          text="Рассчитать"
          onClick={onClickForm}
          disabled={inputLimit}
        />
      </form>
      <ul className={style.list}>
        {fibArray.map((elem: number, index: number) => {
          return (
            <Circle
              key={index}
              letter={`${elem}`}
              index={index}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
