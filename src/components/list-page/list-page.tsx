import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./class/list-page";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IListArr, IStateLoader } from "../../types/list-page";
import { initialArr, listArr } from "./utils";


export const ListPage: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [inputIndex, setInputIndex] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [listArray, setListArray] = useState<IListArr[]>(listArr);
    const [isLoader, setIsLoader] = useState<IStateLoader>({
        insertInBegin: false,
        insertAtEnd: false,
        appendByIndex: false,
        removeHead: false,
        removeTail: false,
        removeFrom: false,
    });

    const list = new LinkedList<string>(initialArr);


    const onChangeValue = (e: FormEvent<HTMLInputElement>): void => {
        const string = e.currentTarget.value.trim();
        setInputValue(string);
    }

    const onChangeIndex = (e: FormEvent<HTMLInputElement>): void => {
        const number = e.currentTarget.value.trim();
        setInputIndex(Number(number));
    }

    const handleClickAddHead = async () => {
        setIsLoader({ ...isLoader, insertInBegin: true });
        setDisabled(true);
        setInputValue('');
        list.appendByIndex(inputValue, 0);
        if (listArray.length > 0) {
            listArray[0] = { 
                ...listArray[0],
                shiftElement: {
                value: inputValue,
                state: ElementStates.Changing,
                position: 'addAction',
            }
        }
        }
        setListArray([...listArray]);
        await delay(SHORT_DELAY_IN_MS);
        listArray[0] = { 
            ...listArray[0],
            shiftElement: null
        }
        listArray.unshift({
            ...listArray[0],
            value: inputValue,
            state: ElementStates.Modified
        });
        setListArray([...listArray]);
        await delay(SHORT_DELAY_IN_MS);
        listArray[0].state = ElementStates.Default;
        setListArray([...listArray]);
        setIsLoader({ ...isLoader, insertInBegin: false });
        setDisabled(false);
    }

    const handleClickAddTail = async () => {
        setIsLoader({ ...isLoader, insertAtEnd: true });
        setDisabled(true);
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
        await delay(SHORT_DELAY_IN_MS);
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
        await delay(SHORT_DELAY_IN_MS);
        listArray[listArray.length - 1].state = ElementStates.Default;
        setListArray([...listArray]);
        setIsLoader({ ...isLoader, insertAtEnd: false });
        setDisabled(false);
    }

    const handleClickAddByIndex = async () => {
        setIsLoader({ ...isLoader, appendByIndex: true });
        setDisabled(true);
        list.appendByIndex(inputValue, Number(inputIndex));
        for (let i = 0; i <= Number(inputIndex); i++) {
            listArray[i] = {
                ...listArray[i],
                state: ElementStates.Changing,
                shiftElement: {
                    value: inputValue,
                    state: ElementStates.Changing,
                    position: "addAction"
                }
            }
            await delay(SHORT_DELAY_IN_MS);
            setListArray([...listArray]);
            if (i > 0) {
                listArray[i - 1] = {
                    ...listArray[i - 1],
                    shiftElement: null
                }
            }
            setListArray([...listArray]);
        }
        await delay(SHORT_DELAY_IN_MS);
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
        await delay(SHORT_DELAY_IN_MS);
        setListArray([...listArray]);
        setInputValue('');
        setInputIndex(0);
        setIsLoader({ ...isLoader, appendByIndex: false });
        setDisabled(false);
    }

    const handleClickRemoveHead = async () => {
        setIsLoader({ ...isLoader, removeHead: true });
        setDisabled(true);
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
        await delay(SHORT_DELAY_IN_MS);
        listArray.shift();
        setListArray([...listArray]);
        setIsLoader({ ...isLoader, removeHead: false });
        setDisabled(false);
    }

    const handleClickRemoveTail = async () => {
        setIsLoader({ ...isLoader, removeTail: true });
        setDisabled(true);
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
        await delay(SHORT_DELAY_IN_MS);
        listArray.pop();
        setListArray([...listArray]);
        setIsLoader({ ...isLoader, removeTail: false });
        setDisabled(false);
    }

    const handleClickRemoveByIndex = async () => {
        setIsLoader({ ...isLoader, removeFrom: true });
        setDisabled(true);
        setInputIndex(0);
        list.removeFrom(Number(inputIndex));
        for (let i = 0; i <= Number(inputIndex); i++) {
            listArray[i] = {
                ...listArray[i],
                state: ElementStates.Changing,
            }
            await delay(SHORT_DELAY_IN_MS);
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
        await delay(SHORT_DELAY_IN_MS);
        setListArray([...listArray]);
        listArray.splice(Number(inputIndex), 1)
        listArray[Number(inputIndex) - 1] = {
            ...listArray[Number(inputIndex) - 1],
            value: listArray[Number(inputIndex) - 1].value,
            state: ElementStates.Modified,
            shiftElement: null
        }
        await delay(SHORT_DELAY_IN_MS);
        setListArray([...listArray]);
        listArray.forEach((elem) => {
            elem.state = ElementStates.Default;
        })
        await delay(SHORT_DELAY_IN_MS);
        setListArray([...listArray]);
        setIsLoader({ ...isLoader, removeFrom: false });
        setDisabled(false);
    }

    return (
        <SolutionLayout title="Связный список">
            <form className={style.form} onSubmit={(e) => e.preventDefault()}>
                <Input
                    onChange={onChangeValue}
                    placeholder="Введите значение"
                    isLimitText={true}
                    maxLength={4}
                    disabled={disabled}
                    value={inputValue}
                    extraClass={`${style.input} mr-6`}
                />
                <div className={style.btns_group}>
                    <Button
                        text="Добавить в head"
                        extraClass={style.btn_small}
                        onClick={handleClickAddHead}
                        isLoader={isLoader.insertInBegin}
                        disabled={!inputValue || disabled}
                    />
                    <Button
                        text="Добавить в tail"
                        extraClass={style.btn_small}
                        onClick={handleClickAddTail}
                        disabled={!inputValue || disabled}
                        isLoader={isLoader.insertAtEnd}
                    />
                    <Button
                        text="Удалить из head"
                        extraClass={style.btn_small}
                        onClick={handleClickRemoveHead}
                        isLoader={isLoader.removeHead}
                        disabled={listArray.length === 0 || disabled}
                    />
                    <Button
                        text="Удалить из tail"
                        extraClass={style.btn_small}
                        onClick={handleClickRemoveTail}
                        isLoader={isLoader.removeTail}
                        disabled={listArray.length === 0 || disabled}
                    />
                </div>
            </form>
            <form className={style.form} onSubmit={(e) => e.preventDefault()}>
                <Input
                    onChange={onChangeIndex}
                    isLimitText={false}
                    type="number"
                    maxLength={1}
                    max={9}
                    disabled={disabled}
                    value={inputIndex}
                    placeholder="Введите индекс"
                    extraClass={`${style.input} mr-6`}
                />
                <div className={style.btns_group}>
                    <Button
                        text="Добавить по индексу"
                        extraClass={`${style.btn_large} mr-6`}
                        onClick={handleClickAddByIndex}
                        isLoader={isLoader.appendByIndex}
                        disabled={
                            !inputValue
                            || !inputIndex
                            || disabled
                            || Number(inputIndex) > listArray.length
                        }
                    />
                    <Button
                        text="Удалить по индексу"
                        extraClass={`${style.btn_large}`}
                        onClick={handleClickRemoveByIndex}
                        isLoader={isLoader.removeFrom}
                        disabled={
                            !inputIndex
                            || listArray.length === 0
                            || disabled
                            || Number(inputIndex) > listArray.length - 1}
                    />
                </div>
            </form>
            <ul className={style.list}>
                {listArray.map((item, index) => {
                    return (
                        <li className={style.item} key={index}>
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
                                index={index}
                                head={index === 0 && !item.shiftElement ? "head" : ""}
                                tail={index === listArray.length - 1 && !item.shiftElement ? "tail" : ""}
                                isSmall={false}
                                state={item.state}
                                extraClass="mr-12"
                            />
                            {index < listArray.length - 1 &&
                                <ArrowIcon fill={item.state !== ElementStates.Changing ? "#0032FF" : "#d252e1"} />}
                        </li>)
                })}
            </ul>
        </SolutionLayout>
    );
};
