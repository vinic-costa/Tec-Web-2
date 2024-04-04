var i = -1;
var images = 
          ['/img/gall_pic2.jpg',
		   '/img/gall_pic3.jpg',
		   '/img/gall_pic1.jpg'];

function nextImg(){
  document.slide.src = images[(++i)%3];
  if (i>=images.length) return true; 
}

function prevImg(){
  document.slide.src = images[(i = i<=0 ? 0 : i-1)%3];
}

window.onload = () => {
  let time = 4000;
  let id_interval = setInterval(() => {
    if(nextImg()) {
      clearInterval(id_interval);
    }
  }, time);
}