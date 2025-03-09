"use client";

import React, { useEffect, useRef, useState } from "react";
import f3 from "family-chart";
import Auth from "./Auth";

const FamilyTree = ({ data, isCircle, cardRef, isHorizontal }) => {
  const [currUser, setUser] = useState(null);

  const cont = useRef(null);
  const chartRef = useRef(null);
  const useAuth = false;

  // const updateStyle = (circle) => {
  //   const cards = document.querySelectorAll(".card-inner");
  //   cards.forEach((card) => {
  //     if (circle) {
  //       card.classList.remove("card-image-rect");
  //       card.classList.add("card-image-circle");
  //     } else {
  //       card.classList.remove("card-image-circle");
  //       card.classList.add("card-image-rect");
  //     }
  //   }); weilerwuoi fsdkuijhsdfj
  // };

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

      data.forEach((person) => {
        if (person.data.avatar && person.data.avatar.startsWith("/photos/")) {
          const img = new Image();
          img.src = person.data.avatar;
          img.onerror = () => {
            person.data.avatar = "";
          };
        }
      });

      const existingChart = document.querySelector("#FamilyChart");
      if (existingChart) {
        existingChart.innerHTML = "";
      }

      const f3Chart = f3
        .createChart("#FamilyChart", data)
        .setTransitionTime(600)
        .setCardXSpacing(250)
        .setCardYSpacing(150)
        .setOrientationHorizontal()
        .setSingleParentEmptyCard(true, { label: "ADD" });

      const imageStyle = isCircle ? "imageCircle" : "imageRect";
      const f3Card = f3Chart
        .setCard(f3.CardHtml)
        .setCardDisplay([["first name", "last name"], ["birthday"]])
        .setCardDim({})
        .setMiniTree(true)
        .setStyle(imageStyle)
        .setOnHoverPathToMain();

      f3Card.setOnCardClick((e, d) => {
        f3Card.onCardClickDefault(e, d);
        // updateStyle(isCircle);
      });

      chartRef.current = f3Chart;
      cardRef.current = f3Card;

      f3Chart.updateTree({ initial: true });
    };

    create(data);
  }, [currUser]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!cardRef.current) return;

    const style = isCircle ? "imageCircle" : "imageRect";
    cardRef.current.setStyle(style);
    chartRef.current.updateTree({});
  }, [isCircle]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (isHorizontal) {
      chartRef.current.setOrientationHorizontal();
    } else {
      chartRef.current.setOrientationVertical();
    }

    chartRef.current.updateTree({});
  }, [isHorizontal]);

  return (
    <div className="w-full h-full">
      {useAuth && currUser === null ? (
        <Auth
          onAuthSuccess={(user) => {
            setUser(user);
          }}
          data={data}
        />
      ) : (
        <div className="f3 w-full h-full" id="FamilyChart" ref={cont}></div>
      )}
    </div>
  );
};

export default FamilyTree;
