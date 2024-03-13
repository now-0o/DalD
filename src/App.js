import "./App.css";
import React, { useEffect, useState } from "react";
import Top from "./component/Top.js";
import Board from "./component/Board.js";
import axios from "axios";

function App() {
  const [item, setItem] = useState();
  const [select, setSelect] = useState();
  const [typeId, setTypeId] = useState(10);
  const [search, setSearch] = useState(10);
  const [filter, setFilter] = useState({
    s10: false,
    s20: false,
    s30: false,
    s40: false,
    s50: false,
  });
  const [selectedContentIds, setSelectedContentIds] = useState([]);

  const host =
    window.location.hostname === "localhost"
      ? "http://3.34.220.192:8080"
      : "api";

  const handleFilterChange = (checkboxName) => {
    setFilter((prevValues) => ({
      ...prevValues,
      [checkboxName]: !prevValues[checkboxName],
    }));
  };

  useEffect(() => {
    const searchItems = async () => {
      try {
        const response = await axios.get(
          `${host}/content/search?content=${search}`
        );

        if (response.data.success) {
          setItem(response.data);
        }
      } catch (error) {
        console.error("검색 실패", error);
      }
    };

    searchItems();
  }, [search]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(`${host}/content`);

        if (response.data.success) {
          setItem(response.data);
        }
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
      }
    };

    getItems();
  }, []);

  return (
    <div className="App">
      <Top
        setItem={setItem}
        setSearch={setSearch}
        handleFilterChange={handleFilterChange}
        filter={filter}
        select={select}
        setSelect={setSelect}
        selectedContentIds={selectedContentIds}
        setSelectedContentIds={setSelectedContentIds}
      />
      <Board
        setItem={setItem}
        item={item}
        typeId={typeId}
        setTypeId={setTypeId}
        select={select}
        selectedContentIds={selectedContentIds}
        setSelectedContentIds={setSelectedContentIds}
      />
    </div>
  );
}

export default App;
