// describe("superadmin page", () => {
//   beforeEach(() => {
//     cy.login("lwin.moehtet77@gmail.com");
//   });
//   it("super admin can invite admin", () => {
//     cy.visit("/superadmin");
//     cy.getDataTestId("invite-admin-btn").click();
//     cy.getDataTestId("invite-admin-email-input").type(
//       "testsuperadmin2@gmail.com",
//     );
//     cy.getDataTestId("submit-btn").click();
//     cy.wait(3000);
//     cy.getDataTestId("admin-table").should("exist");
//   });
// });
