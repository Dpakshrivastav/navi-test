import { CommentBase } from './CommentBase';


export interface Comment extends CommentBase {
  replies: CommentBase[];
}
