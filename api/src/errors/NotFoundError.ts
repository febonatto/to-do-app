import GenericError from './GenericError';

class NotFoundError extends GenericError {
  constructor(message: string) {
    super(
      'NotFoundError',
      message,
      404
    );
  }
}

export default NotFoundError;
