import React from 'react';
import './comment-page.css';
import { MessageSection } from '../reply-section';
import { CommentSection } from '../../comment-section/comment-section';
import { Comment } from '../../../../interfaces/Comment';
interface CommentPageProp {
}
interface CommentPageState {
  comment: Comment
}
export class CommentPage extends React.Component<CommentPageProp, CommentPageState> {
  constructor(props: any) {
    super(props);
  }
  addComment(msg: Comment) {
    this.setState({ comment: msg });
  };
  render() {
    let msg;
    if ( this.state?.comment)
      msg =  <MessageSection comment={this.state.comment}></MessageSection>;
    else 
      msg = <></>;
    return <div className='container'>
      <div className='title'>Comment Widget</div>
      <CommentSection type="Add" msg='' editComment={(msg) => this.editComment(msg)} addComment={(msg) => this.addComment(msg)} cancel={()=>this.cancel()}></CommentSection>
      {msg}
    </div>;
  }
  cancel(): void {
    this.forceUpdate();
  }
  editComment(msg: string): void {
    this.state.comment.value = msg;
  }
}