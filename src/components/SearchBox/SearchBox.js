import React, { useState, useEffect, useCallback } from "react";

const SearchBox = ({ searchProfile }) => {
  const [search, setSearch] = useState("");

  const onSubmit = useCallback(() => {
    searchProfile(search);
  }, [search, searchProfile]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        onSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [onSubmit]);

  return (
    <div className="pa2">
      <input
        className="pa3 ba b--green bg-lightest-blue turquoise"
        type="search"
        placeholder="Search GitHubPage"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button
        className="pa3 ba b--green bg-lightest-blue turquoise"
        onClick={onSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
