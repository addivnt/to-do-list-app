import { ListType as List } from "../dataTypes.ts";

const parseFromFile = async (filePath: string): Promise<List[]> => {
  const file = await Deno.readTextFile(filePath);
  return JSON.parse(file);
};

const getList = (
  url: URL,
  route: URLPattern,
  listCollection: List[]
): List | undefined => {
  const listId = Number(route.exec(url)?.pathname.groups.id);
  const list = listCollection.find(item => item.id === listId);
  return list;
};

export { parseFromFile, getList };
