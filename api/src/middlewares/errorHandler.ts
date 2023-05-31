import { NextFunction, Request, Response } from 'express';

import GenericError from '../errors/GenericError';

export default function errorHandler(error: Error & GenericError, request: Request, response: Response, next: NextFunction) {
  console.log('errorHandler: ', error);

  const name = error.name;
  const message = error.status_code ? error.message : 'Unexpected internal error, please contact support';
  const status_code = error.status_code ?? 500;

  return response
    .status(status_code)
    .json({
      error: name,
      message
    });
}
