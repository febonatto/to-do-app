import GenericError from './GenericError';

class MissingParametersError extends GenericError {
  constructor() {
    super(
      'MissingParametersError',
      'The required fields were not filled in!',
      400
    );
  }
}

export default MissingParametersError;
