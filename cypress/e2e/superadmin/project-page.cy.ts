describe("project page", () => {
  beforeEach(() => {
    cy.login("lwin.moehtet77@gmail.com");
  });

  afterEach(() => {
    cy.url().clearAllSessionStorage();
  });

  it("super admin can invite normal stakeholder", () => {
    cy.clickOrganizationLink().then(() => {
      cy.get('[data-testid^="project-').first().click();
      cy.url()
        .should("include", "/projects")
        .then(() => {
          cy.inviteNormalStakeholder();
        });
    });
  });
});
