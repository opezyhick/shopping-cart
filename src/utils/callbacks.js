const {
  InvalidPayloadError,
  DatabaseError,
  UnAuthorizedError,
  InternalServerError,
} = require("../config/error");
const yup = require("yup");

exports.handleError = (error, message) => {
  if (error instanceof yup.ValidationError) {
    throw new InvalidPayloadError(error.errors[0], { cause: error });
  }
  if (
    error instanceof InvalidPayloadError ||
    error instanceof UnAuthorizedError
  ) {
    throw error;
  }

  if (error?.code === 11000) {
    throw new DatabaseError(
      "Duplicate key error: " + JSON.stringify(error.keyPattern),
      { cause: error }
    );
  }

  if (error instanceof DatabaseError) {
    throw new DatabaseError(error.message, { cause: error });
  }

  throw new InternalServerError(message || "An unexpected error occurred", {
    cause: error,
  });
};
