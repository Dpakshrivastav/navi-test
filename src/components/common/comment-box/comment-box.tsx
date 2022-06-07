import React from 'react';
import logo from './logo.svg';
import './comment-box.css';

export function CommnetBox(props: any) {
  return  <div className={'comment-box-'+props.type}>
   <input className={'text-box-'+props.type} value={props.msg} type="text" onChange={(e)=>props.onChange(e.target.value)}></input>
  </div>;;
}