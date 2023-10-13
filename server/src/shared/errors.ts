import { GraphQLError } from 'graphql';

export class ForbiddenError extends GraphQLError {
  constructor(message?: string) {
    super(message);
    this.message = message || 'Forbidden error';
    this.name = 'ForbiddenError';
    this.extensions.code = 'FORBIDDEN';
  }
}

export class InternalServerError extends GraphQLError {
  constructor(message?: string) {
    super(message);
    this.message = message || 'Internal Server error';
    this.name = 'InternalServerError';
    this.extensions.code = 'INTERNAL_SERVER_ERROR';
  }
}

export class NotFoundError extends GraphQLError {
  constructor(message?: string) {
    super(message);
    this.message = message || 'Not Found error';
    this.name = 'NotFoundError';
    this.extensions.code = 'NOT_FOUND';
  }
}

export class BadRequestError extends GraphQLError {
  constructor(message?: string) {
    super(message);
    this.message = message || 'Bad Request error';
    this.name = 'BadRequestError';
    this.extensions.code = 'BAD_REQUEST';
  }
}

export class UnauthenticatedError extends GraphQLError {
  constructor(message?: string) {
    super(message);
    this.message = message || 'Unauthenticated error';
    this.name = 'UnauthenticatedError';
    this.extensions.code = 'UNAUTHENTICATED';
  }
}
