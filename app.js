// Get the select div from index.html
const dogBreeds = document.getElementById("breedSelect");
// console.log(dogBreeds);

// Get the information div from index.html
const breedInfo = document.getElementById("breedInfo");

// Dog API URL
const url = "https://api.thedogapi.com/v1/breeds";

const getDogBreeds = async () => {
  try {
    const response = await fetch(url);
    console.log(response);

    if (!response.ok) {
      throw new Error("Could not fetch resourse!");
    }

    const data = await response.json();
    console.log(data);

    data.forEach((element) => {
      console.log(element);
      const options = document.createElement("option");
      options.value = element.id;
      options.text = element.name;
      dogBreeds.appendChild(options);
    });
  } catch (error) {
    console.log(error);
  }
};

getDogBreeds();

dogBreeds.addEventListener("change", async () => {
  const selectedBreedId = dogBreeds.value;

  if (selectedBreedId) {
    try {
      // Replace the information with blank
      breedInfo.innerHTML = "";

      const res = await fetch(`${url}/${selectedBreedId}`);
      //   console.log(res);

      if (!res.ok) {
        throw new Error("could not fetch resourse");
      }
      // Create new Div for dog information
      const information = document.createElement("div");

      const dogInfo = await res.json();
      //   console.log(dogInfo);

      // Get the metric weight of the dogs
      const dogWeightMetric = dogInfo.weight.metric;
      console.log(dogWeightMetric);

      // Get the imperial weight of the dogs
      const dogWeightImperial = dogInfo.weight.imperial;
      information.innerHTML = `
        <h3>Name: ${dogInfo.name}</h3> 
        <p><b>Bred For:</b> ${dogInfo.bred_for}</p>
        <p><b>Temperament:</b> ${dogInfo.temperament}</p>
        <p><b>Life Span</b> ${dogInfo.life_span}</p>
        <p><b>Weight:</b> ${dogWeightMetric} kgs</p><button id="weightBtn"></button>
        `;

      // Retrieving Dog Images
      image = document.createElement("img");
      image.src = `https://cdn2.thedogapi.com/images/${dogInfo.reference_image_id}.jpg`;
      image.alt = dogInfo.name;
      image.height = "300";
      console.log(dogInfo.reference_image_id);
      // Display the information
      breedInfo.appendChild(image);
      breedInfo.appendChild(information);
      console.log(dogInfo);
    } catch (error) {
      console.log(error);
    }
  }
});
