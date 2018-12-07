module.exports = class Graphic
{
	static getDynamicColor(options)
	{
		var {
			startColor,
			endColor,
			opacity = 1,
			ratio,
			asArray = false
		} = options;

		var colorArray = new Array();

		colorArray.push(startColor[0]);
		colorArray.push(startColor[1]);
		colorArray.push(startColor[2]);

		var deltaColor = [
				(endColor[0] - startColor[0]) * (1 - ratio),
				(endColor[1] - startColor[1]) * (1 - ratio),
				(endColor[2] - startColor[2]) * (1 - ratio)
		];

		colorArray[0] += deltaColor[0] >> 0;
		colorArray[1] += deltaColor[1] >> 0;
		colorArray[2] += deltaColor[2] >> 0;

		if(!asArray)
			return `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${opacity})`;
		else
			return colorArray;
	}
}
