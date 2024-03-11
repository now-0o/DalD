import "./App.css";
import React, { useEffect, useState } from "react";
import Top from "./component/Top.js";
import Board from "./component/Board.js";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/api")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [data]);

  return (
    <div className="App">
      <Top />
      <Board setData={setData} />
    </div>
  );
}

export default App;
