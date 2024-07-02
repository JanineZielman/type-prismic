import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useState } from "react";

const Index = ({ page}) => {

  const [animate, setAnimate] = useState(false);
  const [sizeW, setSizeW] = useState();

  useEffect(() => {
    checkGrid();
    setSizeW(document.body.clientWidth);
  });
  
  
  function toggleEraser(){
    document.getElementById('eraser').classList.toggle("activeEraser");
  }

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
      if (document.getElementById('eraser')?.classList.contains('activeEraser')){
        $(this).css({'backgroundImage': ``});
      } else {
        if (document.getElementById('custom').className.includes('active')){
          $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /></svg>');
        } else {
          $(this).css({'backgroundImage': `url(${document.getElementsByClassName("active")[0].src})`});
          if (document.getElementById('start_animate').classList.contains('activeOption')){
            $(this).addClass("animate-current");
          }
          if (document.getElementById('start_rotate').classList.contains('activeOption')){
            $(this).addClass("rotate-current");
          }
        }
      }
     
    });

    $('.grid').mouseup(function(){
      pressedDown = false;
    });
    
    $('.grid').mouseover(function(){
      if(pressedDown) {
        if (document.getElementById('eraser')?.classList.contains('activeEraser')){
          $(this).css({'backgroundImage': ``});
        } else {
          if (document.getElementById('custom').className.includes('active')){
            // $(this).html('<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /><ellipse class="ani" cx="25" cy="25" rx="25" ry="25" fill="blue" /></svg>');
          } else {
            $(this).css({'backgroundImage': `url(${document.getElementsByClassName("active")[0].src})`});
            if (document.getElementById('start_animate').classList.contains('activeOption')){
              $(this).addClass( "animate-current");
            }
            if (document.getElementById('start_rotate').classList.contains('activeOption')){
              $(this).addClass( "rotate-current");
            }
          }
        }
      }
    });
  }

  function addGrid(){
    $('#wrapper').empty();
    let container = document.createElement('div');  
    let idVal = document.createAttribute('class');
    idVal.value = 'container';
    container.setAttributeNode(idVal);     
    document.getElementById('wrapper').appendChild(container);
    // console.log(document.body.clientWidth/document.getElementById('slider-width').value)
    for(let i = 0; i < (document.getElementById('slider-width').value); i++) {
      for(let j = 0; j < (document.getElementById('slider-height').value); j++) {
        let div = document.createElement('button');
        let attr = document.createAttribute('class');
        attr.value = 'grid';
        div.setAttributeNode(attr);
        div.style.width =  sizeW / document.getElementById('slider-width').value + 'px'; 
        div.style.height =  sizeW /document.getElementById('slider-height').value + 'px';
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

      for(let i = 0; i < (document.getElementById('slider-width').value); i++) {
        for(let j = 0; j < (document.getElementById('slider-height').value); j++) {
          let div = document.createElement('button');
          let attr = document.createAttribute('class');
          attr.value = 'grid';
          div.setAttributeNode(attr);
          div.style.width =   sizeW / document.getElementById('slider-width').value + 'px'; 
          div.style.height =   sizeW / document.getElementById('slider-height').value + 'px';
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

  function printPDF(){
    let amount = document.getElementsByClassName('container').length
    let fit = Math.round(document.body.clientWidth / 500)
    let width = fit * 500;
    let height = Math.ceil(amount/fit) * 500
    if (fit > amount){
      width = amount * 500
      height = 500;
    }
    document.head.innerHTML += `<style>
    @page{size: ${width}px ${height}px;}
    </style>`;
    window.print();
  }

  function toggleMenu() {
    document.getElementById("fixed").classList.toggle("activeToggle");
  }

  useEffect(() => {
    setInterval(() => {
      for(let j = 0; j < document.getElementsByClassName('ani').length; j++) {
        document.getElementsByClassName('ani')[j].setAttribute("fill", '#' + Math.floor(Math.random()*16777215).toString(16))
        document.getElementsByClassName('ani')[j].setAttribute("rx", Math.floor(Math.random()* 25))
        document.getElementsByClassName('ani')[j].setAttribute("ry", Math.floor(Math.random()* 25))
      }
    }, 500);
  }, [])

  function rotateStart(event){
    event.target.classList.add('activeOption');
    document.getElementById('stop_rotate').classList.remove('activeOption');
  }

  function rotateStop(event){
    event.target.classList.add('activeOption');
    document.getElementById('start_rotate').classList.remove('activeOption');
  }

  function rotatePause(event){
    event.target.classList.toggle('activeOption');
  }

  function randomStart(event){
    event.target.classList.add('activeOption');
    document.getElementById('stop_random').classList.remove('activeOption');
    randomSize();
  }


  function randomSize(){
    for(let j = 0; j < document.getElementsByClassName('animate-current').length; j++) {
      let random = Math.floor(Math.random() * 150 + 1) + '%';
      document.getElementsByClassName('animate-current')[j].style.backgroundSize = random;
    }
  }


  function randomAnimate(){
    document.getElementById('start_animate').classList.toggle('activeOption');
    document.getElementById('stop_random').classList.remove('activeOption');
    if (animate == true){
      setAnimate(false);
    } else {    
      setAnimate(true);
    }
  }

  let randomInterval;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (animate == true){
        randomInterval = setInterval(randomSize(), 100);
      } else {    
        randomInterval = null;
        clearInterval(randomInterval);
      }
    }, 500)
    return () => clearInterval(intervalId);
  }, [animate])


  function randomStop(event){
    setAnimate(false);
    document.getElementById('start_animate').classList.remove('activeOption');
    event.target.classList.add('activeOption');
    document.getElementById('start_random').classList.remove('activeOption');
    for(let j = 0; j < document.getElementsByClassName('grid').length; j++) {
      document.getElementsByClassName('grid')[j].style.backgroundSize = 'cover';
    }
  }

  function smoothToggle(){
    document.getElementById('smooth').classList.toggle('activeOption');
    document.getElementById('main').classList.toggle('smooth');
  }

  function cursorToggle(){
    document.getElementById('cursor').classList.toggle('activeOption');
    document.getElementById('main').classList.toggle('no-cursor');
    
  }

  function hoverToggle(){
    document.getElementById('hover').classList.toggle('activeOption');
    document.getElementById('main').classList.toggle('hover');
  }

  function updateSlider(){
    document.getElementById('sw').innerText = document.getElementById('slider-width').value
    document.getElementById('sh').innerText = document.getElementById('slider-height').value
  }

  return (
    <Layout
    >
      <div id="main" className="animate">
        <div className="fixed activeToggle" id="fixed">
          <div id="toggle" onClick={toggleMenu}></div>
          <div className="menu">
            <div className="flex">
              <div className="option" onClick={addGrid}>Add grid</div>
              <div className="option" onClick={addLayer}>Add Layer</div>
            </div>
            <div className="slidecontainer option">
              
              <input type="range" min="0" max="50" step='1' id="slider-width" onChange={updateSlider}/><span className="r-val" id="sw">25</span>
              <input type="range" min="0" max="50" step='1' id="slider-height" onChange={updateSlider}/><span className="r-val" id="sh">25</span>
            </div>
            <div className="hide-grid option" id="hide" onClick={hideGrid}></div>
            <div className="animations">
              rotate
              <div className="flex">
                <div className="option" id="start_rotate" onClick={rotateStart}>Start</div>
                <div className="option" id="pause_rotate" onClick={rotatePause}>Pause</div>
                <div className="option" id="stop_rotate" onClick={rotateStop}>Stop</div>
              </div>
              random
              <div className="flex">
                <div className="option" id="start_random" onClick={randomStart}>Yes</div>
                <div className="option" id="start_animate" onClick={randomAnimate}>Animate</div>
                <div className="option" id="stop_random" onClick={randomStop}>No</div>
              </div>
              other
              <div className="flex">
                <div className="option" id="cursor" onClick={cursorToggle}>Cursor</div>
                <div className="option" id="smooth" onClick={smoothToggle}>Smooth</div>
                {/* <div className="option" id="hover" onClick={hoverToggle}>Hover</div> */}
              </div>
            </div>
            
            <div className="flex small-flex">
              <div className="option" id="eraser" onClick={toggleEraser}>Eraser</div>
              <div className="option" onClick={clearGrid}>Clear all</div>
            </div>
          </div>
          <div className="images" id="images">
            {page.data.images.map((item, i) =>{
              return(
                <PrismicNextImage className={`img ${i == 0 && 'active'}`} alt={""} key={`img${i}`} field={item.image}/>
              )
            })}
            <div className="img" id="custom">
              custom
            </div>
          </div>
          <div className="download option" onClick={printPDF}>download</div>
          <h1>© {page.data.title}</h1>
        </div>

        <div id="wrapper">
        </div>

      

        
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
