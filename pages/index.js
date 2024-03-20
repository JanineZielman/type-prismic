import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";

const Index = ({ page}) => {
  function createCanvas(){
    new p5(s1);
  }
  return (
    <Layout
    >
      <div className="container">
        <h1>{page.data.title}</h1>
        <button onClick={createCanvas}>+</button>
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
