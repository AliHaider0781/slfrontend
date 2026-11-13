import { useState, useEffect } from "react";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key!");
}

function App() {
  const [link, setLink] = useState(null);
  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);

  const addUrl = () => {
    setUrl(link);
    setLink(null);
  };

  useEffect(() => {
    const createLink = async (url) => {
      try {
        const response = await fetch("http://127.0.0.1:8001/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url }),
        });
        if (!response.ok) {
          throw new Error(`Http Error: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        console.error(err);
      }
    };
    createLink(url);
  }, [url]);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Show when="signed-out">
        <div className="h-screen w-full flex flex-col">
          <header className="sticky top-0 z-50 w-full flex justify-between items-center px-8 py-2.5 bg-white text-black border-b border-gray-200 shadow-xs">
            <h1 className="text-2xl font-bold flex gap-1">
              {" "}
              <img
                width="36"
                height="36"
                src="/assets/link-icon.png"
                alt="link"
              />{" "}
              Shortly
            </h1>
            <div className="flex items-center gap-4">
              <SignInButton mode="redirect">
                <button className="px-4 py-2 text-black font-semibold transition duration-300 hover:text-[#4ca5a5]">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="px-4 py-2 text-black font-semibold transition duration-300 hover:text-[#4ca5a5]">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </header>
          <main className="h-screen w-full bg-[url('/assets/hero-bg-main.jpg')] bg-cover bg-center overflow-hidden flex justify-center items-center p-4">
            <div className="flex flex-col gap-8 justify-center items-center bg-white p-12 rounded-md w-2xl border border-gray-200 shadow-2xl">
              <div className="flex flex-col gap-6 items-center p-2 m-2">
                <h2 className="text-3xl font-bold flex gap-1">
                  {" "}
                  <img
                    width="36"
                    height="36"
                    src="/assets/link-icon.png"
                    alt="link"
                  />{" "}
                  Shortly
                </h2>
                <h1 className="text-4xl font-extrabold">
                  Simply Your Links. <br /> Amplify Your Reach.
                </h1>
                <p className="text-sm font-medium text-gray-400">
                  Create, track, and manage your shortened URL's with ease.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <SignInButton mode="redirect">
                  <button className="px-16 py-3.5 border-2 border-[#4ca5a5] transition duration-300 rounded-md hover:bg-[#4ca5a5] hover:text-white text-black font-bold ">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <button className="px-16 py-3.5 border-2 border-[#4ca5a5] bg-[#4ca5a5] transition duration-300 rounded-md hover:bg-white hover:text-black text-white font-bold">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            </div>
          </main>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="min-h-screen flex flex-col">
          <header className="flex justify-between items-center px-8 py-2.5 bg-slate-950">
            <h1 className="text-2xl text-white/80 font-semibold flex gap-1">
              {" "}
              <img
                width="36"
                height="36"
                src="/assets/link-icon.png"
                alt="link"
              />{" "}
              ShortLink
            </h1>
            <div className="flex items-center gap-4">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-slate-500 rounded-md hover:bg-slate-300 text-black font-semibold">
                    Sign In
                  </button>
                </SignInButton>
              </Show>
            </div>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          <main className="h-screen w-full bg-sky-900 text-white/90 overflow-hidden flex justify-center items-center">
            <div className="flex justify-center items-center gap-16">
              <div className="flex flex-col justify-center items-center gap-8 bg-slate-700 rounded-md m-4 p-16">
                <input
                  type="text"
                  value={link === null ? "" : link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://www.example.com"
                  className="px-4 py-2 border-2 rounded-md my-4 bg-slate-400 text-black"
                />
                <button
                  onClick={addUrl}
                  className="p-4 bg-slate-500 rounded-md hover:bg-slate-300 text-black font-semibold"
                >
                  Create Link
                </button>
              </div>
              <div className="flex flex-col justify-center items-center bg-slate-700 rounded-md m-4 p-16 gap-6">
                <h1 className="text-2xl font-bold text-slate-300">
                  Your Links
                </h1>
                {data ? (
                  <p>Success: {JSON.stringify(data)}</p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </main>
        </div>
      </Show>
    </ClerkProvider>
  );
}

export default App;
