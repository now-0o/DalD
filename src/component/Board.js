import React, { useState } from "react";
import axios from "axios";
import "./Board.css";

function Board({ setData }) {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [content, setContent] = useState("");

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
      const response = await axios.post("http://localhost:8080/content", {
        typeId: typeValue,
        statusId: statusValue,
        content: contentValue,
      });

      console.log(response.data);
    } catch (error) {
      console.error("등록실패");
    }
  };

  const re_set = () => {
    setType("");
    setStatus("");
    setContent("");
  };

  return (
    <div className="boardWrap">
      <tab>
        <div className="tabBtn normal">일반</div>
        <div className="tabBtn food">음식</div>
        <div className="tabBtn board">해외</div>
      </tab>

      <main>
        <div className="content"></div>
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
