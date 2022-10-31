import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils";

const fib = (n: number, memo: Record<number, number> = {}): number => {
  if (n in memo) {
    return memo[n];
  }
  if (n <= 2) {
    return 1;
  }
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
};

export const FibonacciPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | string>('');
  const [fibArray, setFibArray] = useState<Array<number>>([])

  const onChange = (e:FormEvent<HTMLInputElement>): void => {
    const number = e.currentTarget.value.trim();
    setInputValue(number);
  }

  const getFibArray = async () => {
    setIsLoader(true);
    const arrayOfFib = [];
    for(let i = 1; i <= Number(inputValue) + 1; i++) {
      await delay(500);
      arrayOfFib.push(fib(i));
      setFibArray([...arrayOfFib]);
    }
    setIsLoader(false);
  }

  const onClickForm = (e:FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    getFibArray();
    setInputValue('');
  }

  const inputLimit = 1 <= inputValue && inputValue <= 19 ? false : true;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onClickForm}>
        <Input
            type="number"
            onChange={onChange}
            isLimitText={true}
            maxLength={2}
            max={19}
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
        {fibArray.map((elem:number, index:number) => {
          return  (
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
