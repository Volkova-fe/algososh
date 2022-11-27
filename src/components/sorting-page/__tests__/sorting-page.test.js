import React from 'react';
import { ElementStates } from '../../../types/element-states';
import { bubbleSort, selectionSort } from '../utils';

const stub = [
	{num: 9, state: ElementStates.Default},
	{num: 18, state: ElementStates.Default},
	{num: 3, state: ElementStates.Default},
	{num: 4, state: ElementStates.Default},
	{num: 2, state: ElementStates.Default}
]

const result = [
	{num: 18, state: ElementStates.Default},
	{num: 9, state: ElementStates.Default},
	{num: 4, state: ElementStates.Default},
	{num: 3, state: ElementStates.Default},
	{num: 2, state: ElementStates.Default}
]

describe('Тестирование компонента SortingPage', () => {
	//тест сортировка выбором
	it('Корректно сортирует пустой массив.', () => {
		expect(selectionSort([])).toEqual([]);
	});

	it('Корректно сортирует массив из одного элемента.', () => {
		expect(selectionSort([{
			num: 9,
			state: ElementStates.Default
		}])).toStrictEqual([{
			num: 9,
			state: ElementStates.Default
		}]);
	});

	it('Корректно сортирует массив из нескольких элементов', () => {
		expect(selectionSort(stub)).toStrictEqual(result);
	});

	//тест сортировка пузырьком
	it('Корректно сортирует пустой массив.', () => {
		expect(bubbleSort([])).toEqual([]);
	});
	it('Корректно сортирует массив из одного элемента.', () => {
		expect(bubbleSort([{
			num: 9,
			state: ElementStates.Default
		}])).toStrictEqual([{
			num: 9,
			state: ElementStates.Default
		}]);

	});
	it('Корректно сортирует массив из нескольких элементов.', () => {
		expect(bubbleSort(stub)).toStrictEqual(result);
	});
})