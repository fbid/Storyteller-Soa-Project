export class User {
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public city: string,
    public country: string,
    public password: string,
    public email: string,
    public avatar_url?: string
  ) {}
}
