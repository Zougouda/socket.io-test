module.exports = class Graphic
{
	static resizeCanvas(options)
    {
		var {
			canvas,
			width, 
			height,
		} = options;

        canvas.width = width;
        canvas.height = height;

        var gameWidth = window.innerWidth;
        var gameHeight = window.innerHeight;
        var scaleToFitX = gameWidth / canvas.width;
        var scaleToFitY = gameHeight / canvas.height;
        var currentScreenRatio = gameWidth / gameHeight;
        var optimalRatio = Math.min(scaleToFitX, scaleToFitY);
        //if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) //if fullscreen
        //{
        //    canvas.ratio = width / gameWidth;
        //    canvas.style.width = gameWidth + "px";
        //    canvas.style.height = gameHeight + "px";
        //}
        //else
        //{
            canvas.ratio = width / (canvas.width * optimalRatio);
            canvas.style.width = canvas.width * optimalRatio + "px";
            canvas.style.height = canvas.height * optimalRatio + "px";
        //}

        //Canvas at middle
        canvas.style.position = "absolute";

        canvas.style.marginLeft = parseInt(canvas.style.width, 10) / -2 + "px";
        canvas.style.left = "50%";

        canvas.style.marginTop = parseInt(canvas.style.height, 10) / -2 + "px";
        canvas.style.top = "50%";
    }
	
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
