export class RegisterResponseDto {
  constructor(
    public token: string,
    public user: string,
    public cart: string,
    public message: string,
  ) {}
}
