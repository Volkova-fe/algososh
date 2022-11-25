import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./class/stack-page";
import { delay } from "../../utils";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IStackOueueLoader } from "../../types/stack-queue-page";

const stack = new Stack<string>();
const MAXLEN = 4;
const MAXSIZE = 8;

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [stackArray, setStackArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoader, setIsLoader] = useState<IStackOueueLoader>({
    addValue: false,
    removeValue: false,
    clearValue: false,
    disabled: false,
  });


  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value.trim();
    setInputValue(string);
  }

  const push = async (item: string) => {
    setIsLoader({
      ...isLoader,
      addValue: true,
      disabled: true
    });
    stack.push(item);
    setStackArray(stack.printStack());
    setInputValue('');
    await delay(SHORT_DELAY_IN_MS);
    setCurrentIndex(currentIndex + 1);
    setIsLoader({
      ...isLoader,
      addValue: false,
      disabled: false
    });
  }

  const pop = async () => {
    setIsLoader({
      ...isLoader,
      removeValue: true,
      disabled: true
    });
    setCurrentIndex(stack.getSize() - 1);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArray([...stack.printStack()]);
    setIsLoader({
      ...isLoader,
      removeValue: false,
      disabled: false
    });
  }

  const peak = () => {
    return stack.peak();
  }

  const clear = () => {
    setIsLoader({
      ...isLoader,
      clearValue: true,
      disabled: true
    });
    stack.clear();
    setStackArray(stack.printStack());
    setCurrentIndex(0);
    setIsLoader({
      ...isLoader,
      clearValue: false,
      disabled: false
    });
  }

  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onSubmit={(e) => e.preventDefault()} data-cy="form">
        <div className={style.input_group}>
          <Input
            data-cy="input"
            disabled={isLoader.disabled || stackArray.length > MAXSIZE}
            onChange={onChange}
            isLimitText={true}
            maxLength={MAXLEN}
            value={inputValue}
            extraClass="mr-6"
          />
          <Button
            data-cy="add"
            isLoader={isLoader.addValue}
            text="Добавить"
            onClick={() => push(inputValue)}
            disabled={!inputValue || isLoader.disabled || stackArray.length > MAXSIZE}
            extraClass="mr-6"
          />
          <Button
            data-cy="remove"
            isLoader={isLoader.removeValue}
            text="Удалить"
            onClick={() => pop()}
            disabled={stackArray.length < 1 || isLoader.disabled}
          />
        </div>
        <Button
          data-cy="clear"
          isLoader={isLoader.clearValue}
          text="Очистить"
          onClick={() => clear()}
          disabled={stackArray.length < 1 || isLoader.disabled}
        />
      </form>
      <ul className={style.list}>
        {stackArray.map((item, index: number) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={peak() === index ? "top" : ''}
              state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
