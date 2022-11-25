import { dataCyForm, dataCyInput, dataCySubmit } from "../constants/test";


describe('Корректная работа Фибоначчи', () => {
	beforeEach(() => {
		cy.visit(`/fibonacci`)
	});
	it('Если в инпуте пусто, то кнопка добавления недоступна', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCySubmit).should('be.disabled')
			})
	})
	it('Числа генерируются корректно', function () {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type('19')
				cy.get(dataCySubmit).click()
				cy.get(dataCyInput).should('be.disabled')
			})
	})
}); 