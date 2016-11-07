/** 
* @fileOverview react input组件封装 
* @author <a href="">pan</a> 
* @version 0.1 
*/ 
/** 
* @author pan 

* @description react input组件封装  
* @since version 0.1 
* @param  Props {String} value         input组件的值,从外部传入可直接表单回填 
* @param  Props {String} title         标题 
* @param  Props {String} name          input组件的name 
* @param  Props {String} type          input组件的类型目前支持  input,textarea,select,hidden
* @param  Props {String} optionsArr    type为select时渲染的节点数据[{tit:'',val:''}]
* @param  Props {Function} onValueChange 从外部传入事件，当value改变时调用，可向外部传参
* @param  Props {Bool} ispwd           type为input时,为true则为密码表单
* @param  Props {String} title         标题 
*/ 

import React,{Component} from 'react';
import { regComp } from './higherOrders/FormItem';
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEd:false,
      value:this.props.value,
      textareaHeight:false
    }
    this.firstHeight=0;
    this.typeHtml={
    input:function(o){

      let type=o.props.ispwd?"password":"text";
      let style=o.props.width?{width:o.props.width}:{}
      return   <input type={type} name={o.props.name} style={style} placeholder={o.props.placeholder||""} ref="textInput" value={o.state.value} onChange={o.change} className="input" />
    },
    textarea:function(o){
      return  <textarea ref="textInput" value={o.state.value}  style={{width:o.props.width}} onChange={o.textareaChange} placeholder={o.props.placeholder||""} className="textarea" name={o.props.name} ></textarea>;
    }
  }
  }
  static defaultProps={ 
    value:"",
    title:"",
    name:"",
    type:"input",
    width:false,
    optionsArr:[],
    onValueChange:false,
    ispwd:false,
  };
  componentWillMount(){
   
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value!=this.props.value){
      this.setState({value:nextProps.value});
    }
  }
  getStateProps=()=>{
    if(this.props.getStateProps){
      this.props.getStateProps()
    }
  }
  change=()=>{
    var value=this.refs.textInput.value||event.target.value||"";
    this.setState({value:value});

    if(this.props.onValueChange)this.props.onValueChange(value);
  }
  

  textareaChange=(event)=>{
    var tH=this.state.textareaHeight;
    if(this.firstHeight==0){
      this.firstHeight=event.target.offsetHeight;
    }
    event.target.style.height=this.firstHeight+'px';
    tH=event.target.scrollHeight;
    event.target.style.height=tH+'px';
    var value=this.refs.textInput.value||event.target.value||"";
    this.setState({value:value});
  
    if(this.props.onValueChange)this.props.onValueChange(value);
  }


    render() {
      if(this.props.type!="hidden"){
          var value = this.state.value;
          var focusClass=value&&value!=""?" focus":"";
          return  this.typeHtml["input"](this);
              
      }else{
        return (<input type="hidden"   value={this.state.value}  name={this.props.name} />);
      }
    }
}

module.exports = regComp(Input, 'text');
export const Checkbox = Input;
