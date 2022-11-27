import React from 'react';
import { reversString } from '../utils';


describe('Тестирование компонента StringComponent', () => {
	it('Корректно разворачивает строку с чётным количеством символов.', () => {
		expect(reversString('1234')).toEqual(['4', '3', '2', '1']);
	});
	it('Корректно разворачивает строку с нечётным количеством символов.', () => {
		expect(reversString('12345')).toEqual(['5', '4', '3', '2', '1']);
	});
	it('Корректно разворачивает строку с одним символом.', () => {
		expect(reversString('1')).toEqual(['1']);

	});
	it('Корректно разворачивает пустую строку', () => {
		expect(reversString('')).toEqual([]);
	})
})

