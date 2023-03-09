import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';

const Series = () => {

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState()

  const fetchSeries= async() => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=bdf3b75c62cf63e652eafc182d56b724&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    );
    // console.log(data.results)
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    fetchSeries();
  },[page])
  return (
    <div>
      <div className="page-title">Series</div>
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around"}}>
      {
        content && content.map((curr) => {
          return <SingleContent
            key={curr.id}
            id={curr.id}
            title={curr.title || curr.name}
            poster={curr.poster_path}
            date={curr.first_air_date || curr.release_date}
            media="tv"
            vote_avg={curr.vote_average.toFixed(1)}
          />;
        })
      }
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
    </div>
  );
}

export default Series