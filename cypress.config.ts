// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";
import ms from "smtp-tester";

export default defineConfig({
  projectId: "3rn6ko",
  // env: {
  //   DATABASE_URL:
  //     "postgresql://sithu:IzPHy7eeKHi6QHgGxlnpqg@inc-flow-5492.6xw.cockroachlabs.cloud:26257/devops-sst?sslmode=verify-full",
  //   NEXTAUTH_SECRET: "horETG1q/Lra2BpBIS8Xtfh68+vA2y2iCRtX/McTRNE=",
  //   NEXTAUTH_URL: "http://localhost:3000",
  //   NEXT_PUBLIC_URL: "http://localhost:3000",
  //   EMAIL_SERVER_HOST: "localhost",
  //   EMAIL_SERVER_PORT: 7777,
  //   EMAIL_SERVER_USER: "elliottchong16@gmail.com",
  //   EMAIL_FROM: "noreply@example.com",
  // },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // starts the SMTP server at localhost:7777
      // config.env.EMAIL_SERVER_PORT = 7777;
      // config.env.EMAIL_SERVER_HOST = "localhost";

      const port = 7777;
      const mailServer = ms.init(port);
      // [receiver email]: email text
      let lastEmail: Record<string, string> = {};

      // process all emails
      mailServer.bind((addr, id, email) => {
        // store the email by the receiver email
        if (!email.receivers) return;
        const emailto = Object.keys(email.receivers)[0];

        lastEmail[emailto] = email.html || email.body;
      });

      on("task", {
        resetEmails(email: string) {
          if (email) {
            delete lastEmail[email];
          } else {
            lastEmail = {};
          }
          return null;
        },

        getLastEmail(email: string) {
          // cy.task cannot return undefined
          // thus we return null as a fallback
          return lastEmail[email] ?? null;
        },
      });

      return config;
    },
    baseUrl: "http://localhost:3000",
  },
});
