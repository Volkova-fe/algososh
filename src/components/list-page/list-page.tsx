import React, {FormEvent, useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {LinkedList} from "./utils";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils";
import {ArrowIcon} from "../ui/icons/arrow-icon";

const list = new LinkedList<string>();
const initialArr = ['0', '34', '8', '1']

export const ListPage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [inputIndex, setInputIndex] = useState<string>('')
    const [listArray, setListArray] = useState<(string)[]>([]);

    useEffect(() => {
        initialArr.forEach((element: string) => {
            list.insertInBegin(element);
            setListArray(list.getArray());
        })
    }, [])


    const onChangeValue = (e:FormEvent<HTMLInputElement>): void => {
        const string = e.currentTarget.value.trim();
        setInputValue(string);
    }

    const onChangeIndex = (e:FormEvent<HTMLInputElement>): void => {
        const string = e.currentTarget.value.trim();
        setInputIndex(string);
    }

    const handleClickAddHead = async () => {
        setInputValue('');
        list.insertInBegin(inputValue);
        await delay(2000);
        setListArray([...list.getArray()]);
        await delay(2000);
        setListArray([...list.getArray()]);
    }

    const handleClickAddTail = () => {
        setInputValue('');
        list.insertAtEnd(inputValue);
        setListArray([...list.getArray()]);
    }

    const handleClickAddByIndex = () => {
        setInputValue('');
        setInputIndex('');
        list.appendByIndex(inputValue, Number(inputIndex));
        setListArray([...list.getArray()]);
    }

    const handleClickRemoveHead = () => {
        list.removeHead();
        setListArray([...list.getArray()]);
    }

    const handleClickRemoveTail = () => {
        list.removeTail();
        setListArray([...list.getArray()]);
    }

    const handleClickRemoveByIndex = () => {
        setInputIndex('');
        list.removeFrom(Number(inputIndex));
        setListArray([...list.getArray()]);
    }



  return (
    <SolutionLayout title="Связный список">
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
          <Input
              onChange={onChangeValue}
              placeholder="Введите значение"
              isLimitText={true}
              maxLength={4}
              value={inputValue}
              extraClass={`${style.input} mr-6`}
          />
          <div className={style.btns_group}>
            <Button
                text="Добавить в head"
                extraClass={style.btn_small}
                onClick={handleClickAddHead}
            />
            <Button
                text="Добавить в tail"
                extraClass={style.btn_small}
                onClick={handleClickAddTail}
            />
          <Button
              text="Удалить из head"
              extraClass={style.btn_small}
              onClick={handleClickRemoveHead}
          />
            <Button
                text="Удалить из tail"
                extraClass={style.btn_small}
                onClick={handleClickRemoveTail}
            />
          </div>
      </form>
    <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <Input
            onChange={onChangeIndex}
            isLimitText={false}
            maxLength={1}
            value={inputIndex}
            placeholder="Введите индекс"
            extraClass={`${style.input} mr-6`}
        />
        <div className={style.btns_group}>
        <Button
            text="Добавить по индексу"
            extraClass={`${style.btn_large} mr-6`}
            onClick={handleClickAddByIndex}
        />
        <Button
            text="Удалить по индексу"
            extraClass={`${style.btn_large}`}
            onClick={handleClickRemoveByIndex}
        />
        </div>
      </form>
        <ul className={style.list}>
            {listArray.map((item, index) => {
                return  (
                    <>
                        <Circle
                            key={index}
                            letter={item}
                            index={index }
                            head={(index === 0 && !list.isEmpty())   ? "head" : ""}
                            tail={(index === listArray.length - 1 && !list.isEmpty()) ? "tail" : ""}
                            state={index ? ElementStates.Changing : ElementStates.Default}
                            isSmall={false}
                            extraClass={style.circle}
                        />
                        <ArrowIcon/>
                    </>)
            })}
        </ul>
    </SolutionLayout>
  );
};
