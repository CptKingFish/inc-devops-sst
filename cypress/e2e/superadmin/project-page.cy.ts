describe("project page", () => {
  beforeEach(() => {
    cy.login("lwin.moehtet77@gmail.com");
  });
  it("can invite normal stakeholder", () => {
    cy.checkOrganization();
    cy.get('[data-testid^="project-').first().click();
    cy.getDataTestId("invite-stakeholder-btn").click();
    cy.getDataTestId("invite-stakeholder-email-input").type(
      "teststakeholder@gmail.com",
    );
    cy.getDataTestId("submit-btn").click();
    cy.wait(1000);
    cy.get('[data-testid^="stakeholder-email').should("exist");
  });
});
