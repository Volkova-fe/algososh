
describe('Сервер доступен', function () {
	beforeEach(() => {
		cy.visit('');
	})
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.get('a[href*="/recursion"]').click()
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.get('a[href*="/fibonacci"]').click()
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.get('a[href*="/sorting"]').click()
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.get('a[href*="/stack"]').click()
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.get('a[href*="/queue"]').click()
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.get('a[href*="/list"]').click()

	});
}); 