"use client"

import { useState } from "react"
import Header from "./Header"
import FamilyTree from "./FamilyTree"

const Content = ({data}) => {
  const [imgStyle, setStyle] = useState("imageRect")

  return (
      <main classname="flex-col justify-center items-center w-full h-[100vh]">
        <Header onStyleChange={setStyle} />
        <FamilyTree data={data} imagestyle={imgStyle} />
      </main>

  )
}

export default Content