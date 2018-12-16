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
				onMouseMove: {
					callback: 'turnShipByMouse',
					params: {}
				},
				onMouseDown: {
					callback: 'toggleWeapons',
					params: {leftWeaponIDs: [0], rightWeaponIDs: [1]}
				},
				onMouseUp: {
					callback: 'toggleWeapons',
					params: {leftWeaponIDs: [0], rightWeaponIDs: [1]}
				},
			}
		},
		keyControlsByAssignment: 
		{
			pilot:
			{
				onKeyDown: {
					callback: 'moveByKeyDown',
					params: {}
				},
				onKeyUp: {
					callback: 'moveByKeyUp',
					params: {}
				}
			}
		},
	},

	kestrel: 
	{
		width: 100,
		height: 150,

		speed: 400, // px/s
		thrust: {
			forward: 20,
			backward: 10,
		},
		rotationSpeed: 150, // deg/s

		HP: 5000, maxHP: 5000,
		spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/ship/kestrel.png',

		reactorOptions: [
			{
				distance: 70,
				angle: 30,
				particle: {
					speed: 1,
					duration: 150,
					radius: 10,
				}
			},
			{
				distance: 70,
				angle: -30,
				particle: {
					speed: 1,
					duration: 150,
					radius: 10,
				}
			},
		],

		weaponOptions: 
		[
			/* pilot guns */
			/* left */
			{
				...weaponConfig.baseWeapon,
				distance: 50, 
				angle: 25, 
				relativeLookAngle: 90,
				projectile: {
					...weaponConfig.baseWeapon.projectile,
				}
			},
			{
				...weaponConfig.baseWeapon,
				distance: 40, 
				angle: 40, 
				relativeLookAngle: 90,
				projectile: {
					...weaponConfig.baseWeapon.projectile,
				}
			},
			/* right */
			{
				...weaponConfig.baseWeapon,
				distance: 50, 
				angle: -25, 
				relativeLookAngle: -90,
				projectile: {
					...weaponConfig.baseWeapon.projectile,
				}
			},
			{
				...weaponConfig.baseWeapon,
				distance: 40, 
				angle: -40, 
				relativeLookAngle: -90,
				projectile: {
					...weaponConfig.baseWeapon.projectile,
				}
			},

			/* gunner guns */
			{
				...weaponConfig.baseWeapon,
				distance: 15, 
				angle: 90, 
				onTop: true,
				hasPointer: true,
				projectile: {
					...weaponConfig.baseWeapon.projectile,
					spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/projectile/red-beam.png',
					height: 24
				}
			},
			{
				...weaponConfig.baseWeapon,
				distance: 15, 
				angle: -90, 
				onTop: true,
				hasPointer: true,
				projectile: {
					...weaponConfig.baseWeapon.projectile,
					spriteSrc: 'http://cyrilannette.fr/demos/supinspace/2/play/img/projectile/red-beam.png',
					height: 24
				}
			},
		],

		mouseControlsByAssignment: 
		{
			pilot: 
			{
				onMouseMove: {
					callback: 'turnShipByMouse',
					params: {}
				},
				onMouseDown: {
					callback: 'toggleWeapons',
					params: {leftWeaponIDs: [0, 1], rightWeaponIDs: [2, 3]}
				},
				onMouseUp: {
					callback: 'toggleWeapons',
					params: {leftWeaponIDs: [0, 1], rightWeaponIDs: [2, 3]}
				},
			},
			gunner: 
			{
				onMouseMove: {
					callback: 'turnWeaponsByMouse',
					params: {weaponIDs: [4, 5]}
				},
				onMouseDown: {
					callback: 'toggleWeapons',
					params: {leftWeaponIDs: [4], rightWeaponIDs: [5]}
				},
				onMouseUp: {
					callback: 'toggleWeapons',
					params: {leftWeaponIDs: [4], rightWeaponIDs: [5]}
				},
			},
		},
		keyControlsByAssignment: 
		{
			pilot:
			{
				onKeyDown: {
					callback: 'moveByKeyDown',
					params: {}
				},
				onKeyUp: {
					callback: 'moveByKeyUp',
					params: {}
				}			
			}
		},
	},
};
