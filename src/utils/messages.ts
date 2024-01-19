export namespace AUTH_CONTROLLER {
    export enum SUCCESS {
      LOGIN_SUCCESSFUL = 'Login successful',
      USER_REGISTERED = 'User registered successfully',
    }
  
    export enum VALIDATION {
      ERROR = 'Validation Error',
    }
  
    export enum FAILURE {
      USER_ALREADY_EXISTS = 'Username already exist',
    }
  }

  export namespace MIDDLEWARE {
    export enum FAILURE {
      AUTH_FAILED = 'Authentication failed',
      NO_USER = 'User not found',
      NO_SELLER = 'Seller not found',
      INVALID_TOKEN = 'Invalid token',
      NOT_AUTHORIZED = 'Not authorized',
    }
  }