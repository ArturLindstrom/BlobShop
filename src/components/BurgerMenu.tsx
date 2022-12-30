import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { DynamicLinkType } from "../types/linkType";

export default function BurgerMenu() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPage {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `);
  const [menuOpen, setMenuOpen] = React.useState(false);

  function toggleMenu() {
    if (menuOpen !== true) {
      const sideMenu = document.getElementById("side-menu");
      console.log("menu is open");
      sideMenu?.classList.remove("right-[-250px]");
      sideMenu?.classList.add("right-0");
      setMenuOpen(!menuOpen);
    } else {
      const sideMenu = document.getElementById("side-menu");
      sideMenu?.classList.remove("right-0");
      sideMenu?.classList.add("right-[-250px]");
      setMenuOpen(!menuOpen);
    }
  }

  return (
    <div>
      <span className="text-4xl cursor-pointer" onClick={() => toggleMenu()}>
        &#9776;
      </span>
      <div
        id="side-menu"
        className="fixed top-0 right-[-250px] w-[240px] h-screen z-50 bg-gray-700 p-5
      flex flex-col space-y-5 text-white duration-300"
      >
        <span
          className="text-4xl text-right cursor-pointer"
          onClick={() => toggleMenu()}
        >
          &times;
        </span>
        <Link className="hover:text-[#c62368]" to="/">
          Home
        </Link>
        <Link className="hover:text-[#c62368]" to="/projects">
          Projects
        </Link>
        <Link className="hover:text-[#c62368]" to="/contact">
          Contact
        </Link>
        <Link className="hover:text-[#c62368]" to="/about">
          About
        </Link>
        {data.allContentfulPage.edges.map((link: DynamicLinkType) => (
          <Link
            className="hover:text-[#c62368]"
            to={`/${link.node.slug}`}
            key={link.node.slug}
          >
            {link.node.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
