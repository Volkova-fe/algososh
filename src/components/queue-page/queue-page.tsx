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

const size: number = 7;

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [queue] = useState(new Queue<string>(size));
  const [queueArray, setQueueArray] = useState<(string | undefined)[]>(queue.printQueue());
  const [head, setHead] = useState<number>(queue.getHead());
  const [tail, setTail] = useState<number>(queue.getTail());


  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value.trim();
    setInputValue(string);
  }

  const enqueue = async (item: string) => {
    queue.enqueue(item);
    setInputValue('')
    setQueueArray([...queue.printQueue()]);
    setTail(queue.getTail());
    setCurrentIndex(tail % queue.getSize());
    await delay(SHORT_DELAY_IN_MS);
    setCurrentIndex(-1);
    await delay(SHORT_DELAY_IN_MS);
  }

  const dequeue = async () => {
    if (queue) {
      queue.dequeue();
      setQueueArray([...queue.printQueue()]);
      setCurrentIndex((head & queue.getSize()));
      await delay(SHORT_DELAY_IN_MS);
      setHead(queue.getHead());
      setCurrentIndex(-1);
      await delay(SHORT_DELAY_IN_MS);
    }
  }

  const clear = () => {
    queue.clear();
    setQueueArray(queue.printQueue());
    setHead(queue.getHead());
    setTail(queue.getTail());
  }

  return (
    <SolutionLayout title="Очередь">
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
            text="Добавить"
            disabled={!inputValue || tail === size}
            extraClass="mr-6"
            onClick={() => enqueue(inputValue)}
          />
          <Button
            text="Удалить"
            onClick={() => dequeue()}
            disabled={queue.isEmpty()}
          />
        </div>
        <Button
          text="Очистить"
          disabled={head === 0 && tail === 0}
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
