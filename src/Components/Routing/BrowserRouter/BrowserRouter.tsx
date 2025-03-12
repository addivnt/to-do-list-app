import React, {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

type ContextValues = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};

const RouterContext: Context<Partial<ContextValues>> = createContext({});

function BrowserRouter({ children }: PropsWithChildren) {
  const [url, setUrl] = useState(globalThis.location.href);

  useEffect(() => {
    // When back and forth buttons are clicked, grab url and set pathname context to url pathname,
    // re-rendering the routes and enabling them to check if the pathname context === their 'path' prop
    const pageChangeHandler = (e: PopStateEvent) => {
      if (e.state) {
        const url = globalThis.location.href;
        setUrl(url);
      }
    };

    // add 'popstate' event listener (back forth button clicks), triggering 'pageChangeHandler' function
    globalThis.addEventListener("popstate", pageChangeHandler);
    return () => globalThis.removeEventListener("popstate", pageChangeHandler);
  }, []);

  return (
    <RouterContext.Provider value={{ url, setUrl }}>
      {children}
    </RouterContext.Provider>
  );
}

export default BrowserRouter;
export { RouterContext };
