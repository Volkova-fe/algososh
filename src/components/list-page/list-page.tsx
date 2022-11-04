import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {LinkedList} from "./utils";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils";
import {ArrowIcon} from "../ui/icons/arrow-icon";

interface IShiftElement {
    value: string;
    state: ElementStates;
    position: 'addAction' | 'removeAction';
}

interface IListArr {
    value: string,
    state: ElementStates
    shiftElement: IShiftElement | null;
}

const initialArr = ['0', '34', '8', '1'];
const listArr: IListArr[] =  []
    for (let i = 0; i <= initialArr.length - 1; i++) {
        listArr.push({
            value: initialArr[i],
            state: ElementStates.Default,
            shiftElement: null
        });
}

export const ListPage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [inputIndex, setInputIndex] = useState<string>('')
    const [listArray, setListArray] = useState<IListArr[]>(listArr);
    const [isLoader, setIsLoader] = useState<object>({
        insertInBegin: false,
        insertAtEnd:  false,
        appendByIndex: false,
        removeHead: false,
        removeTail: false,
        removeFrom: false,
    });
    const list = new LinkedList<string>(initialArr);

    useEffect(() => {
        setListArray(listArr)
    }, []);


    const onChangeValue = (e:FormEvent<HTMLInputElement>): void => {
        const string = e.currentTarget.value.trim();
        setInputValue(string);
    }

    const onChangeIndex = (e:FormEvent<HTMLInputElement>): void => {
        const string = e.currentTarget.value.trim();
        setInputIndex(string);
    }

    const handleClickAddHead = async () => {
        setIsLoader({insertInBegin: true})
        setInputValue('');
        list.insertInBegin(inputValue);
        if(listArray.length > 0) {
            listArray[0].shiftElement = {
                value: inputValue,
                state: ElementStates.Changing,
                position: 'addAction',
            }
        }
        setListArray([...listArray]);
        await delay(500);
        listArray[0].shiftElement = null;
        listArray.unshift({
            ...listArray[0],
            value: inputValue,
            state: ElementStates.Modified
        });
        setListArray([...listArray]);
        await delay(500);
        listArray[0].state = ElementStates.Default;
        setListArray([...listArray]);
        setIsLoader({insertInBegin: false})
    }

    const handleClickAddTail = async () => {
        setIsLoader(true)
        setInputValue('');
        list.insertAtEnd(inputValue);
        listArray[listArray.length - 1] = {
            ...listArray[listArray.length - 1],
            shiftElement: {
                value: inputValue,
                state: ElementStates.Changing,
                position: 'addAction',
            }
        }
        setListArray([...listArray]);
        await delay(500);
        listArray[listArray.length - 1] = {
            ...listArray[listArray.length - 1],
            shiftElement: null
        }

        listArray.push({
            value: inputValue,
            state: ElementStates.Modified,
            shiftElement: null,
        })
        setListArray([...listArray]);
        await delay(500);
        listArray[listArray.length - 1].state = ElementStates.Default;
        setListArray([...listArray]);
        setIsLoader(false)
    }

    const handleClickAddByIndex = async () => {
        setIsLoader(true)
        list.appendByIndex(inputValue, Number(inputIndex));
        for(let i = 0; i <= Number(inputIndex); i++) {
            listArray[i] = {
                ...listArray[i],
                state: ElementStates.Changing,
                shiftElement: {
                    value: inputValue,
                    state: ElementStates.Changing,
                    position: "addAction"
                }
            }
            await delay(500);
            setListArray([...listArray]);
            if(i > 0) {
                listArray[i - 1] = {
                    ...listArray[i - 1],
                    shiftElement: null
                }
            }
            setListArray([...listArray]);
        }
        await delay(500);
        listArray[Number(inputIndex)] = {
            ...listArray[Number(inputIndex)],
            state: ElementStates.Default,
            shiftElement: null
        }
        listArray.splice(Number(inputIndex), 0, {
            value: inputValue,
            state: ElementStates.Modified,
            shiftElement: null
        })
        setListArray([...listArray]);
        listArray[Number(inputIndex)].state = ElementStates.Default;
        listArray.forEach((elem: IListArr) => {
            elem.state = ElementStates.Default;
        })
        await delay(500);
        setListArray([...listArray]);
        setInputValue('');
        setInputIndex('');
        setIsLoader(false)
    }

    const handleClickRemoveHead = async () => {
        setIsLoader(true)
        listArray[0] = {
            ...listArray[0],
            value: '',
            shiftElement: {
                value: listArray[0].value,
                state: ElementStates.Changing,
                position: "removeAction"
            }
        }
        list.removeHead();
        setListArray([...listArray]);
        await delay(500);
        listArray.shift();
        setListArray([...listArray]);
        setIsLoader(false)
    }

    const handleClickRemoveTail = async () => {
        setIsLoader(true)
        listArray[listArray.length - 1] = {
            ...listArray[listArray.length - 1],
            value: '',
            shiftElement: {
                value: listArray[listArray.length - 1].value,
                state: ElementStates.Changing,
                position: "removeAction"
            }
        }
        list.removeTail();
        setListArray([...listArray]);
        await delay(500);
        listArray.pop();
        setListArray([...listArray]);
        setIsLoader(false)
    }

    const handleClickRemoveByIndex = async () => {
        setIsLoader(true)
        setInputIndex('');
        list.removeFrom(Number(inputIndex));
        for(let i = 0; i <= Number(inputIndex); i++) {
            listArray[i] = {
                ...listArray[i],
                state: ElementStates.Changing,
            }
            await delay(500);
            setListArray([...listArray]);
        }
        listArray[Number(inputIndex)] = {
            ...listArray[Number(inputIndex)],
            value: '',
            shiftElement: {
                value: listArray[Number(inputIndex)].value,
                state: ElementStates.Changing,
                position: "removeAction"
            }
        }
        await delay(500);
        setListArray([...listArray]);
        listArray.splice(Number(inputIndex), 1)
        listArray[Number(inputIndex) - 1] = {
            ...listArray[Number(inputIndex) - 1],
            value: listArray[Number(inputIndex) - 1].value,
            state: ElementStates.Modified,
            shiftElement: null
        }
        await delay(500);
        setListArray([...listArray]);
        listArray.forEach((elem) => {
            elem.state = ElementStates.Default;
        })
        await delay(500);
        setListArray([...listArray]);
        setIsLoader(false)
    }

  return (
    <SolutionLayout title="Связный список">
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
          <Input
              onChange={onChangeValue}
              disabled={[isLoader.insertInBegin]}
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
                isLoader={isLoader}
                disabled={!inputValue}
            />
            <Button
                text="Добавить в tail"
                extraClass={style.btn_small}
                onClick={handleClickAddTail}
                disabled={!inputValue}
                isLoader={isLoader}
            />
          <Button
              text="Удалить из head"
              extraClass={style.btn_small}
              onClick={handleClickRemoveHead}
              isLoader={isLoader}
              disabled={listArray.length === 0}
          />
            <Button
                text="Удалить из tail"
                extraClass={style.btn_small}
                onClick={handleClickRemoveTail}
                isLoader={isLoader}
                disabled={listArray.length === 0}
            />
          </div>
      </form>
    <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        <Input
            onChange={onChangeIndex}
            disabled={isLoader}
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
            isLoader={isLoader}
            disabled={!inputValue || !inputIndex}
        />
        <Button
            text="Удалить по индексу"
            extraClass={`${style.btn_large}`}
            onClick={handleClickRemoveByIndex}
            isLoader={isLoader}
            disabled={!inputValue || !inputIndex || listArray.length === 0}
        />
        </div>
      </form>
        <ul className={style.list}>
            {listArray.map((item, index) => {
                return  (
                    <li className={style.item}   key={index}>
                        {item.shiftElement && (
                            <Circle
                                extraClass={`${style.circle_small} ${style[`${item.shiftElement.position}`]}`}
                                letter={item.shiftElement.value}
                                state={item.shiftElement.state}
                                isSmall
                            />
                        )}
                        <Circle
                            letter={item.value}
                            index={index }
                            head={index === 0 && !item.shiftElement ? "head" : ""}
                            tail={index === listArray.length - 1 && !item.shiftElement ? "tail" : ""}
                            isSmall={false}
                            state={item.state}
                            extraClass="mr-12"
                        />
                        {index < listArray.length - 1 &&
                            <ArrowIcon fill={item.state !== ElementStates.Changing ? "#0032FF" : "#d252e1"}/>}
                    </li> )
            })}
        </ul>
    </SolutionLayout>
  );
};
