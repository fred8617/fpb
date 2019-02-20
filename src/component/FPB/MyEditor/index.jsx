import React,{Component} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import style from './index.less';
import {observer} from 'mobx-react';

@observer
export default class MyEditor extends Component{
  state={
    editorState:EditorState.createEmpty(),
  }
  static getDerivedStateFromProps(props, state){
    const {
      editingItem
    }=props;
    if(editingItem!==state.editingItem||editingItem.type!==state.type){
      // debugger
      let editorState=EditorState.createEmpty();
      const newContent=convertFromHTML(editingItem?.ComponentProps?.label);
      if (!newContent.contentBlocks) {
        editorState = EditorState.createEmpty();
      }else{
        const contentState = ContentState.createFromBlockArray(newContent);
        editorState=EditorState.createWithContent(contentState);
      }
      return {
        editorState,
        editingItem,
        type:editingItem.type,
      }
    }
    return null;

  }
  // componentDidMount(){
  //   const {
  //     value=""
  //   }=this.props;
  //   let editorState;
  //   const newContent=convertFromHTML(value);
  //   if (!newContent.contentBlocks) {
  //     editorState = EditorState.createEmpty();
  //   }else{
  //     const contentState = ContentState.createFromBlockArray(newContent);
  //     editorState=EditorState.createWithContent(contentState);
  //   }
  //   this.setState({editorState});
  // }
  onEditorStateChange=(editorState)=>{
    const label=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.props.onChange?.(label);
    this.setState({editorState});
  }
  render(){
    // const {
    //   editorState
    // }=this.state;
    // const {
    //   onItemLabelChange
    // }=this.props;



    return (
      <Editor
        editorState={this.state.editorState}
        wrapperClassName="editor"
        editorClassName="editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
