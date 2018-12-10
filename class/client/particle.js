module.exports = class Particle extends require('../common/movable.js')
{
    get defaultOptions()
    {
        return Object.assign(super.defaultOptions, {
            duration: 100,
            radius: 30,
            startColor: [255, 0, 0],
            endColor: [255, 255, 0],
        });
    }

    init()
    {
        super.init();

        this.countdownToDestruction = this.duration;
        this.startRadius = this.radius;
        this.remainingLifeRatio = 1;
        this.opacity = 1;
    }

    updateClient(modifier)
    {
        this.countdownToDestruction -= modifier*1000;
        if(this.countdownToDestruction < 0)
            return this.remove();
        
        this.remainingLifeRatio = this.countdownToDestruction / this.duration;
        // this.radius = this.startRadius * timeRemainingRatio;
        // this.opacity = 1 * timeRemainingRatio;

        this.updateByAngleAndDistance(this.moveAngle, this.speed);
    }

    draw(ctx)
    {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = clientClasses.Graphic.getDynamicColor({
            startColor: this.startColor,
            endColor: this.endColor,
            ratio: this.remainingLifeRatio,
            opacity: 1 * this.remainingLifeRatio,
        });
        ctx.beginPath();
        ctx.arc(this.clientCenterX, this.clientCenterY, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.restore();
    }
};