interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;

  id: number;
  fullname: string;
  role: string;
}
