import React, { ReactNode, useContext } from "react";
import { RouterContext } from "../BrowserRouter/BrowserRouter.tsx";

type PropsLayout = {
  children?: ReactNode;
  path: string;
};

function Route({ children, path }: PropsLayout) {
  const { url } = useContext(RouterContext);
  const pattern = new URLPattern({
    pathname: path,
  });

  if (url) {
    const currUrl = new URL(url);
    if (pattern.test(currUrl)) {
      //   const id = pattern.exec(currUrl).pathname.groups.id;
      return <main>{children}</main>;
    }
    return path === currUrl.pathname && <main>{children}</main>;
  }
}

export default Route;
