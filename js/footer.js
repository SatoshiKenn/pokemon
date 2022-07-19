//Get year code
const today = new Date();
const year = today.getFullYear();

//footer js code
const footer = document.querySelector("#devinfo");
footer.innerHTML = `&copy; ${year} Pokédex | Kennette Guevara | WDD 330 Project`;