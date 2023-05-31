import GenericError from './GenericError';

class InvalidParameter extends GenericError {
  constructor(message: string) {
    super(
      'InvalidParameter',
      message,
      400
    );
  }
}

export default InvalidParameter;
