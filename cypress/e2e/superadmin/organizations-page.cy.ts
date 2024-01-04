describe("organizations-page", () => {
  beforeEach(() => {
    cy.login("lwin.moehtet77@gmail.com");
  });

  afterEach(() => {
    cy.url().clearAllSessionStorage();
  });

  it("super admin can create new organization", () => {
    cy.visit("/organizations");
    cy.url().should("include", "/organizations");
    cy.get("h1").contains("Organizations");
    cy.getDataTestId("create-new-organization-btn").click();
    cy.getDataTestId("new-organization-name-input").type("test");
    cy.getDataTestId("submit-btn").click();
    cy.wait(1000);
    cy.get('[data-testid^="organization-"]').should("exist");
  });

  it("can create new project", () => {
    cy.visit("/organizations");
    cy.get('[data-testid^="organization-"]').last().click();
    cy.url().should("include", "/organizations/");
    cy.get("h1").contains("Projects");
    cy.createNewProject();
  });

  it("can invite HMS", () => {
    cy.visit("/organizations");
    cy.get('[data-testid^="organization-"]').last().click();
    cy.inviteHMS();
  });
});
