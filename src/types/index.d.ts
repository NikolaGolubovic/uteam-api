declare global {
  namespace Express {
    interface Request {
      token: string;
    }
  }
  namespace NodeJS {
    export interface ProcessEnv {
      SECRET: string;
    }
  }
}

export default global;
