import { type SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "devops-sst",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
          NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL!,
          EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER!,
          EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD!,
          EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST!,
          EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT!,
          EMAIL_FROM: process.env.EMAIL_FROM!,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
