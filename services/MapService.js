export const getAddressFromCoordinates = (lat, lng) => {
  const streets = ["Main St", "Highland Ave", "Oak Dr", "Maple Rd", "Elm St"];
  const cities = ["Springfield", "Riverside", "Centerville", "Greenville", "Fairview"];
  const states = ["CA", "TX", "NY", "FL", "IL"];
  const zipCodes = ["90210", "10001", "30303", "60606", "75201"];

  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const zipCode = zipCodes[Math.floor(Math.random() * zipCodes.length)];

  return `${lat.toFixed(4)}, ${lng.toFixed(4)} - ${street}, ${city}, ${state} ${zipCode}`;
};
