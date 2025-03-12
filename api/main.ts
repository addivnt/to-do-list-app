import { getList, parseFromFile } from "./utils/utils.ts";
import { ListType as List } from "./dataTypes.ts";

const handler = async (req: Request) => {
  const url = new URL(req.url);
  const listRoute = new URLPattern({
    pathname: "/lists/:id",
  });
  const addListRoute = new URLPattern({ pathname: "/lists" });
  const headers = new Headers();
  headers.set("content-type", "application/json");
  headers.set("access-control-allow-origin", "http://localhost:5173");

  if (req.method === "GET" && (addListRoute.test(url) || listRoute.test(url))) {
    const lists: List[] = await parseFromFile("api/data.json");
    const list = listRoute.test(url) && getList(url, listRoute, lists);
    return new Response(list ? JSON.stringify(list) : JSON.stringify(lists), {
      status: 200,
      headers,
    });
  }

  if (req.method === "OPTIONS") {
    const headers = new Headers();
    headers.set("access-control-allow-origin", "http://localhost:5173");
    headers.set("access-control-allow-Methods", "POST, PATCH, DELETE");
    headers.set("access-control-allow-Headers", "content-type");
    return new Response(null, { status: 204, headers });
  }

  if (req.method === "POST" && addListRoute.test(url)) {
    const body: Pick<List, "title"> = await req.json();

    if (!body.title) {
      return new Response("Bad request", { status: 400 });
    }

    const lists: List[] = await parseFromFile("api/data.json");
    const newList: List = {
      id: !lists.length ? lists.length : lists[lists.length - 1].id + 1,
      ...body,
      content: [],
    };
    lists.push(newList);

    await Deno.writeTextFile("api/data.json", JSON.stringify(lists));
    return new Response(JSON.stringify(newList), {
      status: 201,
      headers,
    });
  }

  if (req.method === "PATCH" && listRoute.test(url)) {
    const body: Omit<Partial<List>, "id"> = await req.json();
    console.log("PATCH: ", body);

    if (!body || Object.hasOwn(body, "id")) {
      return new Response("Bad request", { status: 400 });
    }

    const lists: List[] = await parseFromFile("api/data.json");
    const list = getList(url, listRoute, lists);

    if (list) {
      let updatedList: List;

      if (
        body.content?.length === 1 &&
        Object.hasOwn(body.content[0], "name") &&
        !Object.hasOwn(body.content[0], "id")
      ) {
        updatedList = {
          ...list,
          content: [
            ...list.content,
            {
              id: !list.content.length
                ? list.content.length
                : list.content[list.content.length - 1].id + 1,
              name: body.content[0].name,
              checked: false,
            },
          ],
        };
      } else {
        updatedList = { ...list, ...body };
      }

      const updatedLists = lists.reduce(
        (acc: List[], elem) =>
          elem.id === updatedList.id
            ? acc.concat(updatedList)
            : acc.concat(elem),
        []
      );

      await Deno.writeTextFile("api/data.json", JSON.stringify(updatedLists));
      return new Response(JSON.stringify(updatedList), {
        status: 201,
        headers,
      });
    }
  }

  if (req.method === "DELETE" && listRoute.test(url)) {
    const lists: List[] = await parseFromFile("api/data.json");

    if (req.headers.has("content-type")) {
      const body = await req.json();
      console.log("DELETE:", body);
      const list = getList(url, listRoute, lists);

      if (!list) {
        return new Response("Not found", { status: 404 });
      }

      const updatedContent = list.content.filter(elem => elem.id !== body.id);
      const updatedList: List = { ...list, content: updatedContent };
      const updatedLists = lists.reduce(
        (acc: List[], elem) =>
          elem.id === list?.id ? acc.concat(updatedList) : acc.concat(elem),
        []
      );

      await Deno.writeTextFile("api/data.json", JSON.stringify(updatedLists));
    } else {
      const updatedLists = lists.filter(
        list => list.id !== Number(listRoute.exec(url)?.pathname.groups.id)
      );

      await Deno.writeTextFile("api/data.json", JSON.stringify(updatedLists));
    }

    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "http://localhost:5173",
      },
    });
  }

  return new Response("Not found", { status: 404 });
};

Deno.serve(handler);
