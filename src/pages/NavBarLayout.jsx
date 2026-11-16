import { Outlet, NavLink } from "react-router-dom";
import { UserButton, Show, useUser } from "@clerk/react";
import { LayoutDashboard, Link, BarChart3 } from "lucide-react";
import OnboardingPage from "./OnboardingPage";

function NavBarLayout() {
  const linkStyles = `
  flex justify-start items-center gap-2 w-full rounded-lg text-lg font-medium text-(--text-black) transition duration-300 py-3 px-6
  hover:text-(--teal) 
  aria-[current=page]:bg-(--teal) aria-[current=page]:text-(--white) aria-[current=page]:hover:text-(--white) aria-[current=page]:py-3 aria-[current=page]:px-6
`;
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return;
  }

  return (
    <>
      <Show when="signed-out">
        <OnboardingPage />
      </Show>
      <Show when="signed-in">
        <div
          className="h-screen w-full flex overflow-hidden"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <aside className="h-screen flex flex-col w-70 justify-start items-start px-8 py-2.5 bg-(--bg-nav) text-(--slate)">
            <div className="flex flex-col justify-center items-start gap-12 text-center">
              <a href="/" className="text-2xl font-bold flex gap-1">
                <img
                  width="146"
                  height="96"
                  src="/assets/shortly-logo.png"
                  alt="link"
                />
              </a>
              <nav className="flex flex-col justify-center items-start gap-6">
                <NavLink to="/dashboard" end className={linkStyles}>
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </NavLink>
                <NavLink to="/links" className={linkStyles}>
                  <Link className="w-5 h-5" />
                  My Links
                </NavLink>
                <NavLink to="/analytics" className={linkStyles}>
                  <BarChart3 className="w-5 h-5" />
                  Analytics
                </NavLink>
              </nav>
            </div>
          </aside>
          <main className="w-full flex flex-col items-center gap-8 border-l border-(--border-gray) shadow-xl overflow-y-auto overflow-x-hidden">
            <header className="sticky top-0 bg-(--teal) text-(--white) z-50 w-full flex justify-between items-center px-8 py-2.5 border-b border-(--border-gray) shadow-xs">
              <h1 className="text-xl font-semibold">
                Welcome back, {user.fullName}!
              </h1>
              <UserButton />
            </header>
            <div className="w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </Show>
    </>
  );
}

export default NavBarLayout;
