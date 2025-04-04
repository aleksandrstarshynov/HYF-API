'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const WALKING_CAT_URL = "http://www.anniemation.com/clip_art/images/cat-walk.gif";
const DANCING_CAT_URL = 'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {

      img.style.left = `${startPos}px`;
      let currentLeftPosition = startPos;
      
      function step() {
        if (currentLeftPosition >= stopPos) {
          resolve(); 
          return;
        }
      
        currentLeftPosition += STEP_SIZE_PX;
        img.style.left = `${currentLeftPosition}px`;
      
        setTimeout(step, STEP_INTERVAL_MS);
      }      
step();
  });
}

function dance(img) {
    return new Promise((resolve) => {
      img.src = DANCING_CAT_URL; 
  
      setTimeout(() => {
        img.src = WALKING_CAT_URL; 
        resolve(); 
      }, DANCE_TIME_MS);
    });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  async function loop() {
    while (true) {
      await walk(img, startPos, centerPos); 
      await dance(img);                     
      await walk(img, centerPos, stopPos);  
    }
  }

  loop(); 
}

window.addEventListener('load', catWalk);