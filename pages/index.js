import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";


const Index = ({ page}) => {
  function createCanvas(){
    new p5(s1);
  }

  return (
    <Layout
    >
      <div className="container">
        <h1>{page.data.title}</h1>
        <div className="var">
          <label htmlFor="width">width:</label>
          <input type="number" id="width" name="width" min="500"/>
          <label htmlFor="height">height:</label>
          <input type="number" id="height" name="height" min="500"/>
        </div>
        <button onClick={createCanvas}>+</button>
        <div className="images">
          {page.data.images.map((item, i) =>{
            return(
              <PrismicNextImage className="img" alt={item.image.alt} key={`img${i}`} field={item.image}/>
            )
          })}
        </div>
        {/* <div className="output"></div> */}
      </div>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home");


  return {
    props: {
      page
    },
  };
}
