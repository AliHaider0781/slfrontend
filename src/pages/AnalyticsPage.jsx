import { useLink } from "../hooks/useLink";

function AnalyticsPage() {
  const { links, isLoading, error } = useLink();

  const formattedLinks = links.map(({ id, url, code, created_at, clicks }) => ({
    id,
    url,
    code,
    createdAt: created_at,
    clicks: clicks,
  }));

  const totalClicks = formattedLinks.reduce(
    (total, link) => total + link.clicks,
    0,
  );

  const topLink =
    formattedLinks.length > 0
      ? formattedLinks.toSorted((a, b) => b.clicks - a.clicks).at(0)
      : null;

  const isObject = (value) => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  };

  return (
    <div className="h-screen w-full m-0">
      <div>
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>
        <div>
          <p>
            {isLoading
              ? "Loading..."
              : error
                ? "Unable to load analytics"
                : totalClicks}
          </p>
          <p className="text-2xl font-semibold">
            {isLoading
              ? "Loading..."
              : error
                ? "Unable to load analytics"
                : isObject(topLink)
                  ? `${topLink.clicks} /${topLink.code}`
                  : "No Links Yet"}
          </p>
        </div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export default AnalyticsPage;
