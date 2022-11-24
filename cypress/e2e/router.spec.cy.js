describe('Сервер доступен', function () {
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.visit('http://localhost:3000/recursion');
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.visit('http://localhost:3000/fibonacci');
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.visit('http://localhost:3000/sorting');
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.visit('http://localhost:3000/stack');
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.visit('http://localhost:3000/queue');
	});
	it('Должен быть доступен по адресу localhost:3000', function () {
		cy.visit('http://localhost:3000/list');
	});
}); 