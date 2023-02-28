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
backGroundContainer.style.webkitAnimationPlayState = 'paused';
const spaceContainer = playScreen.querySelector('.space-container');
spaceContainer.style.webkitAnimationPlayState = 'paused';
const nonFireRocket = playScreen.querySelector('.rocket.no-fire');
const fireRocket = playScreen.querySelector('.rocket.fire');
const fuelInputContainer = playScreen.querySelector('.fuel-choice-container');
const fuelInput = playScreen.querySelector('.fuel-input');
const fuelSubmit = playScreen.querySelector('.fuel-submit');

// Stats container
const statsContainer = document.querySelector('.stats-container');
const altText = document.querySelector('.stat-text.alt');
const velText = document.querySelector('.stat-text.vel');
const fuelText = document.querySelector('.stat-text.fuel');

// Final message containers
const winContainer = document.querySelector('.win-container');
const loseContainer = document.querySelector('.lose-container');
const graphContainer = document.querySelector('.graph-container');

// Stat variables for all screens
let altitude = 1000;
let velocity = 40;
let fuel = 25;

let altitudeArr = [];
let velocityArr = [];
let fuelArr = [];

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

	altitudeArr.push(altitude);
	velocityArr.push(velocity);
	fuelArr.push(fuel);

	console.log(altitudeArr);
};

const initPlayBtn = () => {
	fuelSubmit.addEventListener('click', playGame);
};

// Start the game loop
const playGame = () => {
	if (fuel <= 0) {
		finishGame();
		return;
	}

	if (altitude <= 0) {
		gameEnded();
	} else {
		let userFuelInput = fuelInput.value;
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
		if (altitude <= 0) finishGame();
		if (fuel <= 0) finishGame();
	}
};

const thrust = () => {
	fuel--;
	velocity -= 4;
};

const finishGame = () => {
	fuelSubmit.removeEventListener('click', playGame);
	while (altitude > 0) advanceSecond();
	gameEnded();
};

const advanceSecond = () => {
	fuelSubmit.removeEventListener('click', playGame);
	velocity += GRAVITY_VELOCITY;
	altitude -= velocity;
	updateStats();
	if (altitude <= 0) {
		endGameTransition();
	} else {
		backgroundTransition();
	}
};

let animationSpeed;
const backgroundTransition = () => {
	if (velocity == 0) {
		fuelSubmit.addEventListener('click', playGame);
		return;
	}
	animationSpeed = Math.abs(velocity * 10);

	let down = velocity > 0;

	if (down) {
		spaceContainer.style.animationDirection = 'normal';
	} else {
		spaceContainer.style.animationDirection = 'reverse';
	}

	nonFireRocket.style.display = 'none';
	fireRocket.style.display = 'block';
	spaceContainer.style.webkitAnimationPlayState = 'running';

	setTimeout(() => {
		spaceContainer.style.webkitAnimationPlayState = 'paused';
		fuelSubmit.addEventListener('click', playGame);
		nonFireRocket.style.display = 'block';
		fireRocket.style.display = 'none';
	}, animationSpeed);
};

const endGameTransition = () => {
	nonFireRocket.style.display = 'block';
	fireRocket.style.display = 'none';

	spaceContainer.classList.add('end');
	spaceContainer.style.webkitAnimationPlayState = 'running';
	backGroundContainer.style.webkitAnimationPlayState = 'running';
	nonFireRocket.classList.add('animate');
	statsContainer.style.display = 'none';
	fuelInputContainer.style.display = 'none';
};

// Chart.js
let xValues = [
	100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
	1500, 1600, 1700, 1800, 1900, 2000,
];

const gameEnded = () => {
	if (velocity < 5) {
		winContainer.style.display = 'block';
	} else {
		loseContainer.style.display = 'block';
	}

	setTimeout(() => {
		graphContainer.style.display = 'flex';
		new Chart('myChart', {
			type: 'line',
			data: {
				labels: xValues,
				datasets: [
					{
						data: altitudeArr,
						borderColor: 'red',
						fill: false,
						label: 'altitude',
					},
					{
						data: velocityArr,
						borderColor: 'green',
						fill: false,
						label: 'velocity',
					},
					{
						data: fuelArr,
						borderColor: 'blue',
						fill: false,
						label: 'fuel',
					},
				],
			},
			options: {
				legend: {
					display: true,
				},
			},
		});
	}, 5000);
};
