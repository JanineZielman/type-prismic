import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect } from "react";


const Index = ({ page}) => {

  useEffect(() => {
    var pressedDown = false;
    $(document).on('mousedown', function(){
      pressedDown = true;     // When mouse goes down, set pressedDown to true
    })  
    .mouseup(function() {
      pressedDown = false;    // When mouse goes up, set pressedDown to false
    });
    
    $('.grid').mousedown(function(){
      $(this).css({'backgroundImage': 'url(/data/SVG/Asset-0.svg)'});
    });
    
    $('.grid').mouseover(function(){
      if(pressedDown) {
        $(this).css({'backgroundImage': 'url(/data/SVG/Asset-0.svg)'});
      }
    });

    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        let div = document.createElement('button');
        let attr = document.createAttribute('class');
        attr.value = 'grid';
        div.setAttributeNode(attr);     
        document.getElementById('container').appendChild(div);
      }
    }

  })


  function clearGrid() {
    let ele = document.getElementsByClassName('grid');
    for(let i = 0; i < ele.length; i++) {
      ele[i].style.backgroundImage = ""; 
    }
  }

  return (
    <Layout
    >
      <div className="container">
        <h1>{page.data.title}</h1>

        <div className="images">
          {page.data.images.map((item, i) =>{
            return(
              <PrismicNextImage className="img" alt={"type-tool"} key={`img${i}`} field={item.image}/>
            )
          })}
        </div>
        <div onClick={clearGrid}>Add</div>
        <div onClick={clearGrid}>Clear</div>
        <br/>
        <br/>
        <div id="container"></div>

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
