
/**
 * Custom error type used to represent data-related failures,
 * such as missing fields, malformed API responses, or invalid
 * normalization results.
 *
 * Extends the native `Error` class to allow the centralized
 * error handler to distinguish between data errors and generic
 * runtime errors.
 *
 * @class DataError
 *
 * @example
 * throw new DataError("Missing required fields in API response");
 */
export class DataError extends Error {

    constructor(message: string){
        super(message);
        this.name = "DataError";
    }
}

/**
 * Centralized error handler that processes both custom errors
 * (such as `DataError`) and generic runtime errors.
 *
 * - If the error is an instance of `DataError`, a descriptive
 *   message is logged with a "Data Error" prefix.
 * - Otherwise, the raw error object is logged directly.
 *
 * This function helps maintain consistent error reporting across
 * the application and keeps error-handling logic in one place.
 *
 * @param {Error} error - The error instance to process.
 *
 * @example
 * try {
 *   throw new DataError("Invalid country format");
 * } catch (err) {
 *   errorHandler(err);
 * }
 */
export const errorHandler = (error: Error) => {
    if(error instanceof DataError){
        console.error("Data Error:", error.message);
    } else{
        console.error(error);
    }
}
