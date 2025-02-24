import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";

const Index = () => {
  const [sizeW, setSizeW] = useState();

  const gridWidth = 17;
  const gridHeight = 50;

  useEffect(() => {
    checkGrid();
    setSizeW(document.body.clientWidth * 0.98);
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
        $(this).removeClass("active-draw");
      } else {
        $(this).css({'backgroundImage': `url(${document.getElementsByClassName("active")[0].src})`});
        $(this).addClass("active-draw");
        if (document.getElementById('grow').classList.contains('activeOption')){
          $(this).addClass("grow");
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
          $(this).removeClass("active-draw");
        } else {
          $(this).css({'backgroundImage': `url(${document.getElementsByClassName("active")[0].src})`});
          $(this).addClass("active-draw");
          if (document.getElementById('grow').classList.contains('activeOption')){
            $(this).addClass("grow");
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
    for(let i = 0; i < (gridWidth * 5); i++) {
      for(let j = 0; j < (gridHeight * 5); j++) {
        let div = document.createElement('button');
        let attr = document.createAttribute('class');
        attr.value = 'grid';
        div.setAttributeNode(attr);
        div.style.width =  100 / 17 + 'vw'; 
        div.style.height =  56.25 / 26 + 'vw';
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

      for(let i = 0; i < (gridWidth * 5); i++) {
        for(let j = 0; j < (gridHeight * 5); j++) {
          let div = document.createElement('button');
          let attr = document.createAttribute('class');
          attr.value = 'grid';
          div.setAttributeNode(attr);
          div.style.width =  100 / 17 + 'vw'; 
          div.style.height =  56.25 / 26 + 'vw';
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

  function printPDF() {
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

  function cursorToggle(){
    document.getElementById('cursor').classList.toggle('activeOption');
    document.getElementById('main').classList.toggle('no-cursor');
    
  }
  
  function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }

  function makeVertical(event){
    event.target.classList.add('activeOption');
    document.getElementById('horizontal').classList.remove('activeOption');
    document.getElementById('main').classList.add('vertical')
    document.getElementById('main').classList.remove('horizontal')
  }

  function makeHorizontal(event){
    event.target.classList.add('activeOption');
    document.getElementById('vertical').classList.remove('activeOption');
    document.getElementById('main').classList.add('horizontal')
    document.getElementById('main').classList.remove('vertical')
  }

  function growToggle(){
    event.target.classList.toggle('activeOption');
  }

  function pauseToggle(){
    event.target.classList.toggle('activeOption');
    if (document.getElementById('pause').classList.contains('activeOption')){
      document.querySelectorAll('.grow').forEach(el => {
        el.classList.add("pause");
      });
    } else {
      document.querySelectorAll('.grow').forEach(el => {
        el.classList.remove("pause");
      });
    }
  }

  return (
    <Layout
    >
      <div id="main" className="animate2 horizontal">
        <div className="fixed activeToggle" id="fixed">
          <div id="toggle" onClick={toggleMenu}></div>
          <div className="menu">
            <div className="flex">
            <div className="option activeOption" onClick={makeHorizontal} id="horizontal">Horizontal</div>
            <div className="option" id="vertical" onClick={makeVertical}>Vertical</div>
              
            </div>
            <div className="flex">
              <div className="option" onClick={addGrid}>Add grid</div>
              <div className="option" onClick={addLayer}>Add Layer</div>
            </div>
            <div className="hide-grid option" id="hide" onClick={hideGrid}></div>
            <div className="animations">
              other
              <div className="flex">
                <div className="option" id="cursor" onClick={cursorToggle}>Cursor</div>
                <div className="option activeOption" id="grow" onClick={growToggle}>Bounce</div>
                <div className="option" id="pause" onClick={pauseToggle}>Pause</div>
              </div>
              <div className="flex">
                <div className="option" onClick={openFullscreen}>Open Fullscreen</div>
                <div className="option" onClick={closeFullscreen}>Close Fullscreen</div>
              </div>
            </div>
            
            <div className="flex small-flex">
              <div className="option" id="eraser" onClick={toggleEraser}>Eraser</div>
              <div className="option" onClick={clearGrid}>Clear all</div>
            </div>
          </div>
          <div className="images" id="images">
            <img className={`img active`} alt={""} src="/autostrada/pink.svg"/>
            <img className={`img`} alt={""} src="/autostrada/dblue.svg"/>
            <img className={`img`} alt={""} src="/autostrada/orange.svg"/>
            <img className={`img`} alt={""} src="/autostrada/green.svg"/>
            <img className={`img`} alt={""} src="/autostrada/blue.svg"/>
          </div>
          <div className="download option" onClick={printPDF}>download</div>
        </div>

        <div id="wrapper">
        </div>

      

        
      </div>
    </Layout>
  );
};

export default Index;
