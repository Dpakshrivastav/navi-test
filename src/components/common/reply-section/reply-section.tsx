import React from 'react';
import { Button } from '../button/button';
import { Comment } from '../../../interfaces/Comment';
import './reply-section.css'
import { CommentSection } from '../comment-section/comment-section';

interface MessageSectionProps {
  comment: Comment
}
interface MessageSectionState {
  replyTextBox: string
  showTextBox: boolean
  commentSectionType: string
  showButtons: boolean
}
export class MessageSection extends React.Component<MessageSectionProps, MessageSectionState> {
  showButtons: boolean;
  showTextBox: boolean;
  constructor(props: any) {
    super(props);
    this.showTextBox = false;
  }
  render() {
    debugger;
    let comment = this.props.comment as Comment;
    if (!comment || comment.isDeleted) {
      return <></>
    }
    let commentSection = <></>;
    if (this.showTextBox) {
      commentSection = <div className='comment-section-container'>
        <CommentSection type={this.state?.commentSectionType} msg={comment.value} editComment={(msg) => this.editMessage(msg, comment)} cancel={()=>this.cancel()} addComment={(msg) => this.addComment(msg)}></CommentSection>
      </div>
    }
    let buttons = <></>;
    if(!this.showTextBox){
     buttons =  <div className='button-grp'>
      <Button className="btn" value="Reply" type="reply" onClick={() => this.showCommentSection('reply')}></Button>
      <Button className="btn" value="Delete" type="delete" onClick={(e: any) => this.deleteMessage(e, comment)}></Button>
      <Button className="btn" value="Edit" type="edit" onClick={() => this.showCommentSection('edit')}></Button>
      </div>
    }
    return <div> <div className='reply-section'>
      <div className='comment'>{comment.value}</div>
      {commentSection}
      {buttons}
    </div>
    <div className='reply-section-child'>
      {
        comment.replies && comment.replies.map((cmt: Comment) => (
          <div className='msg-section'>
            <MessageSection key={cmt.id} comment={cmt} />
            </div>
        ))}
        </div>
    </div>;

  }
  showCommentSection(commentSectionType: string) {
    this.setState({commentSectionType: commentSectionType});
    this.showTextBox = true;
  }
  
  cancel(): void {
    this.forceUpdate();
  }
  addComment(msg: Comment): void {
    if (!this.props.comment.replies) {
      this.props.comment.replies = [];
    }
    this.props.comment.replies.push(msg);
    this.showTextBox = false;
    this.forceUpdate();
  }
  editMessage(msg: string, comment: Comment) {
    comment.oldValue = comment.value;
    comment.value = msg;
    this.showTextBox = false;    
    this.forceUpdate();
  }
  reply(e: any, commet: any) {
    if (!commet.replies) {
      commet.replies = [];
    }
    commet.replies.push({
      id: Math.random().toString(),
      value: e,
      timestamp: new Date(),
    });
    this.forceUpdate();
  }

  deleteMessage(e: any, comment: any) {
    comment.isDeleted = true;
    this.forceUpdate();
  }
}


