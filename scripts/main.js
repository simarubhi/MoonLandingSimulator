// Start screen elements
const startScreen = document.querySelector('.start-screen');
const altSelectorText = startScreen.querySelector('.alt-slider-text');
const altSlider = startScreen.querySelector('.alt-slider');
const velSelectorText = startScreen.querySelector('.vel-slider-text');
const velSlider = startScreen.querySelector('.vel-slider');
const fuelSelectorText = startScreen.querySelector('.fuel-slider-text');
const fuelSlider = startScreen.querySelector('.fuel-slider');
const startBtn = startScreen.querySelector('.start-button');

// Play screen elements
const playScreen = document.querySelector('.play-screen');
const backGroundContainer = playScreen.querySelector('.background-container');
const spaceContainer = playScreen.querySelector('.space-container');
const nonFireRocket = playScreen.querySelector('.rocket.no-fire');
const fireRocket = playScreen.querySelector('.rocket.fire');

// Stats container
const altText = document.querySelector('.stat-text.alt');
const velText = document.querySelector('.stat-text.vel');
const fuelText = document.querySelector('.stat-text.fuel');

// Variables for all screens
let altitude = 1000;
let velocity = 40;
let fuel = 25;

// Start screen
altSlider.value = altitude;
altSelectorText.innerHTML = altSlider.value + 'm';
altSlider.oninput = () => {
	altSelectorText.innerHTML = altSlider.value + 'm';
	altitude = altSlider.value;
};

velSlider.value = velocity;
velSelectorText.innerHTML = velSlider.value + 'm/s';
velSlider.oninput = () => {
	velSelectorText.innerHTML = velSlider.value + 'm/s';
	velocity = velSlider.value;
};

fuelSlider.value = fuel;
fuelSelectorText.innerHTML = fuelSlider.value + 'g';
fuelSlider.oninput = () => {
	fuelSelectorText.innerHTML = fuelSlider.value + 'g';
	fuel = fuelSlider.value;
};

startBtn.addEventListener('click', () => {
	startScreen.style.display = 'none';
	playScreen.style.display = 'block';
	updateStats();
});

// Play screen code

// Update the stats in the top left corner
const updateStats = () => {
	altText.innerHTML = `Altitude: ${altitude}m`;
	velText.innerHTML = `Velocity: ${velocity}m/s`;
	fuelText.innerHTML = `Fuel: ${fuel}g`;
};
