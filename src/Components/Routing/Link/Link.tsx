import React, { ReactNode, SyntheticEvent, useContext } from "react";
import { RouterContext } from "../BrowserRouter/BrowserRouter.tsx";

type PropsLayout = {
  children?: ReactNode;
  to: string;
};

function Link({ children, to }: PropsLayout) {
  const { setUrl } = useContext(RouterContext);

  const handleNavigation = (e: SyntheticEvent) => {
    // anchor tags refreshes the page, prevent it from happening
    e.preventDefault();
    // grab url and check if current pathname is the same as the next location,
    // if it is, do nothing (unnecessary to add same state to history)
    // if it is not, push new state (from: current location) and change url to the next location ('to')
    const url = new URL(globalThis.location.href);
    if (url.pathname !== to) {
      const targetUrl = url.origin + to;
      history.pushState({ from: url.href }, "", targetUrl);
      // set pathname context to the next location, re-rendering browserRouter, then routes,
      // enabling them to check if the pathname context and their 'path' prop are the same,
      // and rendering their content if it's the case
      setUrl && setUrl(targetUrl);
    }
  };

  return (
    <a href={to} onClick={handleNavigation}>
      {children}
    </a>
  );
}

export default Link;
