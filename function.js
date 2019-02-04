function drawClock() {
    for(let i = 0; i < document.getElementById('draw-group').children.length; i++) {
      document.getElementById('draw-group').children[i].remove();
    }
    var elem = document.getElementById('draw-group');
    let svgElement = document.getElementById("draw-group").getElementsByTagName("svg");
  
    let HEIGHT = 150;
    let WIDTH = 150;
    // const time = $[number];
    const time = {
      hr: 6,
      min: 40
    };
    
    const SHAPES = {
      circle: {
        radius: null,
        color: null,
        stroke: {
          color: 'transparent',
          width: 5
        }
      },
      lines: {
        height: 0,
        color: '#000',
        width: 2
      }
    };
  
    const offset = 20;
  
    //getting the image for clock face
    let clockFace = document.createElement("IMG");
    clockFace.setAttribute("src","https://firebasestorage.googleapis.com/v0/b/xyzichamp.appspot.com/o/clock.png?alt=media&token=10f0b2e9-ae90-438c-86c8-a860f81edfa1");
    clockFace.style.position = "absolute";
    clockFace.style.zIndex = "1";
    clockFace.style.height = "100%";
    clockFace.style.width = "100%";
    elem.append(clockFace);
  
    SHAPES.circle.radius = 75;
  
    SHAPES.lines.height = (SHAPES.circle.radius - offset);
  
    //creating container height and width
    HEIGHT = ((SHAPES.circle.radius * 2) + offset);
    WIDTH = HEIGHT;
  
    let two = new Two({ width: WIDTH, height: HEIGHT }).appendTo(elem);
    
    // creating hour circle
    let hrCircle = two.makeCircle((WIDTH / 2), (HEIGHT / 2), SHAPES.circle.radius - offset);
    hrCircle.fill = 'transparent';
    hrCircle.linewidth = SHAPES.circle.stroke.width;
    hrCircle.noStroke();
  
    //creating hour line
    let hrHand = two.makeLine((WIDTH / 2), (HEIGHT / 2), (WIDTH / 2), ((SHAPES.circle.radius / 1.35) - offset));
    hrHand.stroke = '#000';
    hrHand.linewidth =  SHAPES.lines.width + 2;
  
    let HOUR = two.makeGroup(hrCircle, hrHand);
  
    // creating hour circle
    let minCircle = two.makeCircle((WIDTH / 2), (HEIGHT / 2), SHAPES.circle.radius - (offset * 2));
    minCircle.fill = 'transparent';
    minCircle.linewidth = SHAPES.circle.stroke.width; 
    minCircle.noStroke();
  
    //creating hour line
    let minHand = two.makeLine((WIDTH / 2), (HEIGHT / 2), (WIDTH / 2), ((SHAPES.circle.radius / 2.35) - offset),);
    minHand.stroke = '#000';
    minHand.linewidth =  SHAPES.lines.width;
  
    //second group
    let MIN = two.makeGroup(minCircle, minHand);
    
    //Setting the time for the animation
    let sTime = eTime = Date.now();
    let ANIM_TIME = 2000;
    if(time.hr > 6) {
      ANIM_TIME +=1000;
    }
    
    //Animating the components here
    two.bind('update', function(frameCount) {
      if (document.querySelector('#'+ HOUR.id) && document.querySelector('#'+ MIN.id)) {
        document.querySelector('#'+ HOUR.id).style.transformOrigin = 'center center';
        document.querySelector('#'+ MIN.id).style.transformOrigin = 'center center';
      }
  
      eTime = Date.now();
      let tDiff = (eTime - sTime);
  
      if(tDiff >= ANIM_TIME){
        tDiff = ANIM_TIME;
        two.pause();
      }
      
      if(tDiff <= ANIM_TIME) {
        let upperValue = 2;
        HOUR.rotation =  (Math.PI / 6) * ((parseInt(time.hr) * tDiff) / ANIM_TIME);
        MIN.rotation =  ((Math.PI / 30) * (((parseInt(time.min) + ((parseInt(time.hr) - 1) * 60)) * tDiff) / ANIM_TIME));
      }
      // MIN.rotation += 1;
      svgElement[0].style.position = "relative";
      svgElement[0].style.zIndex = "2";
    console.log(frameCount);
      
    }).play();
  }
  
  
  
  setTimeout(() => {
    drawClock();
  }, 10);