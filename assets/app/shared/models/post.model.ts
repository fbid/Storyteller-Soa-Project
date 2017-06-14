export class Post {
  constructor(
    public id: string,
    public userId: string,
    public author: string,
    public content: string,
    public date: Date,
    public tags: string[],
    public main_img?: string,
  ) {}
}
