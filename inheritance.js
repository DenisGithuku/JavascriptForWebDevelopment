// super class / base class
class Error {
  message;
  code;

  constructor(code, message) {
    (this.message = message), (this.code = code);
  }

  sendError() {
    console.log(this.code + " " + this.message);
  }
}

//subclass of Error
class HttpException extends Error {
  constructor(code, message) {
    super(code, message);
  }
}

//subclass of Error
class NetworkError extends Error {
  constructor(code, message) {
    super(code, message);
  }
}

class PoorNetworkError extends NetworkError {
  constructor(code, message) {
    super(code, message);
  }
}

class IOError extends Error {
  constructor(code, message) {
    super(code, message);
  }
}

class InternalServerError extends Error {
  constructor(code, message) {
    super(code, message);
  }
}

const error = new Error(404, "Resource could not be found");
const ioError = new IOError(202, "Invalid credentials");
ioError.sendError();

const netWorkError = new NetworkError(
  null,
  "Could not connect. Please check your internet connection"
);

const loggIn = () => {
  return false;
};

if (!loggIn()) {
  try {
  } catch {
    const internalServerError = new InternalServerError(
      500,
      "Could not fetch resource"
    );
  }
}

netWorkError.sendError();
const poorNetworkError = new PoorNetworkError(null, "Poor netork, Retrying...");
poorNetworkError.sendError();
