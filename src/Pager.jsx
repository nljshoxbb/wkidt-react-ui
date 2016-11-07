var React = require('react');
var indexOf = function(arr,val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
};
var removeArr = function(arr,val) {
  var index = indexOf(arr,val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

var showStyle={display:"inline"};
var hideStyle={display:"none"};
var Pager = React.createClass({
	getDefaultProps:function(){
	    return {
	    	all_num:0,
        all_page_num:0,
        sel_index:1
	    };
	},
  getInitialState: function() {
      return {
        all_num:this.props.all_num,
        all_page_num:this.props.all_page_num,
        sel_index:this.props.sel_index
      };
    },
  componentDidMount: function () {
   
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.sel_index!=this.props.sel_index){
      this.setState({sel_index:nextProps.sel_index});
    }
    if(nextProps.all_page_num!=this.props.all_page_num){
      this.setState({all_page_num:nextProps.all_page_num});
    }
    if(nextProps.all_num!=this.props.all_num){
      this.setState({all_num:nextProps.all_num});
    }
  },
  componentWillUnmount: function () {
   
  },
  setSelIdx:function(idx){
    if(this.props.onSetSelIdx){
      this.props.onSetSelIdx(idx)
    }
  },
  selChange:function(event){


    let theVal= event.target.value;
   
    if(!isNaN(theVal)&&theVal>=this.state.sel_index&&theVal<=this.state.all_page_num){
      this.setSelIdx(theVal);
    }
  },
  getTel:function(){
    var numHtml=[];
    var _this=this;
    for (var i = 1; i <=7; i++) {
      var thisIdx=this.props.sel_index-4+i
      var activeClass=this.props.sel_index == thisIdx?"active":"";
      if(thisIdx>0&&thisIdx<=this.props.all_page_num){
        numHtml.push(<a key={i} onClick={_this.setSelIdx.bind(this,thisIdx)} className={"page-idx ml5 mr5 "+activeClass}>{thisIdx}</a>);
      }
    }
    return numHtml;
  },
  render: function() {

      if(this.state.all_num==0){
        return (
          <div className="page tc">
            已无更多数据
          </div>
        );
      }
	    return (
        <div className="page tc">
          <a href="javascript:;" onClick={this.setSelIdx.bind(this,1)} style={this.props.sel_index>1?showStyle:hideStyle} className="page-idx  ml5 mr5">首页</a>
          <a href="javascript:;" onClick={this.setSelIdx.bind(this,parseInt(this.props.sel_index)-1)} style={this.props.sel_index>1?showStyle:hideStyle} className="page-idx  ml5 mr5">上一页</a>
          {this.getTel()}
          <a href="javascript:;" onClick={this.setSelIdx.bind(this,parseInt(this.props.sel_index)+1)} style={this.props.sel_index<this.props.all_page_num?showStyle:hideStyle} className="page-idx  ml5 mr5">下一页</a>
          <input type="text" value={this.props.sel_index} onChange={this.selChange} className="page-input uba1 w50 pl5 pr2 fuzzy-border mr10" /> 
          共计<span className="base-color fs18 ml5 mr5">{this.props.all_page_num}</span>页,
          <span className="base-color fs18 ml5 mr5">{this.props.all_num}</span>条
        </div>
	    );
	}
});
module.exports = Pager;


