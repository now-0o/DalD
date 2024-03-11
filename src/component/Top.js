import React from "react";
import "./Top.css";

function Top() {
  return (
    <div className="headerWrap">
      <header>
        <img src="/imgs/logo.png" className="logo" />
        <div className="searchBox">
          <input
            type="text"
            id="search"
            name="search"
            className="search"
            placeholder="검색어를 입력하세요"
            autoComplete="off"
          />
          <button name="filterBtn" className="filterBtn">
            필터
          </button>
        </div>
        <span className="appVersion">Ver 0.1</span>
      </header>
    </div>
  );
}

export default Top;
