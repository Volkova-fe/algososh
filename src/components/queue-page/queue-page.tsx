import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "../stack-page/stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./class/queue-page";
import { delay } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IStackOueueLoader } from "../../types/stack-queue-page";

const SIZE: number = 7;
const MAXLEN: number = 4

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [queue] = useState(new Queue<string>(SIZE));
  const [queueArray, setQueueArray] = useState<(string | undefined)[]>(queue.printQueue());
  const [head, setHead] = useState<number>(queue.getHead());
  const [tail, setTail] = useState<number>(queue.getTail());
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

  const enqueue = async (item: string) => {
    setIsLoader({
      ...isLoader,
      addValue: true,
      disabled: true
    });
    queue.enqueue(item);
    setInputValue('')
    setQueueArray([...queue.printQueue()]);
    setTail(queue.getTail());
    setCurrentIndex(tail % queue.getSize());
    await delay(SHORT_DELAY_IN_MS);
    setCurrentIndex(-1);
    await delay(SHORT_DELAY_IN_MS);
    setIsLoader({
      ...isLoader,
      addValue: false,
      disabled: false
    });
  }

  const dequeue = async () => {
    setIsLoader({
      ...isLoader,
      removeValue: true,
      disabled: true
    });
    if (queue) {
      queue.dequeue();
      setQueueArray([...queue.printQueue()]);
      setCurrentIndex((head & queue.getSize()));
      await delay(SHORT_DELAY_IN_MS);
      setHead(queue.getHead());
      setCurrentIndex(-1);
      await delay(SHORT_DELAY_IN_MS);
    }
    setIsLoader({
      ...isLoader,
      removeValue: false,
      disabled: false
    });
  }

  const clear = () => {
    setIsLoader({
      ...isLoader,
      clearValue: true,
      disabled: true
    });
    queue.clear();
    setQueueArray(queue.printQueue());
    setHead(queue.getHead());
    setTail(queue.getTail());
    setIsLoader({
      ...isLoader,
      clearValue: false,
      disabled: false
    });
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={(e) => e.preventDefault()} data-cy="form">
        <div className={style.input_group}>
          <Input
            data-cy="input"
            onChange={onChange}
            isLimitText={true}
            maxLength={MAXLEN}
            value={inputValue}
            extraClass="mr-6"
            disabled={isLoader.disabled}
          />
          <Button
            data-cy="add"
            text="Добавить"
            isLoader={isLoader.addValue}
            disabled={!inputValue || tail === SIZE || isLoader.disabled}
            extraClass="mr-6"
            onClick={() => enqueue(inputValue)}
          />
          <Button
            data-cy="remove"
            text="Удалить"
            isLoader={isLoader.removeValue}
            onClick={() => dequeue()}
            disabled={queue.isEmpty() || isLoader.disabled}
          />
        </div>
        <Button
          data-cy="clear"
          text="Очистить"
          isLoader={isLoader.clearValue}
          disabled={head === 0 && tail === 0 || isLoader.disabled}
          onClick={() => clear()}
        />
      </form>
      <ul className={style.list}>
        {queueArray.map((item, index) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={(index === head && !queue.isEmpty()) ? "head" : ""}
              tail={(index === tail - 1 && !queue.isEmpty()) ? "tail" : ""}
              state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};
