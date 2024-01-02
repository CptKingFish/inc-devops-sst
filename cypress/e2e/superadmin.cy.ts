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
describe("create new project", () => {
  it("can login", () => {
    cy.login("lwin.moehtet77@gmail.com");
  });

  it("can see all organization", () => {
    cy.login("lwin.moehtet77@gmail.com");
    cy.checkOrganization();
  });

  it("can create new project", () => {
    cy.login("lwin.moehtet77@gmail.com");
    cy.checkOrganization();
    cy.get('[data-testid="create-new-project"]').click();
    cy.get('[data-testid="new-project-name-input"]').type("test");
    cy.get('[data-testid="submit-btn"]').click();
  });
});
