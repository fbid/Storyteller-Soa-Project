export class Post {
  constructor(
    public id: string,
    public userId: string,
    public author: string,
    public title: string,
    public mainImg: string,
    public content: string,
    public date: Date,
    public tags: string

  ) {}
}
