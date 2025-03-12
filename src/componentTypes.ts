import { ListType, ListItemType } from "../api/dataTypes.ts";

export interface ListPropTypes {
  list: ListType;
  setData: React.Dispatch<React.SetStateAction<[] | ListType[]>>;
}

export interface ListHeaderPropTypes extends NewItemInputPropTypes {
  listTitle: string;
}

export interface ListContentPropTypes {
  item: ListItemType;
  handleCheck: (listItemID: number) => void;
  handleDelete: (itemId?: number) => void;
}

export interface AddListButtonPropTypes {
  setData: React.Dispatch<React.SetStateAction<[] | ListType[]>>;
}

export interface NewItemInputPropTypes {
  handleSubmit: (
    input: HTMLInputElement,
    keyboardCode: string,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  saveInput: (
    element: HTMLInputElement | null,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}
