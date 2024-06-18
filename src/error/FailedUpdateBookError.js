class FailedUpdateBookError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.errorCode = 400;
    }

}

export default FailedUpdateBookError;