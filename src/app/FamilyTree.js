"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import f3 from "family-chart";
import Auth from "./Auth";

const FamilyTree = ({ data, isCircle, cardRef, isHorizontal }) => {
  const [currUser, setUser] = useState(null);
  const [showInstruction, setShowInstruction] = useState(true); // Show initially

  const cont = useRef(null);
  const chartRef = useRef(null);
  const useAuth = true;

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
      });

      chartRef.current = f3Chart;
      cardRef.current = f3Card;

      f3Chart.updateTree({ initial: true });
    };

    create(data);

    // Automatically hide the instruction after 5 seconds
    const timeout = setTimeout(() => {
      setShowInstruction(false);
    }, 5000);

    return () => clearTimeout(timeout);
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
    <div className="relative w-full h-full">
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

      {(!useAuth || currUser !== null) && (
        <AnimatePresence>
          {showInstruction && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute top-64 sm:top-40 m-auto left-0 right-0 w-64 bg-black z-10 text-white justify-center px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-lg whitespace-nowrap"
            >
              <span className="text-xl">🤏</span> Klik/Geser untuk Zoom
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default FamilyTree;
