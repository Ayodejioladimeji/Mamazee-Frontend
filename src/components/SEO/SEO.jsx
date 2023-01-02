import React from "react";
import { Helmet } from "react-helmet";
import image from "./cart.jpg";
import Favicon from "./cart.jpg";

const SEO = ({ title }) => {
  return (
    <Helmet htmlAttributes={{ lang: "en" }} title={`${title} | Mamazee`}>
      <meta
        name="description"
        content="Mamazee is an ecommerce website, where you can buy unisex clothing online"
      />
      <meta name="image" content={image} />
      <link rel="shortcut icon" href={Favicon} />
    </Helmet>
  );
};

export default SEO;
