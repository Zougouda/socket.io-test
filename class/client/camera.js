module.exports = class Camera
{
    constructor()
    {
        this.init();
    }

    init()
    {
        this.centerX = window.clientState.canvasWidth / 2;
        this.centerY = window.clientState.canvasHeight / 2;
        this.width = window.clientState.canvasWidth;
        this.height = window.clientState.canvasHeight;
    }

    update(modifier)
    {
		if(!this.targetLock)
			return;

		this.centerX = this.targetLock.centerX;
		this.centerY = this.targetLock.centerY;
    }

    attachTo(target)
    {
        this.tagetLock = target;
        // TODO
    }

    detach()
    {
		this.tagetLock = null;
         // TODO
    }
}
