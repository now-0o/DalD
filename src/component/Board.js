import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Board.css";

function Board({
  item,
  setItem,
  typeId,
  setTypeId,
  select,
  selectedContentIds,
  setSelectedContentIds,
}) {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");
  const [itemId, setItemId] = useState("");

  const host =
    window.location.hostname === "localhost"
      ? "http://3.34.220.192:8080"
      : "api";

  const toggleSelectedContent = (contentId) => {
    if (select) {
      setSelectedContentIds((prevIds) =>
        prevIds.includes(contentId)
          ? prevIds.filter((id) => id !== contentId)
          : [...prevIds, contentId]
      );
    }
  };

  const setSelectedContentIdsCallback = useCallback(
    (ids) => setSelectedContentIds(ids),
    [setSelectedContentIds]
  );

  useEffect(() => {
    if (!select) {
      const contentDivs = document.querySelectorAll(".content");
      contentDivs.forEach((div) => {
        div.classList.remove("selected");
      });
      setSelectedContentIdsCallback([]);
    }
  }, [select, setSelectedContentIdsCallback]);

  useEffect(() => {
    const insetBtn = document.querySelector(".insert");

    if (itemId !== "") {
      insetBtn.innerHTML = "수정";
      return;
    }

    insetBtn.innerHTML = "등록";
  }, [itemId]);

  const insertCont = async () => {
    const typeValue = document.querySelector('[name="type"]').value;
    const statusValue = document.querySelector('[name="status"]').value;
    const contentValue = document.querySelector('[name="content"]').value;

    if (typeValue === "") {
      alert("구분값을 선택해주세요!");
      return;
    }
    if (statusValue === "") {
      alert("상태값을 선택해주세요!");
      return;
    }
    if (contentValue === "") {
      alert("내용을 입력해주세요!");
      return;
    }

    try {
      if (itemId === "") {
        const response = await axios.post(`${host}/content`, {
          typeId: typeValue,
          statusId: statusValue,
          content: contentValue,
        });

        if (response.data.success) {
          setItem(response.data);
          re_set();
        }
        return;
      }
      const response = await axios.put(`${host}/content`, {
        id: itemId,
        typeId: typeValue,
        statusId: statusValue,
        content: contentValue,
      });

      if (response.data.success) {
        setItem(response.data);
        re_set();
      }
    } catch (error) {
      console.error("등록실패");
    }
  };

  const re_set = () => {
    setType("");
    setStatus("");
    setContent("");
    setItemId("");
  };

  const setInput = (id, type, status, content) => {
    setItemId(id);
    setType(type);
    setStatus(status);
    setContent(content);
  };

  return (
    <div className="boardWrap">
      <div className="tab">
        <div
          className={`tabBtn normal ${typeId === 10 ? "active" : ""}`}
          data-type={10}
          onClick={() => setTypeId(10)}
        >
          일반
        </div>
        <div
          className={`tabBtn food ${typeId === 20 ? "active" : ""}`}
          data-type={20}
          onClick={() => setTypeId(20)}
        >
          음식
        </div>
        <div
          className={`tabBtn board ${typeId === 30 ? "active" : ""}`}
          data-type={30}
          onClick={() => setTypeId(30)}
        >
          해외
        </div>
      </div>

      <main>
        {item &&
          item.data
            .filter((con) => con.typeId === typeId)
            .map((con) => (
              <div
                className={`content ${
                  select
                    ? selectedContentIds.includes(con.id)
                      ? "selected"
                      : ""
                    : ""
                }`}
                key={con.id}
                onClick={() => {
                  setInput(con.id, con.typeId, con.statusId, con.content);
                  toggleSelectedContent(con.id);
                }}
              >
                <div className="contentTop">
                  <span className="conTag" id={"s" + con.statusId}>
                    {con.status.name}
                  </span>
                </div>
                <div className="contentMain">{con.content}</div>
              </div>
            ))}
      </main>

      <form>
        <select
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">구분</option>
          <option value="10">일반</option>
          <option value="20">음식</option>
          <option value="30">해외</option>
        </select>

        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">상태</option>
          <option value="10">수배중</option>
          <option value="20">섭외중</option>
          <option value="30">헌팅.촬영가능</option>
          <option value="40">거절</option>
          <option value="50">기타</option>
        </select>

        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요."
        ></textarea>

        <div className="btnBox">
          <div className="reset" onClick={re_set}>
            초기화
          </div>
          <div className="insert" onClick={insertCont}>
            등록
          </div>
        </div>
      </form>
    </div>
  );
}

export default Board;
