import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Trending.css"
import SingleContent from '../../SingleContent/SingleContent'
import CustomPagination from '../../Pagination/CustomPagination'

const Trending = () => {

  const [content, setContent] = useState([]);
  const[page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=bdf3b75c62cf63e652eafc182d56b724&page=${page}`
    );
    
    setContent(data.results)
  }

  useEffect(() => {
    fetchTrending();
  },[page]);

  return (
    <div>
      <div className="page-title">Trending</div>
      <div className="trending">
        {content &&
          content.map((curr) => {
            return (
              <SingleContent
                key={curr.id}
                id={curr.id}
                title={curr.title || curr.name}
                poster={curr.poster_path}
                date={curr.first_air_date || curr.release_date}
                media={curr.media_type}
                vote_avg={(curr.vote_average).toFixed(1)}
              />
            );
          })}
      </div>
      <CustomPagination setPage={setPage}/>
    </div>
  );
}

export default Trending