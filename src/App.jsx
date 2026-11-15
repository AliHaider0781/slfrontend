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
  //const [data, setData] = useState(null);

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
        //const responseData = await response.json();
        //setData(responseData);
      } catch (err) {
        console.error(err);
      }
    };
    createLink(url);
  }, [url]);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Show when="signed-out">
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
      </Show>
      <Show when="signed-in">
        <div
          className="h-screen w-full flex overflow-hidden"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <header className="h-screen flex flex-col w-70 justify-start items-start px-8 py-2.5 bg-(--bg-nav) text-(--slate)">
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
                <a
                  href="/"
                  className="text-lg font-medium text-(--text-black) transition duration-300 hover:text-(--teal)"
                >
                  Dashboard
                </a>
                <a
                  href="/links"
                  className="text-lg font-medium text-(--text-black) transition duration-300 hover:text-(--teal)"
                >
                  My Links
                </a>
                <a
                  href="/analytics"
                  className="text-lg font-medium text-(--text-black) transition duration-300 hover:text-(--teal)"
                >
                  Analytics
                </a>
              </nav>
            </div>
          </header>
          <main className="w-full flex flex-col items-center gap-8 border-l border-(--border-gray) shadow-xl overflow-y-auto overflow-x-hidden">
            <div className="w-full flex justify-between items-center px-8 py-2.5 text-(--slate) border-b border-(--border-gray) shadow-xs">
              <h1>Welcome back, Username!</h1>
              <UserButton />
            </div>
            <div className="px-6 py-2 flex flex-col justify-center gap-6">
              <div className="w-full px-8 py-6 bg-(--white) flex flex-col justify-center items-start gap-4 border-[3px] border-(--teal) rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-(--text-black)">
                  Shorten a Link
                </h1>
                <div className="flex gap-5 justify-start items-center">
                  <input
                    type="text"
                    value={link || ""}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter your long URl here..."
                    className="text-(--text-black) border-2 border-(--border-gray) bg-(--white) w-191 px-5 py-2 text-lg rounded-lg placeholder:text-(--text-black)/70 focus:outline-none"
                  />

                  <button
                    onClick={addUrl}
                    className="bg-(--teal) text-(--white) px-5 py-3 rounded-lg font-semibold transition duration-300 hover:bg-(--teal)/60"
                  >
                    Shorten Link
                  </button>
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col justify-center items-start gap-2 w-80 border-2 border-(--border-gray) rounded-md p-6 shadow-lg">
                  <h1>Total Clicks</h1>
                  <p>1,524</p>
                </div>
                <div className="flex flex-col justify-center items-start gap-2 w-80 border-2 border-(--border-gray) rounded-md p-6 shadow-lg">
                  <h1>Active Links</h1>
                  <p>45</p>
                </div>
                <div className="flex flex-col justify-center items-start gap-2 w-80 border-2 border-(--border-gray) rounded-md p-6 shadow-lg">
                  <h1>Top Performing Link</h1>
                  <p>/promo-sale</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-3 text-left bg-[#f4f4f4]">
                        Original Link
                      </th>
                      <th className="border p-3 text-left bg-[#f4f4f4]">
                        Short Link
                      </th>
                      <th className="border p-3 text-left bg-[#f4f4f4]">
                        Clicks
                      </th>
                      <th className="border p-3 text-left bg-[#f4f4f4]">
                        Created Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3 text-left">
                        https://google.com
                      </td>
                      <td className="border p-3 text-left">
                        shortly.com/2gU4h6
                      </td>
                      <td className="border p-3 text-left">300</td>
                      <td className="border p-3 text-left">
                        Jan 21, 2021, 4:08 AM
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border p-3 text-left">
                        https://google.com
                      </td>
                      <td className="border p-3 text-left">
                        shortly.com/2gU4h6
                      </td>
                      <td className="border p-3 text-left">300</td>
                      <td className="border p-3 text-left">
                        Jan 21, 2021, 4:08 AM
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border p-3 text-left">
                        https://google.com
                      </td>
                      <td className="border p-3 text-left">
                        shortly.com/2gU4h6
                      </td>
                      <td className="border p-3 text-left">300</td>
                      <td className="border p-3 text-left">
                        Jan 21, 2021, 4:08 AM
                      </td>
                    </tr>{" "}
                    <tr>
                      <td className="border p-3 text-left">
                        https://google.com
                      </td>
                      <td className="border p-3 text-left">
                        shortly.com/2gU4h6
                      </td>
                      <td className="border p-3 text-left">300</td>
                      <td className="border p-3 text-left">
                        Jan 21, 2021, 4:08 AM
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="font-semibold text-sm text-center">
                  <a href="/links">View more links...</a>
                </p>
              </div>
            </div>
          </main>
        </div>
      </Show>
    </ClerkProvider>
  );
}

export default App;
