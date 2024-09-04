import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

export default function App() {
  const [users, setUsers] = useState([]); // State to hold the list of users fetched from the API
  const [page, setPage] = useState(1); // State to track the current page
  const [totalPages, setTotalPages] = useState(1); // State to store the total number of pages
  const [perPage, setperPage] = useState(20); // State to track the number of users displayed per page
  const [filter, setFilter] = useState(""); // State to filter users by name

  // Generate an array for pagination based on the total number of pages
  const pagesArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  // Array of options for the number of users displayed per page
  const perPageArray = [5, 10, 15, 20];

  // Fetch data from the API whenever page, perPage, or filter changes
  useEffect(() => {
    fetch(
      "https://rickandmortyapi.com/api/character/" +
        "?page=" +
        page +
        "&name=" +
        filter
    )
      .then((rawResp) => rawResp.json()) // Convert the response to JSON
      .then((finalResp) => {
        setUsers(finalResp.results.slice(0, perPage)); // Set the users for the current page
        setTotalPages(finalResp.info.pages); // Update the total number of pages
      });
  }, [page, perPage, filter]);

  return (
    <div className="container">
      <div className="head">
          <h2 className="title">API Explorer: The Rick and Morty</h2>
        <div className="menu">
          <div className="pages">
            Pages{" "}
            {pagesArray.map(
              (p, i) =>
                ((p >= page - 3 && p <= Number(page) + 3) ||
                  p == 1 ||
                  p == totalPages) && (
                  <>
                    <a
                      className={p == page && "linkUnderline"} // Highlight the current page
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(e.target.innerHTML); // Update the page number on click
                      }}
                      href=""
                      key={i}
                    >
                      {p}
                    </a>
                    {p != totalPages &&
                      (p == Number(page) + 3 || p == 1 ? (
                        <span>...</span> // Display ellipsis if there are many pages
                      ) : (
                        <span>,</span>
                      ))}
                  </>
                )
            )}
          </div>
          <div className="search">
            Search
            <input
              onChange={(e) => {
                setFilter(e.target.value); // Update the filter state
                setPage(1); // Reset to the first page when searching
              }}
              type="text"
              name="Filter"
            />
          </div>
          <div className="perPage">
            Per page
            <select
              value={perPage}
              onChange={(e) => {
                setperPage(Number(e.target.value)); // Update the number of users displayed per page
              }}
            >
              {perPageArray.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid">
        {users.map((user) => (
          <Card user={user} /> // Create a card for each user
        ))}
      </div>
      <div className="footer">
        <div>
          A React.js project to use the useEffect hook and fetching data from an
          API.
        </div>
        <a href="https://rickandmortyapi.com/">www.rickandmortyapi.com</a>
      </div>
    </div>
  );
}
