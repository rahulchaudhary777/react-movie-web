import React from 'react'
import "./SingleContent.css"
import {img_300, unavailable} from "../Config/Config"
import { Badge } from '@mui/material';

const SingleContent = (props) => {
  return (
    <div className="media">
    <Badge badgeContent={props.vote_avg} color={props.vote_avg>6 ? "primary" : "secondary"}></Badge>
      <img
        className="poster"
        src={props.poster ? `${img_300}/${props.poster}` : unavailable}
        alt={props.title}
      />
      <b className="title">{props.title}</b>
      <span className="subTitle">
        {" "}
        {props.media === "tv" ? "Tv Series" : "movie"}
        <span className="subTitle"> {props.date}</span>
      </span>
    </div>
  );
}

export default SingleContent;