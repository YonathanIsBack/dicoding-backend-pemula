class FailedUpdateBook extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.errorCode = 404;
    }

}

export default FailedUpdateBook;