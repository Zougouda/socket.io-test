const weaponConfig = require('./weapon.js');

module.exports = {
	baseShip: 
	{
		width: 42,
		height: 60,

		speed: 400, // px/s
		thrust: {
			forward: 60,
			backward: 20,
			left: 10,
			right: 10,
		},
		rotationSpeed: 540, // deg/s

		HP: 100, maxHP: 100,
		spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/ship/spaceship.png',

		reactorOptions: [
			{
				distance: 30,
				angle: 12,
				particle: {
					speed: 1,
					duration: 150,
					radius: 4,
				}
			},
			{
				distance: 30,
				angle: -12,
				particle: {
					speed: 1,
					duration: 150,
					radius: 4,
				}
			},
		],

		weaponOptions: 
		[
			Object.assign(
				{ distance: 15, angle: 110 }, 
				weaponConfig.baseWeapon
			),
			Object.assign(
				{ distance: 15, angle: -110 }, 
				weaponConfig.baseWeapon
			),
		],

		mouseControlsByAssignment: 
		{
			pilot: 
			{
				onMouseMove: 'turnShipByMouse',
				onMouseDown: 'toggleWeaponsEvenOrOddByMouse',
				onMouseUp: 'toggleWeaponsEvenOrOddByMouse',
			}
		},
		keyControlsByAssignment: 
		{
			pilot:
			{
				onKeyDown: 'moveByKeyDown',
				onKeyUp: 'moveByKeyUp',				
			}
		},
	},

	baseShip_test: 
	{
		width: 42,
		height: 60,

		speed: 400, // px/s
		thrust: {
			forward: 60,
			backward: 20,
			left: 10,
			right: 10,
		},
		rotationSpeed: 540, // deg/s

		HP: 100, maxHP: 100,
		spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/ship/spaceship.png',

		reactorOptions: [
			{
				distance: 30,
				angle: 12,
				particle: {
					speed: 1,
					duration: 150,
					radius: 4,
				}
			},
			{
				distance: 30,
				angle: -12,
				particle: {
					speed: 1,
					duration: 150,
					radius: 4,
				}
			},
		],

		weaponOptions: 
		[
			Object.assign(
				{ distance: 15, angle: 110, lookAngle: 180, onTop: true, }, 
				weaponConfig.baseWeapon
			),
			Object.assign(
				{ distance: 15, angle: -110, lookAngle: 0, onTop: true, }, 
				weaponConfig.baseWeapon
			),
		],

		mouseControlsByAssignment: 
		{
			pilot: 
			{
				onMouseMove: 'turnShipByMouse',
			},
			gunner: 
			{
				onMouseMove: 'turnWeaponsByMouse',
				onMouseDown: 'toggleWeaponsEvenOrOddByMouse',
				onMouseUp: 'toggleWeaponsEvenOrOddByMouse',
			},
		},
		keyControlsByAssignment: 
		{
			pilot:
			{
				onKeyDown: 'moveByKeyDown',
				onKeyUp: 'moveByKeyUp',				
			}
		},
	},
};
