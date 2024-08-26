import { describe, it } from '@jest/globals';
import { requestFail } from '../src/shared/controller/requestFail';
import { HttpRequestError } from '../src/utils';
import { StatusCodes } from 'http-status-codes';

describe('Request Fail', () => {
  it('should return error message and status code when error is an instance of HttpRequestError', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const error = new HttpRequestError('Not Found', StatusCodes.NOT_FOUND);
    requestFail(res, error);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
  });

  it('should return internal server error message when error is undefined or null', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    requestFail(res, undefined);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });

    requestFail(res, null);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
