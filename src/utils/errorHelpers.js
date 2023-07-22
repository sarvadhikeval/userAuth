class errHelper extends Error{
    constructor (type, message){
        super(message);
        this.name = type
        this.message = message
    }
}

export default errHelper;