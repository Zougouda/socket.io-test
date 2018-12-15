module.exports = class Control
{
    /********** CLIENT FUNCTIONS **********/

    static getMouseCoords(e)
    {
        var rect = clientState.canvas.getBoundingClientRect();
		var x = (e.pageX - rect.left) * e.target.ratio,
            y = (e.pageY - rect.top) * e.target.ratio;
            
        return {x, y};
    }

    /* `this` refers to a Player instance */

    static turnShipByMouse(e, params)
    {
        this.getShip().setLookPoint(e, params);
    }

    static turnWeaponsByMouse(e, params)
    {
        this.getShip().setWeaponsLookPoint(e, params.weaponIDs);
    }

    static toggleWeapons(e, params)
    {
        var myShip = this.getShip();
        if(!myShip)
            return;

        if(params.weaponIDs)
            return myShip.toggleWeapons( params.weaponIDs );

        if( params.leftWeaponIDs && e.which === 1 ) // left mouse button
            return myShip.toggleWeapons( params.leftWeaponIDs );
        if( params.rightWeaponIDs && e.which === 3 ) // right mouse button
            return myShip.toggleWeapons( params.rightWeaponIDs );

        myShip.toggleWeapons(); // fallback: shoot with all available weapons
    }

    static moveByKeyDown(e, params)
    {
        this.getShip().setThrustByKeyDown(e, params);
    }

    static moveByKeyUp(e, params)
    {
       this.getShip().setThrustByKeyUp(e, params);
    }
    
};