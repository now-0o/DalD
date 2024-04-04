import React, { useState } from "react";
import axios from "axios";
import "./Top.css";
import { ChromePicker } from "react-color";

function Top({
  setSearch,
  select,
  setSelect,
  selectedContentIds,
  setItem,
  re_set,
  appearToast,
  color,
  setColor,
}) {
  const [easterEgg, setEasterEgg] = useState(false);

  const handleChange = (newColor) => {
    setColor(newColor.rgb);

    document.documentElement.style.setProperty(
      "--main",
      `rgba(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}, ${newColor.rgb.a})`
    );
    document.documentElement.style.setProperty(
      "--shadow",
      `rgba(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b}, 0.3)`
    );

    insertColor(newColor.rgb);
  };

  const insertColor = async (rgba) => {
    try {
      const host =
        window.location.hostname === "localhost"
          ? "http://3.34.220.192:8080"
          : "api";

      const response = await axios.post(`${host}/color`, {
        red: rgba.r,
        green: rgba.b,
        blue: rgba.b,
        alpha: rgba.a,
      });

      if (response.success) {
        console.log("색상값 저장 실패");
      }
    } catch (error) {
      console.error("색상값 저장 실패", error);
    }
  };

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
        appearToast("삭제가 완료되었습니다.");
        re_set();
        setSelect(!select);
      }
    } catch (error) {
      console.error("데이터 삭제 실패", error);
    }
  };

  const chkEaster = (e) => {
    if (e.target.value === "진진이야") {
      setEasterEgg(true);
    } else {
      setEasterEgg(false);
      document.querySelector(".chrome-picker").classList.remove("active");
    }
  };

  const onPicker = () => {
    if (easterEgg) {
      document.querySelector(".chrome-picker").classList.toggle("active");
    }
  };

  return (
    <div className="headerWrap">
      <header>
        <div className="logoBox">
          <img
            src="/imgs/logo.png"
            alt="logo"
            className="logo"
            onClick={onPicker}
          />
        </div>
        <div className="searchBox">
          <input
            type="text"
            id="search"
            name="search"
            className="search"
            placeholder="검색어를 입력하세요"
            autoComplete="off"
            onKeyUp={(event) => {
              setSearch(event.target.value);
              chkEaster(event);
            }}
          />
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
        <ChromePicker
          className="colorPicker"
          color={color}
          onChange={handleChange}
        />
      </header>
    </div>
  );
}

export default Top;
