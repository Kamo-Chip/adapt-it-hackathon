import SideNav from "@/components/side-nav";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-screen`}>
      <div className="absolute top-4 right-4 cursor-pointer">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <div className="flex-none w-56">
        <SideNav />
      </div>

      <div className="pt-8 px-10 flex-grow p-6 overflow-y-auto">{children}</div>
    </div>
  );
}

export default Layout;
