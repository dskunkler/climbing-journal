import { SignInButton, useUser, UserButton } from "@clerk/nextjs";

export const AuthShowcase: React.FC = () => {
  // const { data: sessionData } = useSession();
  const user = useUser();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {!user.isSignedIn && (
        <SignInButton mode="modal">
          <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            Sign in
          </button>
        </SignInButton>
      )}
      {user.isSignedIn && <UserButton />}
    </div>
  );
};
