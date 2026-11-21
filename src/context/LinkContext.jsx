import { useAuth } from "@clerk/react";
import { createContext, useState, useEffect } from "react";

export const LinkContext = createContext();

export function LinkProvider({ children }) {
  const [links, setLinks] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const getLinks = async () => {
      try {
        const token = await getToken();
        const response = await fetch("http://127.0.0.1:8001/links", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const linkData = await response.json();
        return setLinks(linkData);
      } catch (error) {
        console.error(`Error: Unable to fetch link data!, ${error}`);
      }
    };
    getLinks();
    const interval = setInterval(getLinks, 2000);

    return () => clearInterval(interval);
  }, [getToken]);

  return (
    <LinkContext.Provider value={{ links }}>{children}</LinkContext.Provider>
  );
}
