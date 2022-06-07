
export interface CommentBase {
  id: string;
  value: string;
  oldValue?: string;
  timeStamp: Date;
  isDeleted?: boolean;
}
