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
      clickOrganizationLink(): Chainable<Element>;
      createNewProject(): Chainable<Element>;
      inviteHMS(): Chainable<Element>;
      inviteNormalStakeholder(): Chainable<Element>;
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

Cypress.Commands.add("clickOrganizationLink", () => {
  cy.get("body").then(($body) => {
    if ($body.find('[data-testid="no-organization"]').length > 0) {
      cy.getDataTestId("no-organization").should("exist");
    } else {
      cy.get('[data-testid^="organization-"]').last().click();
    }
  });
});

Cypress.Commands.add("createNewProject", () => {
  cy.getDataTestId("create-new-project").click();
  cy.getDataTestId("new-project-name-input").type("test");
  cy.getDataTestId("submit-btn").click();
  cy.wait(1000);
  cy.get('[data-testid^="project-"]').should("exist");
  cy.get("p").contains("test").should("exist");
});

Cypress.Commands.add("inviteHMS", () => {
  cy.getDataTestId("invite-hms-btn").click();
  cy.getDataTestId("hms-email-input").type("test@gmail.com");
  cy.getDataTestId("submit-btn").click();
  cy.wait(1000);
  cy.get("li").contains("Invited upper management").should("exist");
  cy.getDataTestId("hms-emails").should("exist");
});

Cypress.Commands.add("inviteNormalStakeholder", () => {
  cy.getDataTestId("invite-stakeholder-btn").click();
  cy.getDataTestId("invite-stakeholder-email-input").type(
    "teststakeholder@gmail.com",
  );
  cy.getDataTestId("submit-btn").click();
  cy.wait(1000);
  cy.get("li").contains("Invited Stakeholder").should("exist");
  cy.get('[data-testid^="stakeholder-email').should("exist");
});
