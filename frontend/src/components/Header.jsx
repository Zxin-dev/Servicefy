import { motion as m } from "framer-motion";
import Logo from "./Logo";
import Post from "./Post";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { headerLinks } from "./header/headerLinks";

const style = {
  deedSign: {
    fontWeight: "bolder",
    marginRight: "20px",
    paddingTop: "5px",
    cursor: "pointer",
  },
  logo: {
    marginRight: "20px",
    marginTop: "5px",
    width: "5vw",
    height: "5vh",
  },
  deed: {
    width: "100vw",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    display: "flex",
    height: "4vh",
  },
  helper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  search: {
    height: "4vh",
    width: "15vw",
    marginRight: "20px",
    paddingLeft: "20px",
  },
  button: {
    border: "none",
  },
};
export const Header = () => {
  const [createDisplay, setCreateDisplay] = useState({
    display: "none",
    isDisplay: false,
  });
  const createItem = () => {
    if (createDisplay.isDisplay === false) {
      setCreateDisplay({ display: "inline", isDisplay: true });
    } else {
      setCreateDisplay({ display: "none", isDisplay: false });
    }
  };
  const navigate = useNavigate();
  const searchItem = useRef();
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        navigate(
          `/${JSON.parse(localStorage.getItem("user_id"))}/${
            searchItem.current.value
          }`
        );
        searchItem.current.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div style={style.deed}>
        <div style={style.logo}>
          <Logo />
        </div>
        <div style={style.helper}>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <div style={style.deedSign}>Sign In</div>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/Register"
          >
            <div style={style.deedSign}>Sign Up</div>
          </Link>
          <div style={style.deedSign} onClick={createItem}>
            Create Post
          </div>

          <input
            onKeyDown={handleKeyDown}
            ref={searchItem}
            type="search"
            style={style.search}
            placeholder="Search"
          />
        </div>
      </div>
      <div
        className="w-screen justify-center items-center flex bg-white gap-4 h-[6vh]"
        style={style.dood}
      >
        {headerLinks.map((link) => (
          <Link
            to={link.to}
            className={
              "no-underline text-xl cursor-pointer px-2 py-1 rounded hover:bg-slate-500 transition-colors duration-300 text-black"
            }
          >
            <m.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              className="hover:text-white"
            >
              {link.label}
            </m.div>
          </Link>
        ))}
      </div>
      <Post value={createDisplay.display} />
    </div>
  );
};
