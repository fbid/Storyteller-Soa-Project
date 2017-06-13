export class Post {
  constructor(
    public content: string,
    public author: string,
    public date: Date,
    public tags: string[],
    public main_img?: string
  ) {}
}
