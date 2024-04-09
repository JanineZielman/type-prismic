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

    document.getElementById('eraser').addEventListener("click", function() {
      document.getElementById('eraser').classList.toggle("active");
    });

    var pressedDown = false;
    $(document).on('mousedown', function(){
      pressedDown = true;     // When mouse goes down, set pressedDown to true
    })  
    .mouseup(function() {
      pressedDown = false;    // When mouse goes up, set pressedDown to false
    });
    
    $('.grid').mousedown(function(){
      if (document.getElementById('eraser').className == 'active'){
        $(this).css({'backgroundImage': ``});
      } else {
        $(this).css({'backgroundImage': `url(${document.getElementsByClassName("active")[0].src})`});
      }
     
    });

    $('.grid').mouseup(function(){
      pressedDown = false;
    });
    
    $('.grid').mouseover(function(){
      if(pressedDown) {
        if (document.getElementById('eraser').className == 'active'){
          $(this).css({'backgroundImage': ``});
        } else {
          $(this).css({'backgroundImage': `url(${document.getElementsByClassName("active")[0].src})`});
        }
      }
    });
  }

  function addGrid(){
    let container = document.createElement('div');  
    let idVal = document.createAttribute('class');
    idVal.value = 'container';
    container.setAttributeNode(idVal);     
    document.getElementById('wrapper').appendChild(container);
    for(let i = 0; i < 50; i++) {
      for(let j = 0; j < 50; j++) {
        let div = document.createElement('button');
        let attr = document.createAttribute('class');
        attr.value = 'grid';
        div.setAttributeNode(attr);
        div.style.width =  document.getElementById('slider-width').value + 'px'; 
        div.style.height =  document.getElementById('slider-height').value + 'px';
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

  function addLayer(){
    let layer = document.createElement('div');  
    let idLayer = document.createAttribute('class');
    idLayer.value = 'layer';
    layer.setAttributeNode(idLayer);
    
    for(let i = 0; i < document.getElementsByClassName('container').length; i++) {
      let container2 = document.createElement('div');  
      let idVal = document.createAttribute('class');
      idVal.value = 'container2';
      container2.setAttributeNode(idVal);  
      layer.appendChild(container2);

      for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
          let div = document.createElement('button');
          let attr = document.createAttribute('class');
          attr.value = 'grid';
          div.setAttributeNode(attr);
          div.style.width =  document.getElementById('slider-width').value + 'px'; 
          div.style.height =  document.getElementById('slider-height').value + 'px';
          container2.appendChild(div);
        }
      }
    }

    document.getElementById('wrapper').appendChild(layer);
      
    checkGrid()
  }

  function hideGrid(){
    document.getElementById('wrapper').classList.toggle('hide');
    document.getElementById('hide').classList.toggle('hide');
  }


  return (
    <Layout
    >
      
        <h1>{page.data.title}</h1>

        <div className="images" id="images">
          {page.data.images.map((item, i) =>{
            return(
              <PrismicNextImage className={`img ${i == 0 && 'active'}`} alt={"type-tool"} key={`img${i}`} field={item.image}/>
            )
          })}
        </div>
        <div className="menu">
          <div onClick={addGrid}>Add grid</div>
          <div onClick={addLayer}>Add Layer</div>
          <div className="hide-grid" id="hide" onClick={hideGrid}></div>
          <div class="slidecontainer">
            <input type="range" min="0" max="100" id="slider-width"/>
            <input type="range" min="0" max="100" id="slider-height"/>
          </div>
          <div id="eraser">Eraser</div>
          <div onClick={clearGrid}>Clear all</div>
        </div>
        <br/>
        <div id="wrapper">
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
