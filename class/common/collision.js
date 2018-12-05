module.exports = class Collision
{
	static checkCollisionBetween2rectangles(obj1, obj2)
	{
			return (obj1.leftX  < obj2.leftX + obj2.width
						&& obj1.topY < obj2.topY + obj2.height
						&& obj2.leftX < obj1.leftX  + obj1.width
						&& obj2.topY < obj1.topY + obj1.height
				   );
	}
};
