const input = document.getElementById("iconInput");
const circle = document.getElementById("iconCircle");
const text = document.getElementById("placeholderText");

const audioBtn = document.getElementById("audioPreviewBtn");
const audioPreview = document.getElementById("audioPreview");
const audioIcon = document.getElementById("audioIcon");

circle.addEventListener("click", () => {
  input.click();
});

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const img = reader.result;

    // quitar borde dashed
    circle.classList.remove("border-dashed", "border-zinc-600");
    circle.classList.add("border-transparent");

    // set imagen
    circle.style.backgroundImage = `url(${img})`;
    circle.style.backgroundSize = "cover";
    circle.style.backgroundPosition = "center";
    text.style.display = "none";

    // audio preview icon
    audioIcon.style.backgroundImage = `url(${img})`;

    // animación GSAP
    gsap.fromTo(
      circle,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    localStorage.setItem("selectedIcon", img);
  };

  reader.readAsDataURL(file);
});

// cargar icono guardado
const savedIcon = localStorage.getItem("selectedIcon");
if (savedIcon) {
  circle.classList.remove("border-dashed", "border-zinc-600");
  circle.classList.add("border-transparent");

  circle.style.backgroundImage = `url(${savedIcon})`;
  circle.style.backgroundSize = "cover";
  circle.style.backgroundPosition = "center";
  text.style.display = "none";
  audioIcon.style.backgroundImage = `url(${savedIcon})`;
}

// toggle audio preview con animación
audioBtn.addEventListener("click", () => {
  if (audioPreview.classList.contains("hidden")) {
    audioPreview.classList.remove("hidden");

    gsap.fromTo(
      audioPreview,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  } else {
    gsap.to(audioPreview, {
      y: 10,
      opacity: 0,
      duration: 0.2,
      onComplete: () => audioPreview.classList.add("hidden")
    });
  }
});
