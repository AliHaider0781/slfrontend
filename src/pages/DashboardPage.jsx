import { Globe, Link2, TrendingUp, Calendar } from "lucide-react";
import { useLink } from "../hooks/useLink";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";

function DashboardPage() {
  const [newLink, setNewLink] = useState("");
  const [inputLink, setInputLink] = useState("");

  const { links } = useLink();

  const { getToken } = useAuth();

  const formattedLinks = links.map(({ id, url, code, created_at }) => ({
    id,
    url,
    code,
    createdAt: created_at,
  }));

  const setInput = () => {
    setInputLink(newLink);
  };

  const postEndpoint = "http://127.0.0.1:8001/links";

  useEffect(() => {
    const createNewLink = async (url) => {
      try {
        const token = await getToken();
        const response = await fetch(postEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ url: url }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Sucess:", data);
        setNewLink("");
      } catch (e) {
        console.error("Error:", e);
      }
    };
    createNewLink(inputLink);
  }, [inputLink, getToken]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-full px-6 py-2 flex flex-col justify-center gap-6">
        <div className="w-full px-8 py-6 bg-(--white) flex flex-col justify-center items-start gap-4 border-[3px] border-(--teal) rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-(--text-black)">
            Shorten a Link
          </h1>
          <div className="flex gap-5 justify-start items-center">
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Enter your long URl here..."
              className="text-(--text-black) border-2 border-(--border-gray) bg-(--white) w-175 px-5 py-2 text-lg rounded-lg placeholder:text-(--text-black)/70 focus:outline-none"
            />

            <button
              onClick={setInput}
              className="bg-(--teal) text-(--white) px-5 py-3 rounded-lg font-semibold transition duration-300 hover:bg-(--teal)/60"
            >
              Shorten Link
            </button>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col justify-center items-start gap-2 w-full border-2 border-(--border-gray) rounded-md px-4 py-6 shadow-lg">
            <h1 className="text-lg font-medium">Total Clicks</h1>
            <p className="text-2xl font-semibold">1,524</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 w-full border-2 border-(--border-gray) rounded-md px-4 py-6 shadow-lg">
            <h1 className="text-lg font-medium">Active Links</h1>
            <p className="text-2xl font-semibold">45</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-2 w-full border-2 border-(--border-gray) rounded-md px-4 py-6 shadow-lg">
            <h1 className="text-lg font-medium">Top Performing Link</h1>
            <p className="text-2xl font-semibold">/promo-sale</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <table className="w-full border-separate border-spacing-0 border-2 rounded-md overflow-hidden border-(--border-gray) shadow-lg">
            <thead>
              <tr>
                <th
                  colSpan={4}
                  className="p-4 text-left border-b-2 border-(--border-gray) text-2xl"
                >
                  Recent Links
                </th>
              </tr>
              <tr className="bg-(--bg-nav)">
                <th className="p-3 text-left border-b-2 border-(--border-gray)">
                  <div className="flex items-center gap-2 ">
                    <Globe />
                    Original Link
                  </div>
                </th>
                <th className="p-3 text-left border-b-2 border-(--border-gray)">
                  <div className="flex items-center gap-2 ">
                    <Link2 />
                    Short Link
                  </div>
                </th>
                <th className="p-3 text-left border-b-2 border-(--border-gray)">
                  <div className="flex items-center gap-2 ">
                    <TrendingUp />
                    Clicks
                  </div>
                </th>
                <th className="p-3 text-left border-b-2 border-(--border-gray)">
                  <div className="flex items-center gap-2 ">
                    <Calendar />
                    Created Date
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {formattedLinks.length > 0 ? (
                formattedLinks
                  .slice(-5)
                  .reverse()
                  .map(({ id, url, code, createdAt }) => (
                    <tr key={id} className="group">
                      <td className="p-3 text-left border-b-2 border-(--border-gray) group-last:border-b-0 underline">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </td>
                      <td className="p-3 text-left border-b-2 border-(--border-gray) group-last:border-b-0 text-(--teal) underline">
                        <a
                          href={`https://shortly.com/${code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://shortly.com/{code}
                        </a>
                      </td>
                      <td className="p-3 text-left border-b-2 border-(--border-gray) group-last:border-b-0">
                        {code}
                      </td>
                      <td className="p-3 text-left border-b-2 border-(--border-gray) group-last:border-b-0">
                        {createdAt}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-(--slate-gray)"
                  >
                    No links yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="font-semibold text-sm text-center underline">
            <a href="/links">View more links {">"}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
