import { Post } from '../models/post.model';

export class PostService {

  private posts: Post[] = [
    new Post('Lorem ipsum', 'Batman', new Date(), ['technology','science']),
    new Post('Dolor sit', 'Superman', new Date(), ['technology','quantum-computing']),
    new Post('Hello World', 'Scooby Doo', new Date(), ['history','nature']),
  ];

  addPost(post: Post) {
    this.posts.push(post);
  }

  getPosts() {
    return this.posts;
  }

  deletePost(post: Post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }
}
