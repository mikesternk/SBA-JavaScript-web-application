const dogBreeds = document.getElementById("breedSelect");
// console.log(dogBreeds);

const getDogBreeds = async () => {
  const url = "https://api.thedogapi.com/v1/breeds";

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
