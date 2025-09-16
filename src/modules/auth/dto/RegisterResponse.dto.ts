export class RegisterResponseDto {
  constructor(
    public token: string,
    public userId: string,
    public cartId: string,
    public message: string,
  ) {}
}
