class AppError extends Error {
  constructor(message, options) {
    super(message, options);
  }
  toObject() {
    return { message: this.message, status: this?.status, name: this.name };
  }
}

class InternalServerError extends AppError {
  constructor(message = "INTERNAL_SERVER_ERROR", options) {
    super(message, options);
    this.name = "InternalServerError";
    this.status = options?.status || 500;
  }
}

class DatabaseError extends AppError {
  constructor(message = "DATABASE_ERROR", options) {
    super(message, options);
    this.name = "DatabaseError";
    this.status = options?.status || 500;
  }
}

class InvalidPayloadError extends AppError {
  constructor(message = "INVALID_PAYLOAD || BAD_PAYLOAD", options) {
    super(message, options);
    this.name = "InvalidPayloadError";
    this.status = options?.status || 400;
  }
}

class UnAuthorizedError extends AppError {
  constructor(message = "UNAUTHORIZED", options) {
    super(message, options);
    this.name = "UnAuthorizedError";
    this.status = options?.status || 403;
  }
}

class ServiceNotAvailable extends AppError {
  constructor(message = "SERVICE_NOT_AVAILABLE") {
    super(message, options);
    this.name = "ServiceNotAvailable";
    this.status = options?.status || 503;
  }
}

module.exports = {
  InternalServerError,
  DatabaseError,
  InvalidPayloadError,
  UnAuthorizedError,
  ServiceNotAvailable,
};
