import React, {
  Component,
  PropTypes
} from 'react';
import tools from '../tools/public_tools';
import ValTab from '../components/ValTab';
let theTime=new Date();
const defaultProps={ 
  startYear:theTime.getFullYear()-30,
  endYear:theTime.getFullYear(),
  stateDayList:[],
  format:"Y-m-d H:i:s",
  value:'',
  onGetDate: function(){}
};
class TimeSelector extends Component {
  constructor(props) {
      super(props);
      let now=new Date();
      this.value=this.props.value;
      this.state = {
        loading:true,
        stateDayList:this.props.stateDayList,
        selectYear:now.getFullYear(),
        selectMonth:now.getMonth()+1,
        selectDay:now.getDate(),
        selectHours:now.getHours(),
        selectMinutes:now.getMinutes(),
        selectSeconds:now.getSeconds(),
      };
      
  }
  componentWillMount() {
    let _this=this;

    if(this.props.value){ this.reSetTime(this.props.value);}
    this.optionYear=this.getOption(
      this.props.endYear-this.props.startYear,
      (i)=>{ 
        return {val:this.props.startYear+i,tit:this.props.startYear+i+"年"}
      }
    );
    this.optionMouth=this.getOption(
      11,
      (i)=>{ 
        return {val:i+1,tit:i+1+"月"}
      }
    );
    
    this.optionHours=this.getOption(
      23,
      (i)=>{ 
        return {val:i,tit:i+"时"}
      }
    );
    this.optionMinutes=this.getOption(
      59,
      (i)=>{ 
        return {val:i,tit:i+"分"}
      }
    );
    this.optionSeconds=this.getOption(
      59,
      (i)=>{ 
        return {val:i,tit:i+"秒"}
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.stateDayList!=this.state.stateDayList&& typeof(nextProps.stateDayList)=="object") {
      this.setState({stateDayList:nextProps.stateDayList});
    }
    if(nextProps.value&& nextProps.value!=this.value){this.reSetTime(nextProps.value);}
  }
  reSetTime=(val)=>{
      this.value=val;
      let state=this.state;
      let typeArr=this.value.split(' ');
      let dateArr=[];
      let timeArr=[];
      if(typeArr[0].indexOf('-')>=0){
        dateArr=typeArr[0].split('-');
        timeArr=typeArr[1]?typeArr[1].split(':'):[];
      }else{
        timeArr=typeArr[0].split(':');
      } 
      let allDateArr=['selectYear','selectMonth','selectDay']
      let allTimeArr=['selectHours','selectMinutes','selectSeconds'];
      let setState={};
      for(let i in dateArr){
        setState[allDateArr[i]]=dateArr[i];
      }
      for(let i in timeArr){
        setState[allTimeArr[i]]=timeArr[i];
      }
      this.setState(setState);

  }
  goBack(){
    history.go(-1);
  }
  getDayArr=(year,mouth)=>{
    let day = new Date(year, mouth, 0);
    let daycount = day.getDate();
    this.optionDay=this.getOption(
      daycount-1,
      (i)=>{ 
        return {val:i+1,tit:i+1+"日"}
      }
    );
  }
  getOption=(ex,valFn)=>{
    let opt=[]
    for(let i=0;i<=ex;i++){
      opt.push(valFn(i));
    }
    return opt;
  }
  goSub=()=>{
    let val=this.props.format;
    let state=this.state;
    let strArr=['Y','m','d','H','i','s'];
    let valArr=[state.selectYear,state.selectMonth,state.selectDay,state.selectHours,state.selectMinutes,state.selectSeconds]
    for(let i in strArr){
      val = val.replace(strArr[i],valArr[i]);
    }
    this.value=val;
    if(this.props.onGetDate)this.props.onGetDate(val)
  }
  checkHave=(str)=>{
    return this.props.format.indexOf(str);
  }
  render(){
    let now=new Date();
    let dayArr=this.getDayArr(this.state.selectYear,this.state.selectMonth)
   
    return(
      <div className="tc">
        {this.checkHave("Y")>=0?<ValTab valueList={this.optionYear} value={this.state.selectYear} onChangeValue={(obj)=>{ this.setState({selectYear:obj.val}) }} ></ValTab>:""}
        {this.checkHave("m")>=0?<ValTab valueList={this.optionMouth}  value={this.state.selectMonth} onChangeValue={(obj)=>{ this.setState({selectMonth:obj.val}) }} ></ValTab>:""}
        {this.checkHave("d")>=0?<ValTab valueList={this.optionDay}  value={this.state.selectDay} onChangeValue={(obj)=>{ this.setState({selectDay:obj.val}) }} ></ValTab>:""}
        {this.checkHave("H")>=0?<ValTab valueList={this.optionHours}  value={this.state.selectHours} onChangeValue={(obj)=>{ this.setState({selectHours:obj.val}) }} ></ValTab>:""}
        {this.checkHave("i")>=0?<ValTab valueList={this.optionMinutes}  value={this.state.selectMinutes} onChangeValue={(obj)=>{ this.setState({selectMinutes:obj.val}) }} ></ValTab>:""}
        {this.checkHave("s")>=0?<ValTab valueList={this.optionSeconds}  value={this.state.selectSeconds} onChangeValue={(obj)=>{ this.setState({selectSeconds:obj.val}) }} ></ValTab>:""}
        <div className="pt20">
          <a href="javascript:;" onClick={this.goSub} className="btn base-btn w150">确定</a>
        </div>
      </div>
      
    )
  }

}

TimeSelector.defaultProps = defaultProps;
export default TimeSelector;