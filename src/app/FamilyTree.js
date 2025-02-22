"use client";

import React, { useEffect, useRef } from "react";
import f3 from "family-chart";
import "family-chart/styles/family-chart.css";
import data from "../data.json"

const FamilyTree = () => {
  const cont = useRef(null);

  useEffect(() => {
    if (!cont.current) return;

    const create = (data) => {
      const f3Chart = f3
        .createChart("#FamilyChart", data)
        .setTransitionTime(1000)
        .setCardXSpacing(250)
        .setCardYSpacing(150)
        .setOrientationVertical()
        .setSingleParentEmptyCard(true, { label: "ADD" });

      const f3Card = f3Chart
        .setCard(f3.CardHtml)
        .setCardDisplay([["first name", "last name"], ["birthday"]])
        .setCardDim({})
        .setMiniTree(true)
        .setStyle("imageRect")
        .setOnHoverPathToMain();

      const f3EditTree = f3Chart
        .editTree()
        .fixed(true)
        .setFields(["first name", "last name", "birthday", "avatar"])
        .setEditFirst(false);

      f3Card.setOnCardClick((e, d) => {
        // f3EditTree.open(d);
        if (f3EditTree.isAddingRelative()) return;
        f3Card.onCardClickDefault(e, d);
      });

      f3Chart.updateTree({ initial: true });
      // f3EditTree.open(f3Chart.getMainDatum());

      f3Chart.updateTree({ initial: true });
    };

    create(data);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="f3 w-full h-full text-white" id="FamilyChart" ref={cont}></div>
    </div>
  );
};

export default FamilyTree;
