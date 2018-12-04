module.exports = class Geometry
{
    static getDistanceBy2XY(x1, y1, x2, y2)
    {
        var dx = Math.pow(x2 - x1, 2);
        var dy = Math.pow(y1 - y2, 2);
        var distance = Math.sqrt(dx + dy);
        return distance;
    }

    static getAngleBy2XY(x1, y1, x2, y2)
    {
        var deltaY = y2 - y1;
        var deltaX = x2 - x1;

        var theta = Math.atan2(-deltaY, deltaX);
        if (theta < 0)
            theta += 2 * Math.PI;

        var angle = theta * 180 / Math.PI;

        return angle;
    }

	static getXByAngle(angle)
	{
		return Math.cos(angle % 360 * Math.PI / 180);
	}

	static getYByAngle(angle)
	{
		return Math.sin(angle % 360 * Math.PI / 180) * -1;
	}

    static getXByAngleAndDistance(x, angle, distance)
    {
        return (x + Math.cos(angle % 360) * distance);
    }
    
    static getYByAngleAndDistance(y, angle, distance)
    {
        return (y + Math.sin(angle % 360) * distance);
    }

    /**
     * Linear Interpolation method
     * 
     * @param {float} startValue 
     * @param {float} destValue 
     * @param {float} normal (between 0 & 1)
     */
    static lerp(startValue, destValue, normal)
    {
        return (1 - normal) * startValue + normal * destValue;
    }
};
