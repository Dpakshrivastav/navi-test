import React from 'react';
import logo from './logo.svg';
import './button.css';

export enum ButtonType {
  Reply,
  Delete,
  Edit
}
export function Button(props: any) {
  return  <div className='button-container'>
  <input className={'button button-'+props.type?.toLowerCase() ?? ''} type="submit" value={props.value} onClick={()=>props.onClick()}></input>
 </div>;
}