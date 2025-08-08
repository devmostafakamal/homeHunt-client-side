import React from "react";
import Banner from "./Banner";
import Advertisement from "./Advertisement";
import LatestReviews from "./LatestReviews";
import FeaturedAgents from "./FeaturedAgents ";
import TipsForBuyersSellers from "./TipsForBuyersSellers";

function Home() {
  return (
    <div>
      <Banner></Banner>
      <Advertisement></Advertisement>
      <LatestReviews></LatestReviews>
      <FeaturedAgents></FeaturedAgents>
      <TipsForBuyersSellers></TipsForBuyersSellers>
    </div>
  );
}

export default Home;
