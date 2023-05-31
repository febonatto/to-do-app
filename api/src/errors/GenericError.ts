class GenericError extends Error {
  public readonly status_code: number;

  constructor(name: string, message: string, status_code: number = 500) {
    super(message);

    this.name = name;
    this.status_code = status_code;
  }
}

export default GenericError;
