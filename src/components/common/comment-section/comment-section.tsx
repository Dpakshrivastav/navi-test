import React from 'react';
import './comment-section.css';
import { CommnetBox } from '../comment-box/comment-box';
import { Button } from '../button/button';
import { Comment } from '../../../interfaces/Comment';
import { CpuInfo } from 'os';

interface CommentSectionProp {
  addComment(e: Comment): void
  editComment(e: string): void
  cancel():void
  type: string
  msg: string
}
interface CommentSectionState {
  newMsg: string
  oldMsg: string
}
export class CommentSection extends React.Component<CommentSectionProp, CommentSectionState> {
  constructor(props: any) {
    super(props);
    this.setState({oldMsg:this.props.msg});
    this.setState({newMsg: this.props.msg});
  }
  onChange(e: any) {
   this.setState({newMsg: e});
  }
  addComment(){
      this.props.addComment({
        id: Math.round(Math.random()*10000).toString(),
        replies: [],
        timeStamp: new Date(),
        value: this.state.newMsg
      })
  };
  render() {
    let commentSection;
    if(this.props.type?.toLowerCase() === 'add' || this.props.type?.toLowerCase() === 'reply'){
      commentSection = 
      <div className='add-comment' >
      <Button value={this.props.type === 'reply' ? 'Reply':'Add Comment'} type={this.props.type} onClick={()=>this.addComment()}></Button>
      </div>
    }
    else {
      commentSection = 
      <div className='edit-comment' >
      <Button value="Save" type='save' onClick={()=>this.saveComment()}></Button>
      <Button value="Cancel" type='cancel' onClick={()=>this.cancel()}></Button>
      </div>
    }
    return  <div className='comment-section'>
      <div className='comment-box'>
      <CommnetBox msg={this.state?.oldMsg} type={this.props.type.toLowerCase()} onChange={(e: any)=>this.onChange(e)}></CommnetBox>
      </div>
      {commentSection}
    </div>;
  }
  cancel() {
    this.setState({newMsg: this.state.oldMsg});
    this.props.cancel();
  }
  saveComment() {
    this.props.editComment(this.state.newMsg);
  }
}