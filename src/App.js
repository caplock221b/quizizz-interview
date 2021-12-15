import React, { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import InputBox from "./components/InputBox";

const App = () => {
  const [list, setList] = useState([]);

  const onInputSubmit = (value) => {
    const listItems = value.split(",").map((item) => parseInt(item.trim()));
    setList(listItems);
  };

  // useEffect(() => {
  //   console.log("List has changed");
  //   console.log(list);
  // }, [list]);

  return (
    <div className="layout">
      <h1>Move 1 of 50</h1>
      <InputBox onSubmit={onInputSubmit} />
      <Canvas items={list} />
    </div>
  );
};

export default App;
