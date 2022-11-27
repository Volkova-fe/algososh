import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { dataCyForm, dataCyInput, dataCySubmit, mainCircle } from "../constants/test";


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
				cy.get(dataCyInput).type('5')
				cy.get(dataCySubmit).click()
				cy.get(dataCyInput).should('be.disabled')
			})

		cy.tick(SHORT_DELAY_IN_MS)

		cy.get(mainCircle).children().should('have.length', '1').should('have.text', '1')

		cy.tick(SHORT_DELAY_IN_MS)	
		cy.wait(SHORT_DELAY_IN_MS)
		
		cy.get(mainCircle).children().should('have.length', '2').should('have.text', '11')

		cy.tick(SHORT_DELAY_IN_MS)	
		cy.wait(SHORT_DELAY_IN_MS)
		
		cy.get(mainCircle).children().should('have.length', '3').should('have.text', '112')

		cy.tick(SHORT_DELAY_IN_MS)	
		cy.wait(SHORT_DELAY_IN_MS)
		
		cy.get(mainCircle).children().should('have.length', '4').should('have.text', '1123')

		cy.tick(SHORT_DELAY_IN_MS)	
		cy.wait(SHORT_DELAY_IN_MS)
		
		cy.get(mainCircle).children().should('have.length', '5').should('have.text', '11235')

		cy.tick(SHORT_DELAY_IN_MS)	
		cy.wait(SHORT_DELAY_IN_MS)

		cy.get(mainCircle).children().should('have.length', '6').should('have.text', '112358')

		cy.tick(SHORT_DELAY_IN_MS)	
		cy.wait(SHORT_DELAY_IN_MS)

		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCySubmit).should('be.disabled')
		})
	})
	
}); 