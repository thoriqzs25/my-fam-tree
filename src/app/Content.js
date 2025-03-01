"use client";

import { useRef, useState } from "react";
import Header from "./Header";
import FamilyTree from "./FamilyTree";

const Content = ({ data }) => {
  const [circleStyle, setStyle] = useState(false);

  const cardRef = useRef(null);

  const changeStyle = (isCircle) => {
    // if (cardRef.current) {
    //   cardRef.current.setOnCardClick(null);

    //   cardRef.current.setOnCardClick((e, d) => {
    //     const style = isCircle ? "imageCircle" : "imageRect";
    //     cardRef.current.setStyle(style);

    //     cardRef.current.onCardClickDefault(e, d);
    //   });
    // }

    setStyle(isCircle);
  };

  return (
    <>
      <Header isCircle={circleStyle} setCircle={changeStyle} />
      <FamilyTree data={data} isCircle={circleStyle} cardRef={cardRef} />
    </>
  );
};

export default Content;
