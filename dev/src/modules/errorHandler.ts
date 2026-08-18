

export class DataError extends Error {

    constructor(message: string){
        super(message);
        this.name = "DataError";
    }
}

/**
 * Centralized error handler that logs custom and generic errors.
 * @param {Error} error - Error instance to process.
 */
export const errorHandler = (error: Error) => {
    if(error instanceof DataError){
        console.error("Data Error:", error.message);
    } else{
        console.error(error);
    }
}
