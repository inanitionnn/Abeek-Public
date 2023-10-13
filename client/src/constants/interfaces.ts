export interface IJwt {
  id: string;
  role: string;
  mediaTokens: number;
  additionalMediaTokens: number;
  exp: number;
  iat: number;
  notificationCount: number;
}
