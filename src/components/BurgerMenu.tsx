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
      allContentfulNavLink(sort: { createdAt: ASC }) {
        edges {
          node {
            path
            name
          }
        }
      }
    }
  `);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const sideMenu = React.useRef<HTMLDivElement>(null);
  const navLinks = data.allContentfulNavLink.edges;

  function toggleMenu() {
    if (menuOpen !== true) {
      sideMenu?.current?.classList.remove("right-[-250px]");
      sideMenu?.current?.classList.add("right-0");
      setMenuOpen(!menuOpen);
    } else {
      sideMenu?.current?.classList.remove("right-0");
      sideMenu?.current?.classList.add("right-[-250px]");
      setMenuOpen(!menuOpen);
    }
  }

  return (
    <div>
      <span className="text-4xl cursor-pointer" onClick={toggleMenu}>
        &#9776;
      </span>
      <div
        ref={sideMenu}
        id="side-menu"
        className="fixed top-0 right-[-250px] w-[240px] h-screen z-50 bg-slate-800 p-5
      flex flex-col space-y-5 text-white duration-300"
      >
        <span
          className="text-4xl text-right cursor-pointer"
          onClick={() => toggleMenu()}
        >
          &times;
        </span>

        {navLinks.map((link: any) => (
          <Link
            className="transition-all duration-300 hover:text-primary"
            to={link.node.path}
            key={link.node.name}
            onClick={toggleMenu}
          >
            {link.node.name}
          </Link>
        ))}
        {data.allContentfulPage.edges.map((link: DynamicLinkType) => (
          <Link
            className="hover:text-primary"
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
