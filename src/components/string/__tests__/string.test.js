import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StringComponent } from '../string';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';


const testString = (inputValue, result) => {
	jest.useFakeTimers();
	render(
		<BrowserRouter>
			<StringComponent />
		</BrowserRouter>
	);

	const button = screen.getByTestId('button');
	const input = screen.getByTestId('input');

	fireEvent.change(input, { target: { value: inputValue } });
	fireEvent.click(button);

	act(() => jest.advanceTimersByTime(11000));

	const elements = screen.getAllByTestId('circle');

	waitFor(() =>
		expect(elements
			.map((letter) => letter.textContent)
			.join(''))
			.toBe(result)
	);
}

describe('Тестирование компонента StringComponent', () => {
	it('Корректно разворачивает строку с чётным количеством символов.', () => {
		testString('123456', '654321');
	});
	it('Корректно разворачивает строку с нечётным количеством символов.', () => {
		testString('12345', '54321');
	});
	it('Корректно разворачивает строку с одним символом.', () => {
		testString('1', '1');
	});
	it('Корректно разворачивает пустую строку', () => {
		testString(' ', ' ');
	})
})

