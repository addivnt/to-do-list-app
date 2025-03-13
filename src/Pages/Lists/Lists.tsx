import React, { useContext } from "react";
import List from "../../Components/UI/List/List.tsx";
import { ListType } from "../../../api/dataTypes.ts";
import "./lists.css";
import AddListButton from "../../Components/UI/AddListButton/AddListButton.tsx";
import { ThemeContext } from "../../App.tsx";

function Lists() {
  const [data, setData] = React.useState<[] | ListType[]>([]);
  const { theme } = useContext(ThemeContext);

  const getListsData = async () => {
    console.log("Fetching data...");
    const res = await fetch("http://localhost:8000/lists", {
      method: "GET",
    });
    const json: ListType[] = await res.json();
    setData(json);
    console.log("Successfully fetched data!");
  };

  React.useEffect(() => {
    getListsData();
  }, []);

  const listElements = data?.map((list: ListType) => {
    return <List key={list.id} list={list} setData={setData} />;
  });

  return (
    <>
      <AddListButton setData={setData} />
      <section className={`lists-container ${theme}`}>{listElements}</section>
    </>
  );
}

export default Lists;
