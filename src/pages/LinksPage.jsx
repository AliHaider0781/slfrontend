import { Globe, Link2, TrendingUp, Calendar } from "lucide-react";
import { useLink } from "../hooks/useLink";

function LinksPage() {
  const { links } = useLink();

  const formattedLinks = links.map(({ id, url, code, created_at, clicks }) => ({
    id,
    url,
    code,
    createdAt: created_at,
    clicks: clicks,
  }));

  return (
    <div className="flex flex-col m-6 items-center gap-8">
      <table className="w-full border-separate border-spacing-0 border-2 rounded-md overflow-hidden border-(--border-gray) shadow-lg">
        <thead>
          <tr>
            <th
              colSpan={4}
              className="p-4 text-left border-b-2 border-(--border-gray) text-2xl"
            >
              All Links
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
              .reverse()
              .map(({ id, url, code, createdAt, clicks }) => (
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
                    {clicks}
                  </td>
                  <td className="p-3 text-left border-b-2 border-(--border-gray) group-last:border-b-0">
                    {createdAt}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={4} className="p-6 text-center text-(--slate-gray)">
                No links yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default LinksPage;
