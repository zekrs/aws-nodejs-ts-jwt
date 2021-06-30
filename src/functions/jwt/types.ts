export type T_JWTHeader = {
  typ: string;
  alg: string;
};

export type T_JWTBody = {
  iss: string;
  aud: string;
  iat: number;
  exp: number;
};

export type T_JWT = T_JWTHeader & T_JWTBody;
