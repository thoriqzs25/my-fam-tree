"use client";

import { useRef, useState } from "react";
import Header from "./Header";
import FamilyTree from "./FamilyTree";

const Content = ({ data }) => {
  const [circleStyle, setStyle] = useState(false);
  const [horizontal, setHorizontal] = useState(false);

  const cardRef = useRef(null);

  return (
    <>
      <Header isCircle={circleStyle} setCircle={setStyle} isHorizontal={horizontal} setHorizontal={setHorizontal} />
      <FamilyTree data={data} isCircle={circleStyle} cardRef={cardRef} isHorizontal={horizontal} />
    </>
  );
};

export default Content;
