import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import "./Search.css"
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';

const darkTheme = createTheme({
  palette:{
    mode: "dark",
    primary:{
      main:"#000",
    }
  }
});

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [inputText, setInputText] = useState("");

  const fetchSearch = async() => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${
        type ? "tv" : "movie"
      }?api_key=bdf3b75c62cf63e652eafc182d56b724&language=en-US&query=${inputText}&page=${page}&include_adult=false`
    );
    console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    fetchSearch();
  },[type,page])

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            margin: "15px",
            width: "70%",
            margin: "auto",
          }}
        >
          <TextField
            style={{ flex: 1 }}
            variant="filled"
            label="Search..."
            onChange={(event) => {
              setInputText(event.target.value);
            }}
          />
          <Button
            sx={{ marginLeft: "10px" }}
            variant="contained"
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
      </ThemeProvider>
      <Tabs
        value={type}
        textColor="primary"
        indicatorColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: "20px", marginTop: "10px" }}
      >
        <Tab style={{ width: "50%", fontSize: "16px" }} label="Search Movies" />
        <Tab style={{ width: "50%", fontSize: "16px" }} label="Search Series" />
      </Tabs>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {content &&
          content.map((curr) => {
            return (
              <SingleContent
                key={curr.id}
                id={curr.id}
                title={curr.title || curr.name}
                poster={curr.poster_path}
                date={curr.first_air_date || curr.release_date}
                media={type ? "tv" : "movie"}
                vote_avg={curr.vote_average.toFixed(1)}
              />
            );
          })}
        {inputText &&
          (content.length === 0) &&
          (type ? <h2>No Series Found</h2> : <h2>No Movie Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Search