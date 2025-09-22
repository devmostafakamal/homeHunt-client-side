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
      <div className="max-w-[1402px] mx-auto">
        <Advertisement></Advertisement>
        <LatestReviews></LatestReviews>
        <FeaturedAgents></FeaturedAgents>
        <TipsForBuyersSellers></TipsForBuyersSellers>
      </div>
    </div>
  );
}

export default Home;
