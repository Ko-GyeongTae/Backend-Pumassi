export class SignInRequest {
  email: string;
  password: string;
}

export class SignUpRequest {
  email: string;
  name: string;
  password: string;
  entranceYear: number;
  grade: number;
}
