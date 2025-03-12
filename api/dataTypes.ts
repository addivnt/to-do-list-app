export type ListItemType = {
  id: number;
  name: string;
  checked: boolean;
};

export type ListType = {
  id: number;
  title: string;
  content: ListItemType[];
};
