import { useAuth } from "@clerk/react";
import { createContext, useState, useEffect } from "react";

export const LinkContext = createContext();

export function LinkProvider({ children }) {
  const [links, setLinks] = useState([]);
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const getLinks = async () => {
      if (!isSignedIn) {
        setLinks([]);
        setIsLoading(false);
        return;
      }
      try {
        setError(null);
        setIsLoading(true);

        const token = await getToken();
        if (!token) {
          throw new Error("Token does not exist!");
        }
        const response = await fetch("http://127.0.0.1:8001/links", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const linkData = await response.json();
        const enrichedLinks = await Promise.all(
          linkData.map(async ({ id, url, code, created_at }) => {
            const getStats = async () => {
              const response = await fetch(
                `http://127.0.0.1:8001/stats/${code}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const clickData = await response.json();
              return clickData;
            };
            const clickObject = await getStats();
            const clickCount = clickObject.length;
            const newLink = {
              id: id,
              url: url,
              code: code,
              created_at: created_at,
              clicks: clickCount,
            };
            return newLink;
          }),
        );
        return setLinks(enrichedLinks);
      } catch (error) {
        setError(error);
        console.error(`Error: Unable to fetch link data!, ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getLinks();
  }, [getToken, isLoaded, isSignedIn, refreshKey]);

  return (
    <LinkContext.Provider value={{ links, isLoading, error, refresh }}>
      {children}
    </LinkContext.Provider>
  );
}
