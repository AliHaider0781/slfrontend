import { createContext, useState, useEffect } from "react";

export const LinkContext = createContext();

export function LinkProvider({ children }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8001/");
        const linkData = await response.json();
        return setLinks(linkData);
      } catch (error) {
        console.error(`Error: Unable to fetch link data!, ${error}`);
      }
    };
    getLinks();
  }, []);

  return (
    <LinkContext.Provider value={{ links }}>{children}</LinkContext.Provider>
  );
}
