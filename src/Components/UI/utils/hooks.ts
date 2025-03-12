import { Dispatch, SetStateAction } from "react";
import { ListType } from "../../../../api/dataTypes.ts";

const useFilterSort = (
  dispatch: Dispatch<SetStateAction<[] | ListType[]>>,
  filterId: number,
  concatArg: ListType
) => {
  dispatch(prev =>
    prev
      .filter(elem => elem.id !== filterId)
      .concat(concatArg)
      .sort((a, b) => a.id - b.id)
  );
};

export { useFilterSort };
