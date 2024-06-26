let s1 = function(sketch) {

  const squares = [];
  let imageList = [];
  let slider;
  let value = 40;
  let value2 = 40;

  let checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, checkbox6, eraser, fade, gridR, gridAn;

  let gridWidth = 500;
  let gridHeight = 500;

  let move = 0;


  sketch.preload = function() {
    for(let i = 0 ; i < document.getElementsByClassName('img').length; i++){
      let url = document.getElementsByClassName('img')[i].src.split('?')[0];
      imageList[i] = sketch.loadImage(url);      
    }
  }


  sketch.setup = function() {
    if (sketch.select('#width').value() > 0){
      if (sketch.select('#width').value() > 499){
        gridWidth = sketch.select('#width').value();
      }
    }
    if (sketch.select('#height').value() > 0){
      if (sketch.select('#height').value() > 499){
        gridHeight = sketch.select('#height').value();
      }
    }

    sketch.createCanvas(sketch.int(gridWidth) + 50, sketch.int(gridHeight) + 80);
    slider = sketch.createSlider(10, 100);
    slider.position(10 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);
    slider.size(200);
    sketch.angleMode(sketch.DEGREES);


    checkbox1 = sketch.createCheckbox('grid', false);
    checkbox1.position(220 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);

    fade = sketch.createCheckbox('fade', false);
    fade.position(280 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);

    checkbox5 = sketch.createCheckbox('refresh', false);
    checkbox5.position(340 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);

    checkbox2 = sketch.createCheckbox('spin', false);
    checkbox2.position(10 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    checkbox6 = sketch.createCheckbox('rotate', false);
    checkbox6.position(65 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    checkbox3 = sketch.createCheckbox('colors', false);
    checkbox3.position(135 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    checkbox4 = sketch.createCheckbox('random', false);
    checkbox4.position(205 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    gridR = sketch.createCheckbox('grid R', false);
    gridR.position(300 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    gridAn = sketch.createCheckbox('grid An', false);
    gridAn.position(370 + sketch.canvas.offsetLeft, 35 + sketch.canvas.offsetTop);

    eraser = sketch.createCheckbox('eraser', false);
    eraser.position(470 + sketch.canvas.offsetLeft, 10 + sketch.canvas.offsetTop);
    
    sketch.background(255);

    
    for (let i = 10; i < gridWidth; i += value) {
      for (let j = 80; j < gridHeight + 50; j += value) {
        let sq = new Square(i, j, value, value2);
        squares.push(sq);
      }
    }
    
    slider.input(() => {
      value = slider.value();
      squares.length = 0;
      for (let i = 10; i < gridWidth; i += value) {
        for (let j = 80; j < gridHeight + 50; j += value) {
          let sq = new Square(i, j, value, value2);
          squares.push(sq);
        }
      }
    });
    
  }

  sketch.draw = function() {
    for (let sq of squares) {
      sq.display();
    }
  }

  sketch.mouseDragged = function() {
    for (let sq of squares) {
      sq.checkMouse();
    }
  }

  sketch.keyPressed = function() {
    if (sketch.keyCode === 32) {
      // var image = sketch.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      // window.location.href=image;
      // console.log(image)
      sketch.saveGif('mySketch', 5);
    }
  }

  class Square {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }

    display() {
      sketch.fill(255,255,255,10);

      if (checkbox1.checked()) {
        if (checkbox5.checked()) {
          sketch.fill(255,255,255);
          sketch.stroke(0);
        } else {
          if (fade.checked()) {
            sketch.fill(255,255,255,10);
          } else {
            sketch.fill(255,255,255,0);
          }
          sketch.stroke(0);
        }
      } else {
        if (checkbox5.checked()) {
          sketch.fill(255,255,255);
          sketch.noStroke();
        } else {
          if (fade.checked()) {
            sketch.fill(255,255,255,10);
          } else {
            sketch.fill(255,255,255,0);
          }
          sketch.noStroke();
        }
      }
      
      
     
      sketch.push();
      sketch.translate(this.x + this.size/2, this.y + this.size/2);
      if (gridR.checked()) {
        sketch.rotate(45);
      }
      if (gridAn.checked()) {
        sketch.rotate(move);
      }

      move = move + 0.01;
     
      sketch.rectMode(sketch.CENTER);
      sketch.rect(0,0, this.size, this.size);
      sketch.pop();
      if(this.color == 80){
        sketch.push();
          sketch.translate(this.x + this.size/2,this.y + this.size/2);
          sketch.imageMode(sketch.CENTER);
          sketch.rectMode(sketch.CENTER);
          sketch.angleMode(sketch.DEGREES);  
          sketch.noStroke();
        
          if (this.colors && !this.eraser) {
            sketch.fill(100+ this.r, 50, 50+this.b);
            if (this.random && !this.eraser){
              sketch.push();
                if (this.gridR) {
                  sketch.rotate(45);
                } 
                if (gridAn){
                  sketch.rotate(move);
                }
                if (this.spin && !this.eraser) {
                  sketch.rotate(sketch.random(360));
                } else {
                  if (this.rotates && !this.eraser) {
                    sketch.rotate(this.rotate * 45);
                  } else {
                    sketch.rotate(0);
                  }
        
                }
                sketch.fill(sketch.random(255),sketch.random(255),sketch.random(255));
                sketch.ellipse(0,0,sketch.random(5,this.size), sketch.random(5,this.size));
              sketch.pop();
            } else {
              sketch.push();
                if (this.gridR) {
                  sketch.rotate(45);
                }
                if (this.gridAn) {
                  sketch.rotate(move);
                }
                if (this.spin && !this.eraser) {
                  sketch.rotate(sketch.random(360));
                } else {
                  if (this.rotates && !this.eraser) {
                    sketch.rotate(this.rotate * 45);
                  } else {
                    sketch.rotate(0);
                  }
        
                }
                sketch.rect(0,0,this.r/10, this.size);
              sketch.pop();
            }
            
          } else{
            if (this.random && !this.eraser){
              sketch.push();
                sketch.fill(0);
                if (this.gridR) {
                  sketch.rotate(45);
                }
                if (this.gridAn) {
                  sketch.rotate(move);
                }
                if (this.spin && !this.eraser) {
                  sketch.rotate(sketch.random(360));
                } else {
                  if (this.rotates && !this.eraser) {
                    sketch.rotate(this.rotate * 45);
                  } else {
                    sketch.rotate(0);
                  }
        
                }
                sketch.ellipse(0,0,sketch.random(5,50), sketch.random(5,50));
              sketch.pop();
            } else {
              sketch.push();
                if (this.gridR) {
                  sketch.rotate(45);
                }
                if (this.gridAn) {
                  sketch.rotate(move);
                }
                if (this.spin && !this.eraser) {
                  sketch.rotate(sketch.random(360));
                } else {
                  if (this.rotates && !this.eraser) {
                    sketch.rotate(this.rotate * 45);
                  } else {
                    sketch.rotate(0);
                  }
        
                }
                sketch.imageMode(sketch.CENTER);
                sketch.image(this.current, 0,0, this.size, this.size);
              sketch.pop();
            }
          }
          
          if(this.eraser){
            sketch.fill(255);
            sketch.rotate(0);
            sketch.noStroke();
            sketch.rect(0,0,this.size,this.size);
          }
        
        sketch.pop();
      }
    }

    checkMouse() {
      if (sketch.mouseX >= this.x && sketch.mouseX <= this.x + this.size && sketch.mouseY >= this.y && sketch.mouseY <= this.y + this.size) {
        this.color = 80;
        this.rotate = sketch.int(sketch.random(8));
        this.r = sketch.random(255);
        this.g = sketch.random(255);
        this.b = sketch.random(255);

        this.random = checkbox4.checked();
        this.colors = checkbox3.checked();
        this.rotates = checkbox6.checked();
        this.spin = checkbox2.checked();
        this.eraser = eraser.checked();

        this.gridR = gridR.checked();
        this.gridAn = gridAn.checked();

        let keyboardList = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77]
        let imageChange = imageList[0];

        for (let i = 0; i < imageList.length; i++) {
          if ( sketch.keyIsDown(keyboardList[i]) ) {
            imageChange = imageList[i] 
          } else {
            this.current =  imageList[0]
          }
        }

        this.current = imageChange;

      }
    }

  }

};

new p5(s1);