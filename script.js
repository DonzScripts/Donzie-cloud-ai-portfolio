const roles = [
  "Cloud + AI Developer",
  "AWS Builder",
  "Prompt Engineer",
  "AI-Assisted Full-Stack Creator"
];

let i = 0;
let j = 0;
let deleting = false;
const speed = 75;

const typedEl = document.getElementById("typed");
const cursorEl = document.querySelector(".cursor");

function typeLoop() {
  if (!typedEl) return;

  const word = roles[i];
  typedEl.textContent = word.substring(0, j);

  if (!deleting && j < word.length) {
    j++;
  } else if (deleting && j > 0) {
    j--;
  } else if (!deleting && j === word.length) {
    deleting = true;
    setTimeout(typeLoop, 1150);
    return;
  } else if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(typeLoop, deleting ? speed * 0.55 : speed);
}

typeLoop();

if (cursorEl) {
  setInterval(() => {
    cursorEl.classList.toggle("hide");
  }, 450);
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const counters = document.querySelectorAll(".num");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = Number(el.getAttribute("data-target"));
        let val = 0;
        const step = Math.max(1, Math.ceil(target / 45));

        const tick = () => {
          val += step;

          if (val >= target) {
            el.textContent = target;
          } else {
            el.textContent = val;
            requestAnimationFrame(tick);
          }
        };

        tick();
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.55 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealEls.forEach((el) => revealObserver.observe(el));

const chip = document.querySelector(".cloud-chip");

if (chip) {
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    chip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
}

const canvas = document.getElementById("bg-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let w;
  let h;
  let columns;
  let drops;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    columns = Math.floor(w / 18);
    drops = Array(columns).fill(0);
  }

  const glyphs = "01{}[]<>=/\\$#&*+λƒµΩAWSAI";

  function draw() {
    ctx.fillStyle = "rgba(5, 10, 5, 0.10)";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(57,255,20,0.9)";
    ctx.shadowColor = "rgba(57,255,20,0.32)";
    ctx.shadowBlur = 8;
    ctx.font = "14px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * 18;
      const y = drops[i] * 18;

      ctx.fillText(text, x, y);

      if (y > h && Math.random() > 0.978) {
        drops[i] = 0;
      }

      drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}