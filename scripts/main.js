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
const fuelInput = playScreen.querySelector('.fuel-input');
const fuelSubmit = playScreen.querySelector('.fuel-submit');

// Stats container
const altText = document.querySelector('.stat-text.alt');
const velText = document.querySelector('.stat-text.vel');
const fuelText = document.querySelector('.stat-text.fuel');

// Stat variables for all screens
let altitude = 1000;
let velocity = 40;
let fuel = 25;

// Constants
const GRAVITY_VELOCITY = 2; // Gravity increases velocity by 2m/s

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
	initPlayBtn();
});

// Play screen code

// Update the stats in the top left corner
const updateStats = () => {
	altText.innerHTML = `Altitude: ${altitude}m`;
	velText.innerHTML = `Velocity: ${velocity}m/s`;
	fuelText.innerHTML = `Fuel: ${fuel}g`;
};

const initPlayBtn = () => {
	fuelSubmit.addEventListener('click', playGame);
};

// Start the game loop
const playGame = () => {
	console.log('game played');
	if (fuel <= 0) {
		finishGame();
		return;
	}

	if (altitude <= 0) {
		gameEnded();
	} else {
		console.log('else function');
		let userFuelInput = fuelInput.value;
		console.log(userFuelInput);
		if (userFuelInput == null || userFuelInput == undefined) return;

		if (fuel - fuelInput <= 0) {
			for (i = 0; i < fuel; i++) {
				thrust();
			}
		} else {
			for (i = 0; i < userFuelInput; i++) {
				thrust();
			}
		}

		advanceSecond();
		if (altitude <= 0) gameEnded();
		if (fuel <= 0) gameEnded();
	}
};

const thrust = () => {
	fuel--;
	velocity -= 4;
};

const finishGame = () => {
	fuelSubmit.removeEventListener('click', playGame);
	console.log('finishing game');
	while (altitude > 0) advanceSecond();
	gameEnded();
};

const advanceSecond = () => {
	velocity += GRAVITY_VELOCITY;
	console.log('velocity: ' + velocity);
	altitude -= velocity;
	updateStats();
};

const gameEnded = () => {
	alert('game done;');
};
