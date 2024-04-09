import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef } from "react";


const Index = ({ page}) => {

  useEffect(() => {
    checkGrid();
  });

  function checkGrid(){
    var header = document.getElementById("images");
    var btns = header.getElementsByClassName("img");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      });
    }

    var pressedDown = false;
    $(document).on('mousedown', function(){
      pressedDown = true;     // When mouse goes down, set pressedDown to true
    })  
    .mouseup(function() {
      pressedDown = false;    // When mouse goes up, set pressedDown to false
    });
    
    $('.grid').mousedown(function(){
      $(this).css({'backgroundImage': `url(${document.getElementsByClassName("active")[0].src})`});
      
    });

    $('.grid').mouseup(function(){
      pressedDown = false;
    });
    
    $('.grid').mouseover(function(){
      if(pressedDown) {
        $(this).css({'backgroundImage': `url(${document.getElementsByClassName("active")[0].src})`});
      }
    });
  }

  function addGrid(){
    let container = document.createElement('div');  
    let idVal = document.createAttribute('id');
    idVal.value = 'container';
    container.setAttributeNode(idVal);     
    document.body.appendChild(container);
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        let div = document.createElement('button');
        let attr = document.createAttribute('class');
        attr.value = 'grid';
        div.setAttributeNode(attr);     
        container.appendChild(div);
      }
    }
    checkGrid()
  }

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

        <div className="images" id="images">
          {page.data.images.map((item, i) =>{
            return(
              <PrismicNextImage className={`img ${i == 0 && 'active'}`} alt={"type-tool"} key={`img${i}`} field={item.image}/>
            )
          })}
        </div>
        <div className="menu">
          <div onClick={addGrid}>Add</div>
          <div onClick={clearGrid}>Clear</div>
        </div>
        <br/>
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
