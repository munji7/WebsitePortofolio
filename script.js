// ===================== HAMBURGER MENU =====================
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// ===================== LIGHTBOX =====================
const profilePic = document.getElementById("profilePic");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

if (profilePic && lightbox && lightboxImg) {
  profilePic.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = profilePic.src;

    lightbox.classList.remove("fade-out");
    lightboxImg.classList.remove("fade-out");
    lightboxImg.style.animation = "zoomIn 0.4s ease";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.add("fade-out");
      lightboxImg.classList.add("fade-out");
      setTimeout(() => (lightbox.style.display = "none"), 400);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("fade-out");
      lightboxImg.classList.add("fade-out");
      setTimeout(() => {
        lightbox.style.display = "none";
        lightbox.classList.remove("fade-out");
        lightboxImg.classList.remove("fade-out");
      }, 400);
    });
  }
}

// ===================== SCROLL REVEAL =====================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else if (!el.classList.contains('hero')) {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('load', () => {
  document.querySelector('.hero')?.classList.add('active');
  revealOnScroll();
});
window.addEventListener('scroll', revealOnScroll);

// ===================== AUTO EXPAND TEXTAREA =====================
const textarea = document.querySelector(".contact form textarea");
if (textarea) {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
  });
}

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });

    mobileMenu?.classList.remove('active');
    hamburger?.classList.remove('active');
  });
});

// ===================== ACTIVE MENU HIGHLIGHT =====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a, .mobile-menu a");

function setActiveLink() {
  let current = "";
  const scrollY = window.scrollY + window.innerHeight / 2; // ambil posisi tengah layar

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
document.addEventListener("DOMContentLoaded", setActiveLink);


window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
document.addEventListener("DOMContentLoaded", setActiveLink);


// ===================== BACK TO TOP BUTTON =====================
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 300);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== PROJECT CARDS 3D TILT =====
document.querySelectorAll(".project-card").forEach((card) => {
  let targetRotateX = 0, targetRotateY = 0;
  let currentRotateX = 0, currentRotateY = 0;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetRotateX = ((y - centerY) / centerY) * 20;
    targetRotateY = ((x - centerX) / centerX) * -20;
  });

  card.addEventListener("mouseleave", () => {
    targetRotateX = 0;
    targetRotateY = 0;
  });

  function animate() {
    // smoothing faktor (0.1 makin lambat, 0.2 lebih cepat)
    currentRotateX += (targetRotateX - currentRotateX) * 0.5;
    currentRotateY += (targetRotateY - currentRotateY) * 0.5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${currentRotateX}deg)
      rotateY(${currentRotateY}deg)
      scale(1.05)
    `;

    requestAnimationFrame(animate);
  }
  animate();
});

// ===================== TYPING EFFECT =====================
const typingElement = document.getElementById("typing");
const typingTexts = ["College Students", "Web Developer", "UI/UX Enthusiast", "Game Dev Learner"];
let textIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];
  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      return setTimeout(typeEffect, 1500);
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}
document.addEventListener("DOMContentLoaded", typeEffect);

// ===================== PARALLAX BACKGROUND =====================
function updateParallax() {
  document.body.style.backgroundPosition = `center ${window.pageYOffset * -0.02}px`;
}
window.addEventListener('scroll', updateParallax);
window.addEventListener('load', updateParallax);

// ===================== EMAILJS =====================
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('service_r8oq6lk', 'template_57x9vrd', this)
      .then(() => {
        alert('Pesan berhasil dikirim!');
        form.reset();
      })
      .catch(err => alert('Gagal mengirim: ' + JSON.stringify(err)));
  });
}
