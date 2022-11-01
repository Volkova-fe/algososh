import React, {FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Stack} from "./utils";
import {delay} from "../../utils";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [stackArray, setStackArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);


  const onChange = (e:FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value.trim();
    setInputValue(string);
  }

  const push = async (item: string) => {
    stack.push(item);
    setStackArray(stack.printStack());
    setInputValue('');
    await delay(500);
    setCurrentIndex(currentIndex + 1);
  }

  const pop = async () => {
    setCurrentIndex(stack.getSize() - 1);
    await delay(500);
    stack.pop();
    setStackArray([...stack.printStack()]);
  }

  const peak = () => {
    return stack.peak();
  }

  const clear = () => {
    stack.clear();
    setStackArray(stack.printStack());
    setCurrentIndex( 0);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <div className={style.input_group}>
          <Input
              onChange={onChange}
              isLimitText={true}
              maxLength={4}
              value={inputValue}
              extraClass="mr-6"
          />
          <Button
              isLoader={isLoader}
              text="Добавить"
              onClick={() => push(inputValue)}
              disabled={!inputValue}
              extraClass="mr-6"
          />
          <Button
              text="Удалить"
              onClick={() => pop()}
              disabled={stackArray.length < 1}
          />
      </div>
        <Button
            text="Очистить"
            onClick={() => clear()}
            disabled={stackArray.length < 1}
        />
      </form>
      <ul className={style.list}>
        {stackArray.map((item, index:number) => {
          return  (
              <Circle
                  key={index}
                  letter={item}
                  index={index }
                  head={peak() === index ? "top" : ''}
                  state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
              />)
        })}
      </ul>
    </SolutionLayout>
  );
};
