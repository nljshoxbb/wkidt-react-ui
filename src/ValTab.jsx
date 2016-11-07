import React, {
  Component,
  PropTypes
} from 'react';
import tools from '../tools/public_tools';
let theTime=new Date();
const defaultProps={ 
  valueList:[],
  idx:0,
  value:"",
  onChangeValue: function(){}
};
class ValTab extends Component {
  constructor(props) {
      super(props);
      let now=new Date();
      this.timer=null;
      this.speed=300;
      this.state = {
        loading:true,
        valueList:this.props.valueList,
        idx:this.props.valueList.length-1,
      };
      
  }
  componentWillMount() {
    let _this=this;
  }
  turnValIdx=(val)=>{
    let checkVal=tools.filterObjVal(this.state.valueList,val,'val');

    if(checkVal && val!=this.state.valueList[this.state.idx].val){
      this.setState({idx:parseInt(checkVal.idx)});
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.valueList.join(',')!=this.state.valueList.join(',')){
      this.setState({valueList:nextProps.valueList});
    }
    this.turnValIdx(nextProps.value)
  }
  componentDidMount() {
    if(this.refs.scrollBox.addEventListener){
      this.refs.scrollBox.addEventListener('DOMMouseScroll',(event)=>{ this.scrollFunc(event); },false);
    }//W3C
    this.refs.scrollBox.onmousewheel=this.refs.scrollBox.onmousewheel=(event)=>{ this.scrollFunc(event); }//IE/Opera/Chrome  
  }
  scrollFunc=(event)=>{
    let scrollDelta=false;
    if (event&&event.preventDefault ) {
      event.preventDefault(); 
    }else{
      window.event.returnValue = false; 
    }
    if(event.wheelDelta){
      scrollDelta=event.wheelDelta;
    }else if(event.detail){
      scrollDelta=event.detail;
    }

    if(scrollDelta>0){
      this.turnBtnCli(1);
    }else if(scrollDelta < 0){
      this.turnBtnCli(-1);
    }
  }
  turnBtnCli=(num)=>{

    let nextIdx=this.state.idx+num;
    if(this.props.valueList.length > nextIdx && nextIdx >= 0){
      this.setState({idx:nextIdx});
      if(this.props.onChangeValue) this.props.onChangeValue(this.props.valueList[nextIdx]);
    }else{
      this.onMouseUpFn()
    }
  }
  setTimeFn=(num)=>{
    if(this.speed>50){
      this.speed-=50;
    }
    this.turnBtnCli(num)
    this.timer=setTimeout(()=>{
      this.setTimeFn(num)
    },this.speed)
  }
  onMouseDownFn=(num)=>{
    this.setTimeFn(num)
  }
  onMouseUpFn=()=>{
    this.speed=300;
    clearTimeout(this.timer);
  }
  render(){
    let state=this.state;
    return(
      <div className="val-tab">
        <div className="val-plus val-btn" onMouseUp={()=>{ this.onMouseUpFn(); }} onMouseDown={()=>{ this.onMouseDownFn(+1)  }}>+</div>
        <div ref="scrollBox" className="val-sel-box" title="滑动滚轮可修改">
          {this.state.valueList[this.state.idx].tit}
        </div>
        <div className="val-minus val-btn" onMouseUp={()=>{ this.onMouseUpFn(); }} onMouseDown={()=>{ this.onMouseDownFn(-1)  }}>-</div>
      </div>

      
    )
  }

}

ValTab.defaultProps = defaultProps;
export default ValTab;