class Geometry
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

    static computeCosByAngle(angle)
    {
        return Math.cos(angle * Math.PI / 180);    
    }
    static computeSinByAngle(angle)
    {
        return Math.sin(angle * Math.PI / 180) * -1;
    }
    static configureStaticCosandSin()
    {
        this.static = {
            COS: {},
            SIN: {},
        };

        for (var i = 0; i <= 360; i++) 
        {
            this.static.COS[i] = this.computeCosByAngle(i);
        }
        for (var i = 0; i <= 360; i++) 
        {
            this.static.SIN[i] = this.computeSinByAngle(i);
        }
    }

	static getXByAngle(angle)
	{
		// return Math.cos(angle % 360 * Math.PI / 180);
		return this.static.COS[angle>>0];
	}
	static getYByAngle(angle)
	{
		// return Math.sin(angle % 360 * Math.PI / 180) * -1;
		return this.static.SIN[angle>>0];
	}

    static getXByAngleAndDistance(x, angle, distance)
    {
        return (x + this.getXByAngle(angle) * distance);
    }
    static getYByAngleAndDistance(y, angle, distance)
    {
        return (y + this.getYByAngle(angle) * distance);
    }
    
    static getReverseAngle(angle)
    {
        var newAngle = (angle + 180) % 360;
        return newAngle;
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

Geometry.configureStaticCosandSin(); // Pre-calculate static cos and sin

module.exports = Geometry;