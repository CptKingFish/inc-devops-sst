// describe("login", () => {
//   it("can login", () => {
//     const emailInput = "lwin.moehtet77@gmail.com";

//     cy.visit("/");
//     cy.get('[data-testid="login-email-input"]').type(emailInput);
//     cy.get('[data-testid="sign-in-button"]').click();
//     cy.get('[data-testid="notify-email-sent"]').should("exist");
//     cy.task("getLastEmail", emailInput).then((email) => {
//       if (typeof email === "string") {
//         const hrefRegex = /href="([^"]+)"/; // This regex will match href="any_non_quote_characters"
//         const match = email.match(hrefRegex);
//         if (match?.[1]) {
//           const magicLink = match[1];
//           cy.visit(magicLink);
//         } else {
//           throw new Error("Magic link not found in email");
//         }
//       } else {
//         throw new Error("Email is not a string");
//       }
//     });
//   });
// });
describe("project page", () => {
  beforeEach(() => {
    cy.login("lwin.moehtet77@gmail.com");
  });
  it("can create new project", () => {
    cy.checkOrganization();
    cy.getDataTestId("create-new-project").click();
    cy.getDataTestId("new-project-name-input").type("test");
    cy.getDataTestId("submit-btn").click();
  });
  it("can invite HMS", () => {
    cy.checkOrganization();
    cy.getDataTestId("invite-hms-btn").click();
    cy.getDataTestId("hms-email-input").type("test@gmail.com");
    cy.getDataTestId("submit-btn").click();

    cy.getDataTestId("hms-emails").should("exist");
  });
});
