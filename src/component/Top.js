import React from "react";
import axios from "axios";
import "./Top.css";

function Top({
  setSearch,
  handleFilterChange,
  filter,
  select,
  setSelect,
  selectedContentIds,
  setSelectedContentIds,
  setItem,
}) {
  const deleteContent = async () => {
    if (selectedContentIds.length === 0) {
      alert("삭제할 컨텐츠를 선택해주세요!");
      return;
    }
    try {
      const host =
        window.location.hostname === "localhost"
          ? "http://3.34.220.192:8080"
          : "api";

      const response = await axios.delete(`${host}/content`, {
        data: { ids: selectedContentIds },
      });

      if (response.data.success) {
        setItem(response.data);
      }
    } catch (error) {
      console.error("데이터 삭제 실패", error);
    }
  };
  return (
    <div className="headerWrap">
      <header>
        <div className="logoBox">
          <img src="/imgs/logo.png" alt="logo" className="logo" />
        </div>
        <div className="searchBox">
          <input
            type="text"
            id="search"
            name="search"
            className="search"
            placeholder="검색어를 입력하세요"
            autoComplete="off"
            onKeyUp={(event) => setSearch(event.target.value)}
          />
          <button name="filterBtn" className="filterBtn">
            필터
          </button>
        </div>
        <div className="topBtn">
          <div
            className={`select ${select ? "clicked" : ""}`}
            onClick={() => setSelect(!select)}
          >
            {select ? "취소" : "선택"}
          </div>
          <div className="delBtn" onClick={deleteContent}>
            삭제
          </div>
        </div>
        <div className="filterBox">
          <div className="filterCon">
            <label for="s10">수배중</label>
            <input
              id="s10"
              type="checkbox"
              checked={filter.s10}
              onChange={() => handleFilterChange("s10")}
            />
          </div>
          <div className="filterCon">
            <label for="s20">섭외중</label>
            <input
              id="s20"
              type="checkbox"
              checked={filter.s20}
              onChange={() => handleFilterChange("s20")}
            />
          </div>
          <div className="filterCon">
            <label for="s30">헌팅.촬영가능</label>
            <input
              id="s30"
              type="checkbox"
              checked={filter.s30}
              onChange={() => handleFilterChange("s30")}
            />
          </div>
          <div className="filterCon">
            <label for="s40">거절</label>
            <input
              id="s40"
              type="checkbox"
              checked={filter.s40}
              onChange={() => handleFilterChange("s40")}
            />
          </div>
          <div className="filterCon">
            <label for="s50">기타</label>
            <input
              id="s50"
              type="checkbox"
              checked={filter.s50}
              onChange={() => handleFilterChange("s50")}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Top;
