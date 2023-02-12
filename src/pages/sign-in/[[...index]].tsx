import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <SignIn
    appearance={{
      layout: {
        socialButtonsVariant: "iconButton",
        socialButtonsPlacement: "bottom",
      },
    }}
    path="/sign-in"
    routing="path"
    signUpUrl="/sign-up"
  />
);

export default SignInPage;
