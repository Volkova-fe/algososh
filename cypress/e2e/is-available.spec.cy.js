
it('Должен быть доступен по адресу localhost:3000', function () {
	cy.visit('');
	cy.contains('МБОУ АЛГОСОШ')
});