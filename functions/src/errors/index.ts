import { logger } from 'firebase-functions/v1';

export class Errors {
  status!: number;
  message!: string;
  constructor() {
    logger.error({
      message: this.message || 'Something went wrong',
    });
  }
}

export class Unauthorized extends Errors {
  constructor(public message: string) {
    super();
    this.status = 401;
  }
}

export class Forbidden extends Errors {
  constructor(public message: string) {
    super();
    this.status = 403;
  }
}

export class BadRequest extends Errors {
  constructor(public message: string) {
    super();
    this.status = 400;
  }
}

export class NotFound extends Errors {
  constructor(public message: string) {
    super();
    this.status = 404;
  }
}

export class CustomError extends Errors {
  constructor(public message: string, public status) {
    super();
  }
}
