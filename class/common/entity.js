module.exports = class Entity
{
    constructor(options = {})
    {
        this.options = options;
        this.applyOptions();
        this.init();
    }

    get defaultOptions()
    {
        return {
            x: 0,
            y: 0,
            width: 50,
            height: 50,
        };
    }

    applyOptions()
    {
        if(!this.options)
            return;
        
        Object.entries( this.defaultOptions )
        .forEach( ([key, defaultValue]) => 
        {
            if(this.options[key] === undefined)
                this[key] = defaultValue; // apply default value if doesnt exist
            else
                this[key] = this.options[key]; // or use given value
        });
    }

    init()
    {
        
    }
};