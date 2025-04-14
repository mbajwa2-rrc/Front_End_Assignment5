const form = document.querySelector("form");
const dateInput = document.querySelector("#date");
const photoDisplay = document.querySelector("#photoDisplay");
const errorDisplay = document.querySelector("#error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const date = dateInput.value;

  // Clear previous results
  photoDisplay.innerHTML = "";
  errorDisplay.innerText = "";

  if (!date) {
    errorDisplay.innerText = "Please enter a valid date.";
    return;
  }

  try {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=DEMO_KEY`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.photos.length === 0) {
      errorDisplay.innerText = "No photos available for the selected date.";
      return;
    }

    data.photos.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.img_src;
      img.alt = `Photo by ${photo.rover.name} using ${photo.camera.full_name}`;
      img.classList.add("photo");

      const caption = document.createElement("p");
      caption.textContent = `📸 ${photo.camera.full_name} — 🛰️ ${photo.rover.name}`;

      const card = document.createElement("div");
      card.classList.add("photo-card");
      card.appendChild(img);
      card.appendChild(caption);

      photoDisplay.appendChild(card);
    });
  } catch (error) {
    errorDisplay.innerText = "Failed to fetch photos. Please try again later.";
    console.error(error);
  }
});
