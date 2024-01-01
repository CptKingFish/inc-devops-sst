describe("login", () => {
  it("can type in the email", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="login-email-input"]').type(
      "lwin.moehtet77@gmail.com",
    );
    cy.get('[data-testid="sign-in-button"]').click();
    cy.get('[data-testid="notify-email-sent"]').should("exist");
  });
});
