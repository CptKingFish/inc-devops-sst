/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to check organization.
       * @example cy.checkOrganization()
       */
      getDataTestId(dataTestId: string): Chainable<JQuery<HTMLElement>>;
      login(emailInput: string): Chainable<void>;
      checkOrganization(): Chainable<Element>;
    }
  }
}

// This commands is used to get data-testid without having to use cy.get(`[data-testid="${dataTestId}"]`)
Cypress.Commands.add("getDataTestId", (dataTestId: string) => {
  return cy.get(`[data-testid="${dataTestId}"]`);
});

Cypress.Commands.add("login", (emailInput: string) => {
  cy.visit("/");
  cy.getDataTestId("login-email-input").type(emailInput);
  cy.getDataTestId("sign-in-button").click();
  cy.getDataTestId("notify-email-sent").should("exist");

  cy.task("getLastEmail", emailInput).then((email) => {
    cy.log("email", email as string);
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

Cypress.Commands.add("checkOrganization", () => {
  cy.visit("/dashboard");
  cy.getDataTestId("organization-label").should("exist");

  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="no-organization"]').length > 0) {
      cy.getDataTestId("no-organization").should("exist");
    } else {
      cy.getDataTestId("all-organizations").each((item) => {
        cy.wrap(item).should("exist").click();
      });
    }
  });
});
