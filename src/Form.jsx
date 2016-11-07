import React, {
  Component,
  PropTypes,
  Children,
  cloneElement
} from 'react';
import tools from '../tools/public_tools';
import {lang} from '../lang';
import FormCtrl from './FormCtrl';
import FormSub from './FormSub';

class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data:props.data
      };
  }
  static defaultProps={ 
    data:{},
    disabled:false
  };
 
  getFieldValue=(field=false)=>{
    let {data}=this.state;
    if(typeof field === "string"){
      if(data[field]){
        return data[field];
      }else {
        tools.log(lang.form.noField);
      }
    }else{
      return data;
    }
  }
  setFieldValue=(field,value)=>{
    let {data}=this.state;
    if(typeof field ==="object"){
      this.setState({data:field});
      return;
    }
 
    if(tools.isDefinded(field)&&tools.isDefinded(value)&&tools.isDefinded(data[field])){
        data[field]=value;
        this.setState({data});
        return;
    }else {
        tools.log(lang.form.noField);
    }
  }
  bindField=(name,value)=>{
    if(tools.isDefinded(name)&&tools.isDefinded(value)){
      let {data}=this.state;
      if(!data[name]||data[name]!=value){
        data[name]=value;

        this.setState({data})
      }
    }else{
      tools.log(lang.form.bindFieldArgErr);
    }
  }
  unbindField=(name)=>{
    let {data}=this.state;
    if(data[field]){
      delete data[name];
      this.setState(data); 
    }else{
      tools.log(lang.form.noUnbindField);
    }  
  }
  componentWillMount() {
   
  }
  componentWillReceiveProps(nextProps) {
    
  }

  renderChildren=(children)=>{
    let { data } = this.state;
    let { disabled } = this.props;
    return Children.map(children,(child)=>{
      if (!child) { return null; }
      if (typeof child === 'string') { return child; }
      let { readOnly } = child.props;
      let props = {
        readOnly: readOnly || disabled
      };
      
      
      if (child.type === FormSub) {
        props.disabled = disabled;
      } else if(child.type === FormCtrl){
        props.transmitForm={
          formData:data,
          getFieldValue:this.getFieldValue,
          setFieldValue:this.setFieldValue,
          bindField:this.bindField,
          unbindField:this.unbindField
        };
     
      }else if (child.props.children) {
        props.children = this.renderChildren(child.props.children);
      }

       return cloneElement(child, props);
    })
  }
  render(){
    let {children}=this.props;
    return(
      <div className="form-wrap-box">
        <form action="" >
           {this.renderChildren(Children.toArray(children))}
        </form>
      </div>
    )
  }
}


export default Form;