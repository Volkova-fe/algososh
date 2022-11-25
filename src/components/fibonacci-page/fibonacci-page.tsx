import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacciNumbers, MAXLEN, MAXVALUE, MINVALUE } from "./utils";
import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | string>('');
  const [fibArray, setFibArray] = useState<Array<number>>()

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const number = e.currentTarget.value.trim();
    setInputValue(number);
  }

  const getFibArray = async (inputValue: number) => {
    setIsLoader(true);
    const array = getFibonacciNumbers(inputValue);
    for (let i = 0; i <= array.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setFibArray(array.slice(0, i + 1))
    }
    setIsLoader(false);
  }

  const onClickForm = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    getFibArray(Number(inputValue))
    setInputValue('');
  }

  const inputLimit = MINVALUE <= inputValue && inputValue <= MAXVALUE ? false : true;

  const justifyStyle = fibArray && fibArray.length < 10 ?
    { justifyContent: 'center' } : { justifyContent: 'flex-start' };


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onClickForm} data-cy="form">
        <Input
          data-cy="input"
          type="number"
          onChange={onChange}
          isLimitText={true}
          maxLength={MAXLEN}
          max={MAXVALUE}
          disabled={isLoader}
          value={inputValue}
          extraClass="mr-6"
        />
        <Button
          data-cy="submit"
          isLoader={isLoader}
          text="Рассчитать"
          onClick={onClickForm}
          disabled={inputLimit}
        />
      </form>
      <ul className={style.list} style={justifyStyle}>
        {fibArray && fibArray.map((elem: number, index: number) => {
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
