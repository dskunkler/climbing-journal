import { SignInButton, useUser, UserButton } from "@clerk/nextjs";

export const AuthShowcase: React.FC = () => {
  // const { data: sessionData } = useSession();
  const user = useUser();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {!user.isSignedIn && <SignInButton mode="modal">Sign in</SignInButton>}
      {user.isSignedIn && <UserButton />}
    </div>
  );
};
