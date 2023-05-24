import React from "react";
import "../App.css";
import { useEffect, useState } from "react";
import { instance } from "../App";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import PostMap from "../components/PostMap";
function Travel() {
  const [data, setData] = useState();
  const [filtered, setFiltered] = useState();
  const getData = async () => {
    const res = await instance.get(`/Post`);
    setData(res.data.data);
    setFiltered(
      data &&
        data.filter((el) => {
          if (el.type === "Travel") {
            return el;
          }
        })
    );
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div>
        <div style={{ border: "0.5px solid black" }}>
          <Header />
        </div>
        {filtered &&
          filtered.map((el) => {
            return <PostMap key={Math.random()} value={el} />;
          })}
      </div>

      <Footer />
    </div>
  );
}

export default Travel;
