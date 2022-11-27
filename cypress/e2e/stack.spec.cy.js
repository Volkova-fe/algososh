import { DELAY_IN_MS } from "../../src/constants/delays";
import {
	changingStyle,
	dataCyAdd,
	dataCyClear,
	dataCyForm,
	dataCyInput,
	dataCyRemove,
	defaultStyle,
	mainCircle
} from "../constants/test";


describe('Корректная работа стэка', () => {
	const addNextElem = (value) => {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type(value)
				cy.get(dataCyAdd).should('be.not.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyClear).should('be.not.disabled')
			})
		cy.tick(DELAY_IN_MS)
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyAdd).click()
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})
			cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(changingStyle))
		cy.tick(DELAY_IN_MS)
	}

	const addFirstElem = (value) => {
		cy.clock()
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).type(value)
				cy.get(dataCyAdd).should('be.not.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyAdd).click()
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})

		cy.get(mainCircle).contains(value).parent()
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(changingStyle))
		cy.tick(DELAY_IN_MS)
	}

	beforeEach(() => {
		cy.visit(`/stack`)
	});
	it('Если в инпуте пусто, то кнопка добавления недоступна', function () {
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})
	})

	it('Добавление элемента в стек корректно', function () {
		cy.clock()
		addFirstElem('5')

		cy.get(mainCircle)
			.invoke('attr', 'class')
			.then(classList => expect(classList).contains(defaultStyle))

		addNextElem('6')

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[0])
				.children().should('have.text', '5')

			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[1])
				.children().should('have.text', '6')
		})

		addNextElem('7')

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[0])
				.children().should('have.text', '5')

			cy.get(elem[1])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[1])
				.children().should('have.text', '6')

			cy.get(elem[2])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[2])
				.children().should('have.text', '7')
		})
	})

	it('Корректное удаления элемента из стека', function () {
		cy.clock()
		addFirstElem('5')
		cy.tick(DELAY_IN_MS)
		addNextElem('6')

		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCyAdd).should('be.disabled')
			cy.get(dataCyRemove).click()
		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle).then((elem) => {
			cy.get(elem[0])
				.invoke('attr', 'class')
				.then(classList => expect(classList).contains(defaultStyle))
			cy.get(elem[0])
				.children().should('have.text', '5')
		})
		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyRemove).should('be.not.disabled')
				cy.get(dataCyClear).should('be.not.disabled')
			})
	})

	it('Корректное поведение кнопки «Очистить»', function () {
		cy.clock()
		addFirstElem('5')
		cy.tick(DELAY_IN_MS)
		addNextElem('6')
		cy.tick(DELAY_IN_MS)
		addNextElem('7')

		cy.clock()
		cy.get(dataCyForm).within(() => {
			cy.get(dataCyInput).should('have.value', '')
			cy.get(dataCyAdd).should('be.disabled')
			cy.get(dataCyClear).click()
		})

		cy.tick(DELAY_IN_MS)

		cy.get(mainCircle).should('not.exist');

		cy.get(dataCyForm)
			.within(() => {
				cy.get(dataCyInput).should('have.value', '')
				cy.get(dataCyAdd).should('be.disabled')
				cy.get(dataCyRemove).should('be.disabled')
				cy.get(dataCyClear).should('be.disabled')
			})
	})
}); 