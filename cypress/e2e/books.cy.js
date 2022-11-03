describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
	//list books
    cy.visit('/')
	cy.get('[data-cy=link-to-books]').click()

	//create books
	cy.get('[href="/libros/crear"]').click()
		.get('[data-cy=input-book-title]')
		.type('New Book Register')
		.get('[data-cy=button-submit-book]')
		.click()
		.get('[data-cy=book-list]')
		.contains('New Book Register')

	// show book id
	cy.get('[data-cy^=link-to-visit-book-*]')
		.last()
		.click()
		.get('h1').should('containt.text','New Book Register')
		.get('[href="/libros"]').click()

		//edit book
		cy.get('[data-cy^=link-to-edit-book-]')
			.last()
			.click()
			.get('[data-cy=input-book-title]')
			.clear()
			.type('Book Editado Cypress')
			.get('[data-cy=button-submit-book]')
			.click()
			.get('[data-cy=book-list]')
			.contains('Book Edited by Cypress')

		//delete book
		cy.get('[data-cy^=link-to-delet-book-]')
			.last()
			.click()
			.get('[data-cy^=link-to-visit-book-]')
			.last().should('not.containt.text','Book Edited by Cypress')
  })
})