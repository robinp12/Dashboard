import React from "react";
import ContentLoader from "react-content-loader";

const ThreeDots = (props) => (
  <>
    <h3 className="mt-5 text-secondary">Chargement des données ...</h3>
    <ContentLoader
      viewBox="0 0 400 190"
      height={250}
      width={600}
      speed={1}
      backgroundColor="grey"
      {...props}
    >
      <circle cx="150" cy="86" r="9" />
      <circle cx="194" cy="86" r="9" />
      <circle cx="238" cy="86" r="9" />
    </ContentLoader>
    <br />
  </>
);

ThreeDots.metadata = {
  name: "RioF",
  github: "clariokids",
  description: "Three Dots",
  filename: "ThreeDots",
};

export default ThreeDots;
