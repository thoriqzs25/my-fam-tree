"use client";

import React, { useEffect, useRef, useState } from "react";
import f3 from "family-chart";
import "family-chart/styles/family-chart.css";
import Auth from "./Auth";

const FamilyTree = ({ data }) => {
  const [currUser, setUser] = useState(null);
  const cont = useRef(null);

  useEffect(() => {
    if (!cont.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const queryName = urlParams.get("name");

    const create = (data) => {
      if (queryName) {
        let index = data.findIndex(
          (person) =>
            person.data["first name"].toLowerCase() === queryName.toLowerCase()
        );

        if (index == -1) {
          index = data.findIndex((person) =>
            person.data["first name"]
              .toLowerCase()
              .includes(queryName.toLowerCase())
          );
        }

        if (index > 0) {
          const person = data.splice(index, 1)[0];
          data.unshift(person);
        }
      }

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
  }, [currUser]);

  return (
    <div className="w-full h-full">
      {currUser === null ? (
        <Auth
          onAuthSuccess={(user) => {
            // console.log("user", user, user.data["first name"]);
            setUser(user);
          }}
          data={data}
        />
      ) : (
        <div
          className="f3 w-full h-full text-white"
          id="FamilyChart"
          ref={cont}
        ></div>
      )}
    </div>
  );
};

export default FamilyTree;
