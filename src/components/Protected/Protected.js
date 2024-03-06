import axios from "axios";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import Header from "../Header/Header";
import SearchBox from "../SearchBox/SearchBox";
import CardList from "../CardList/CardList";
import Navigation from "../Navigation/Navigation";
import { ThemeContext } from "../../App";
import ReactSwitch from "react-switch";

const Protected = () => {
  const [profiles, setProfiles] = useState([]);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);
  const [searchMode, setSearchMode] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/protected", {
        headers: {
          Authorization: token,
        },
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, []);

  useEffect(() => {
    setErr("");
    axios
      .get(`https://api.github.com/users?since=${page}&per_page=12`, {
        headers: {
          Authorization: "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",
        },
      })
      .then((res) => {
        setProfiles((prev) => [...prev, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [profiles]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight + 1 >= scrollHeight && !searchMode) {
      setPage(profiles[profiles.length - 1].id);
    }
  };

  const searchProfile = useCallback(
    (name) => {
      setErr("");
      if (name.trim() === "") {
        setSearchMode(false);
        setPage(1);
        axios
          .get(`https://api.github.com/users?since=${page}&per_page=12`, {
            headers: {
              Authorization: "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",
            },
          })
          .then((res) => {
            setProfiles(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setSearchMode(true);
        axios
          .get(`https://api.github.com/users/${name}`, {
            headers: {
              Authorization: "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",
            },
          })
          .then((res) => {
            const result = [];
            result.push(res.data);
            setProfiles(result);
          })
          .catch((err) => {
            setErr("Couldnt Find User, try again");
            console.log(err);
          });
      }
    },
    [page]
  );

  return (
    <div className="tc" id={theme}>
      <Navigation />
      <div className="switch">
        <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      </div>
      <Header />
      <SearchBox searchProfile={searchProfile} />
      {err && <p className="f3 red db">{err}</p>}
      <CardList profiles={profiles} />
    </div>
  );
};

export default Protected;
