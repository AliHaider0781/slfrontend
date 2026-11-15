import { SignInButton, SignUpButton } from "@clerk/react";

function OnboardingPage() {
  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-8 py-2.5 bg-(--white) text-(--slate) border-b border-(--border-gray) shadow-xs">
        <a href="/" className="text-2xl font-bold flex gap-1">
          <img
            width="136"
            height="136"
            src="/assets/shortly-logo.png"
            alt="link"
          />
        </a>
        <div className="flex items-center gap-4">
          <SignInButton mode="redirect">
            <button className="px-4 py-2 text-(--slate) font-semibold transition duration-300 hover:text-(--teal)">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <button className="px-4 py-2 text-(--slate) font-semibold transition duration-300 hover:text-(--teal)">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </header>
      <main className="h-screen w-full bg-[url('/assets/hero-bg-main.jpg')] bg-cover bg-center overflow-hidden flex justify-center items-center p-4">
        <div className="flex flex-col gap-8 justify-center items-center bg-(--white) p-12 rounded-md w-2xl border border-(--border-gray) shadow-2xl">
          <div className="flex flex-col gap-6 items-center p-2 m-2 text-center">
            <div className="text-2xl font-bold flex gap-1">
              <img
                width="156"
                height="156"
                src="/assets/shortly-logo.png"
                alt="link"
              />
            </div>
            <h1 className="text-4xl font-extrabold text-(--slate)">
              Simply Your Links. <br /> Amplify Your Reach.
            </h1>
            <p className="text-sm font-medium text-(--slate-gray)">
              Create, track, and manage your shortened URL's with ease.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SignInButton mode="redirect">
              <button className="px-16 py-3.5 border-2 border-(--teal) transition duration-300 rounded-md hover:bg-(--teal) hover:text-(--white) text-(--slate) font-bold">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button className="px-16 py-3.5 border-2 border-(--teal) bg-(--teal) transition duration-300 rounded-md hover:bg-(--white) hover:text-(--slate) text-(--white) font-bold">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OnboardingPage;
