import React, {
  Component,
  PropTypes,
  createElement
} from 'react';
import tools from '../tools/public_tools';
import {COMPONENTS} from '../src/higherOrders/FormItem';
import lang from '../lang/form';


class FormCtrl extends Component {
  constructor(props) {
      super(props);
      let {name}=this.props;
      this.state = {
        validate:"",
        tips:""
      };

      this.name=name?name:"FormCtrl"+(new Date()).valueOf()+parseInt(Math.random()*(1-99)+99);

  }
  static defaultProps={ 
    readOnly:false,
    type:"text",
    label:'',
    name:"",
  };

 
  componentWillMount() {
   
  }
  componentDidMount() {
    this.itemAlready(); 
  }
  componentWillReceiveProps(nextProps) {
    
  }
  itemAlready=()=>{
    let {transmitForm,value} =this.props;

    if(transmitForm){
      transmitForm.bindField(this.name,value||""); 
    }
  }
  itemChange=(value)=>{
    let {itemChange,transmitForm}=this.props;
    transmitForm.setFieldValue(this.name,value);
    if(itemChange)itemChange(value,transmitForm,this.name);
    
  }
  renderItem=(type)=>{
    let {transmitForm}=this.props;
    let props={
      type
    };
    if(transmitForm){
      props.value=transmitForm.formData[this.name];
      props.formData=transmitForm.formData;
      props.onValueChange=(value)=>{
        this.itemChange(value)
      }
    }
    return COMPONENTS[type].render(props);
  }
  render(){
    let {label,type}=this.props;
   
    if(!COMPONENTS[type]){
      return(
        <div className="form-ctrl" >
          {lang.noFormItem(type)}
        </div>
      )
    }
    
    return(
      <div className="form-ctrl" >
        <div className="form-ctrl-label">
           {label}
        </div>
        <div className="form-comp-wrap">
          {this.renderItem(type)}
        </div>
       
      </div>
    )
  }

}


export default FormCtrl;