describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('.email-input').type('dummyemail.com');
    cy.get('.email-errormessage').should('have.text','正しいメールアドレスの形式ではありません。');
    cy.get('.email-input').clear();
    cy.get('.signin-button').click();
    cy.get('.email-errormessage').should('have.text','入力が必須の項目です。');
    cy.get('.password-errormessage').should('have.text','入力が必須の項目です。'); 

  })
})