"use client";

import { useState } from "react";
import Header from "./Header";
import FamilyTree from "./FamilyTree";

const Content = ({ data }) => {
  const [circleStyle, setStyle] = useState(false);

  return (
    <>
      <Header isCircle={circleStyle} setCircle={setStyle} />
      <FamilyTree data={data} isCircle={circleStyle} />
    </>
  );
};

export default Content;
