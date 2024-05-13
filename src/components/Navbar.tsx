"use client"
import { styled } from "../../stitches.config";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useKBar } from "kbar";

export default function Navbar() {
  const pathname = usePathname();
  const pages = ["About", "Skills", "Projects", "Setup"];
  const [hovered, setHovered] = useState("");
  const { query } = useKBar();

  return (
    <AnimateSharedLayout>
      <Header>
        <Link href="/" passHref legacyBehavior>
          <ButtonLogo>
            <i className="ri-home-2-line" />
          </ButtonLogo>
        </Link>

        <Nav>
        <List>
          {pages.map((page) => {
            const path = `/${page.toLowerCase()}`;
            const isHovered = hovered === page;

            return (
              <li key={page}>
                <Link href={path} passHref legacyBehavior>
                  <Anchor>
                    <div
                      className={`relative inline-block px-5 uppercase transition-colors duration-200 ease-in-out hover:text-primary text-secondary font-medium text-sm tracking-wider cursor-pointer ${
                        pathname === path ? "text-primary" : ""
                      }`}
                      onMouseEnter={() => setHovered(page)}
                      onMouseLeave={() => setHovered("")}
                    >
                      {isHovered && (
                        <motion.span
                          className="absolute top-[-15px] left-0 right-0 bg-[var(--hover)] p-5 rounded-[var(--borderRadius)] z-[-1]"
                          layoutId="nav"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                      {page}
                    </div>
                  </Anchor>
                </Link>
              </li>
            );
          })}
        </List>
      </Nav>

        <Aside>
          <ButtonHeader
            as="button"
            type="button"
            aria-label="Command"
            onClick={query?.toggle}
            css={{ padding: "0 8px" }}
          >
            <Icon className="ri-command-line" />
          </ButtonHeader>
        </Aside>
      </Header>
    </AnimateSharedLayout>
  );
}

const Header = styled("header", {
  display: "flex",
  alignItems: "center",
  color: "white",
  fontSize: "12px",
  minHeight: "59px",
  width: "100%",
  flexWrap: "wrap",
  position: "absolute",
  top: "0",
  zIndex: 3,
  marginTop: "13px",
  "@bp2": { marginTop: "0" },
});

const List = styled("ul", {
  margin: "0",
  padding: "0",
  listStyle: "none",
  display: "inline-flex",
  position: "relative",
  top: "5px",
  "@bp1": { justifyContent: "space-around" },
});

const ButtonHeader = styled("div", {
  appearance: "none",
  background: "transparent",
  border: "none",
  borderRadius: "$borderRadius",
  color: "white",
  cursor: "pointer",
  height: "34px",
  padding: "0 10px",
  transition: "background $duration ease-in-out",
  "&:hover": { background: "$hover" },
});

const Icon = styled("i", {
  fontSize: "24px",
  lineHeight: "32px",
});

const ButtonLogo = styled(ButtonHeader, {
  display: 'flex',
  alignItems: 'center',
  fontWeight: 700,
  fontSize: "24px",
  textDecoration: "none",
  marginLeft: "12px",
  fontFamily: "$heading",
});

const Nav = styled("nav", {
  textAlign: "center",
  flex: 1,
  order: 2,
  flexBasis: "100%",
  "@bp2": { order: 0, flexBasis: "initial" },
  "@bp3": { overflowX: "scroll", overflowY: "hidden" },
});

const Aside = styled("div", {
  display: "flex",
  alignItems: "center",
  paddingRight: "12px",
  marginLeft: "auto",
});

const Anchor = styled("a", {
  border: 0,
  position: "relative",
  "&:hover, &:focus": { opacity: 1 },
});