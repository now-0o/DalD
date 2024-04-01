import "./App.css";
import React, { useEffect, useState } from "react";
import Top from "./component/Top.js";
import Board from "./component/Board.js";
import axios from "axios";

function App() {
  const [item, setItem] = useState();
  const [select, setSelect] = useState();
  const [typeId, setTypeId] = useState(10);
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState({
    s10: false,
    s20: false,
    s30: false,
    s40: false,
    s50: false,
  });
  const [selectedContentIds, setSelectedContentIds] = useState([]);

  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [itemId, setItemId] = useState("");

  const handleFilterChange = (checkboxName) => {
    setFilter((prevValues) => ({
      ...prevValues,
      [checkboxName]: !prevValues[checkboxName],
    }));
  };

  const re_set = () => {
    setType("");
    setStatus("");
    setContent("");
    setItemId("");
  };

  const appearToast = (msg) => {
    const toast = document.getElementsByClassName("toast")[0];
    toast.textContent = msg;
    toast.classList.add("active");
    setTimeout(() => toast.classList.remove("active"), 1200);
  };

  useEffect(() => {
    const searchItems = async () => {
      try {
        const host =
          window.location.hostname === "localhost"
            ? "http://3.34.220.192:8080"
            : "api";

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
        const host =
          window.location.hostname === "localhost"
            ? "http://3.34.220.192:8080"
            : "api";

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
      <div className="toast"></div>
      <Top
        setItem={setItem}
        setSearch={setSearch}
        handleFilterChange={handleFilterChange}
        filter={filter}
        select={select}
        setSelect={setSelect}
        selectedContentIds={selectedContentIds}
        setSelectedContentIds={setSelectedContentIds}
        re_set={re_set}
        appearToast={appearToast}
      />
      <Board
        setItem={setItem}
        item={item}
        typeId={typeId}
        setTypeId={setTypeId}
        select={select}
        selectedContentIds={selectedContentIds}
        setSelectedContentIds={setSelectedContentIds}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        content={content}
        setContent={setContent}
        itemId={itemId}
        setItemId={setItemId}
        re_set={re_set}
        appearToast={appearToast}
      />
    </div>
  );
}

export default App;
