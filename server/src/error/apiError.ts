export default class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  public static unauthorized(message: string) {
    return new ApiError(401, message);
  }

  public static forbidden(message: string) {
    return new ApiError(403, message);
  }

  public static badRequest(message: string) {
    return new ApiError(404, message);
  }

  public static internalServerError(message: string) {
    return new ApiError(500, message);
  }
}
