import Link from "next/link";
import { useRouter } from "next/router";
import { AuthShowcase } from "./auth-component";

const Navbar = () => {
  const router = useRouter();

  const isActive = (pathname: string) => {
    console.log("~~pathname", router.pathname);
    return router.pathname === pathname
      ? "text-slate-600 text-lg"
      : "text-white";
  };

  return (
    <nav className="bg-climber-purple">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  className={`hover:text-gray-300 ${isActive("/")}`}
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className={`hover:text-gray-300 ${isActive("/history")}`}
                  href="/history"
                >
                  History
                </Link>
                <Link
                  className={`hover:text-gray-300 ${isActive("/about-us")}`}
                  href="/about-us"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
          <AuthShowcase />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
