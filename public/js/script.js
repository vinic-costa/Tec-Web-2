document.addEventListener("DOMContentLoaded", function() {
  const carouselContainer = document.querySelector(".carousel-container");
  const carouselstart = document.querySelector("body");
  const carouselTrack = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const indicatorsContainer = document.querySelector(".carousel-indicators");

  const totalImages = 9; // Total de imagens disponíveis
  const imagesInView = 3; // Número de imagens visíveis
  let currentIndex = 0;
  let autoSlideInterval;

  // Inicializa o carrossel
  function initCarousel() {
      // Limpa o conteúdo existente
      carouselTrack.innerHTML = "";
      // Adiciona as imagens iniciais ao carrossel
      for (let i = 0; i < imagesInView; i++) {
          const imageIndex = i % totalImages; // Garante que o índice permaneça dentro do intervalo total
          const image = document.createElement("img");
          image.src = `./img/produto${imageIndex + 1}.jpg`; // Nomes das imagens: produto1.jpg, produto2.jpg, ...
          image.alt = `Produto ${imageIndex + 1}`;
          carouselTrack.appendChild(image);
      }
      // Atualiza o carrossel
      updateCarousel();
      // Inicia o slide automático
      startAutoSlide();
  }

  // Atualiza os indicadores de posição
  function updateIndicators() {
      indicatorsContainer.innerHTML = "";
      for (let i = currentIndex; i < currentIndex + imagesInView; i++) {
          const index = i % totalImages; // Garante que o índice permaneça dentro do intervalo total
          const indicator = document.createElement("div");
          indicator.classList.add("indicator");
          if (i === currentIndex) {
              indicator.classList.add("active");
          }
          indicator.addEventListener("click", () => {
              currentIndex = index;
              updateCarousel();
          });
          indicatorsContainer.appendChild(indicator);
      }
  }

  // Atualiza o carrossel com base no índice atual
  function updateCarousel() {
      carouselTrack.innerHTML = "";
      for (let i = currentIndex; i < currentIndex + imagesInView; i++) {
          const index = i % totalImages; // Garante que o índice permaneça dentro do intervalo total
          const image = document.createElement("img");
          image.src = `./img/produto${index + 1}.jpg`; // Nomes das imagens: produto1.jpg, produto2.jpg, ...
          image.alt = `Produto ${index + 1}`;
          carouselTrack.appendChild(image);
      }
      updateIndicators();
  }

  // Move para a imagem anterior
  function prevImage() {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
  }

  // Move para a próxima imagem
  function nextImage() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
  }

  // Adiciona eventos de clique aos botões de controle
  prevButton.addEventListener("click", prevImage);
  nextButton.addEventListener("click", nextImage);

  // Inicia o slide automático
  function startAutoSlide() {
      autoSlideInterval = setInterval(nextImage, 2000); // 2 segundos
  }

  // Para o slide automático
  function stopAutoSlide() {
      clearInterval(autoSlideInterval);
  }

  // Adiciona eventos de mouse ao container do carrossel
  carouselContainer.addEventListener("mouseenter", stopAutoSlide);
  carouselContainer.addEventListener("mouseleave", startAutoSlide);
  carouselstart.addEventListener("mouseenter", startAutoSlide);

  // Inicializa o carrossel
  initCarousel();
});

const slider = document.querySelector(".testimonial-slider");
const testimonials = document.querySelectorAll(".testimonial");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots-container");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval;

//* event listeners

function initApp() {
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchend", handleTouchEnd);
slider.addEventListener("mouseover", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);
nextBtn.addEventListener("click", nextTestimonial);
prevBtn.addEventListener("click", prevTestimonial);
}

//* auto slide

function startAutoSlide() {
autoSlideInterval = setInterval(nextTestimonial, 5000); // 5s
}

function stopAutoSlide() {
clearInterval(autoSlideInterval);
}

//* touch navigation

function handleTouchStart(event) {
touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
touchEndX = event.changedTouches[0].clientX;

handleTouchSwipe();
}

function handleTouchSwipe() {
const swipeThreshold = 50; // swipe sensitivity

if (touchStartX - touchEndX > swipeThreshold) {
  nextTestimonial(); // swipe left
} else if (touchEndX - touchStartX > swipeThreshold) {
  prevTestimonial(); // swipe right
}
}

//* dot navigation

function renderDotButtons() {
for (let i = 0; i < testimonials.length; i++) {
  const button = document.createElement("button");
  button.classList.add("dot");
  button.classList.toggle("active", i === currentIndex);
  button.ariaLabel = `Jump to Testimonial ${i + 1}`;
  button.addEventListener("click", () => showTestimonial(i));
  dotsContainer.appendChild(button);
}
}

//* slide functions

function showTestimonial(index) {
currentIndex = index;

// update slide position
testimonials.forEach((testimonial) => {
  testimonial.style.transform = `translateX(${-index * 100}%)`;
});

// update active dot
const dots = document.querySelectorAll(".dot");
dots.forEach((dot, i) => {
  dot.classList.toggle("active", i === currentIndex);
});
}

function nextTestimonial() {
const nextIndex = (currentIndex + 1) % testimonials.length;
showTestimonial(nextIndex);
}

function prevTestimonial() {
const prevIndex =
  (currentIndex - 1 + testimonials.length) % testimonials.length;
showTestimonial(prevIndex);
}

//* initialize

document.addEventListener("DOMContentLoaded", function () {
renderDotButtons();
startAutoSlide();
initApp();
});


$(function(){
// IPad/IPhone
	var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
	ua = navigator.userAgent,

	gestureStart = function () {viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";},

	scaleFix = function () {
		if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
			viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
			document.addEventListener("gesturestart", gestureStart, false);
		}
	};
	
	scaleFix();
	// Menu Android
	if(window.orientation!=undefined){
  var regM = /ipod|ipad|iphone/gi,
   result = ua.match(regM)
  if(!result) {
   $('.sf-menu li').each(function(){
    if($(">ul", this)[0]){
     $(">a", this).toggle(
      function(){
       return false;
      },
      function(){
       window.location.href = $(this).attr("href");
      }
     );
    } 
   })
  }
 }
});
var ua=navigator.userAgent.toLocaleLowerCase(),
 regV = /ipod|ipad|iphone/gi,
 result = ua.match(regV),
 userScale="";
if(!result){
 userScale=",user-scalable=0"
}
document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0'+userScale+'">')