import Link from "next/link";
import React from "react";
type categories = "Arts" | "Comics Illustration" | "Design & Tech" | "Film" | "Food & Craft" | "Games" | "Music" | "Publishing"
export const CategoryLinks = () => {
  const categoryMap = {
    "Arts": "arts",
    "Comics Illustration": "comics-illustration",
    "Design & Tech": "design-tech",
    "Film": "film",
    "Food & Craft": "food-craft",
    "Games": "games",
    "Music": "music",
    "Publishing": "publishing"
  }
  let links: JSX.Element[] = []
  let category: categories;
  for(category in categoryMap){
    const href = `/${categoryMap[category]}`
    links.push(<Link className="px-2" key={category} href={href}>{category}</Link>)
  }
  return (
    <section className="flex justify-center">
      {links}
    </section>
  )
}