const track = document.getElementById("track");

let position = 0;
let speed = 0.5;

// AUTO SCROLL
function autoScroll() {
  position -= speed;
  track.style.transform = `translateX(${position}px)`;

  if (Math.abs(position) > track.scrollWidth / 2) {
    position = 0;
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();


// DRAG
let isDown = false;
let startX;

const slider = document.getElementById("slider");

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX;
});

slider.addEventListener("mouseup", () => isDown = false);
slider.addEventListener("mouseleave", () => isDown = false);

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  const move = e.pageX - startX;
  position += move * 0.05;
  startX = e.pageX;
});


// EFECTO 3D
document.querySelectorAll(".slider-track img").forEach(img => {
  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 20;
    const rotateX = (y / rect.height - 0.5) * -20;

    img.style.transform = `perspective(800px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.1)`;
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "scale(1)";
  });
});


// SCROLL ANIMATIONS
const elements = document.querySelectorAll('.fade');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('show');
      }, index * 120);
    }
  });
});

elements.forEach(el => observer.observe(el));