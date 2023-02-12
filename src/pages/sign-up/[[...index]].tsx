import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp
    appearance={{
      layout: {
        socialButtonsVariant: "iconButton",
        socialButtonsPlacement: "bottom",
      },
    }}
    path="/sign-up"
    routing="path"
    signInUrl="/sign-in"
  />
);

export default SignUpPage;
