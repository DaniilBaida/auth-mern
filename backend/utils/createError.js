export const createError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.status = statusCode;
    return error;
};
