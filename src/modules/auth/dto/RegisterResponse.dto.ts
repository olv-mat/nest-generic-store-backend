export class RegisterResponseDto {
  constructor(
    public token: string,
    public uuid: string,
    public message: string,
  ) {}
}
