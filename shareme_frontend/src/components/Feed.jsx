import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);

    //  for fetching selected category data
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      //  for fetching all category data
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        // console.log(pins);
        setLoading(false);
      });
    }
  }, [categoryId]);
  // console.log(pins);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins?.length) return <h1>No Pins Available</h1>;
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
