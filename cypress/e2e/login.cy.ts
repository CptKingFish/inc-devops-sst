describe("login", () => {
  it("can type in the email", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="login-email-input"]').type(
      "lwin.moehtet77@gmail.com",
    );
    cy.get('[data-testid="sign-in-button"]').click();
    cy.get('[data-testid="notify-email-sent"]').should("exist");
    cy.task("getLastEmail", "lwin.moehtet77@gmail.com").then((email) => {
      if (typeof email === "string") {
        const hrefRegex = /href="([^"]+)"/; // This regex will match href="any_non_quote_characters"
        const match = email.match(hrefRegex);
        if (match?.[1]) {
          const magicLink = match[1];
          cy.visit(magicLink);
        } else {
          throw new Error("Magic link not found in email");
        }
      } else {
        throw new Error("Email is not a string");
      }
    });
  });
});
