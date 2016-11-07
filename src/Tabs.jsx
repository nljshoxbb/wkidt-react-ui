var React = require('react');
var Tabs = React.createClass({
	getDefaultProps:function(){
	    return {
        active:0,
        btnBoxClass:"top-tab-box",
        btnClass:"tab-btn",
        scroll:true
	    };
	},
  getInitialState: function() {
      return {
        active:this.props.active,
      };
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.active!=this.state.active){
      this.setState({show:nextProps.active});
    }
  },
  componentDidMount: function () {
    if(this.props.ifBindSP&&PubSub){
      this.pubsub_token = PubSub.subscribe(this.props.name, function (evename,stateObj) {
        this.setState(stateObj);
      }.bind(this));
    }
  },
  componentWillUnmount: function () {
    if(this.props.ifBindSP&&PubSub){
      PubSub.unsubscribe(this.pubsub_token);
    }
  },
  selTab:function(idx,obj){
    this.setState({active:idx});
    if(this.props.onSelect){
      this.props.onSelect(idx,obj);
    }
  },
  render: function() {
      
      return (
        <div className="">
          <div className={"tab-head clearfix tc " +this.props.btnBoxClass}>
        
              {this.props.children.map(function(obj,index){
                var activeClass=this.state.active==index?" active":""
                return(
                  <div  key={index} onClick={this.selTab.bind(this,index)} className={"ub-f1 "+this.props.btnClass+" "+activeClass}>{obj.props.title}</div>
                )
              },this)}
          
          </div>
          <div className="tab-cont">
            {this.props.children.map(function(obj,index){
              var activeClass=this.state.active==index?" active":""
              return(
                <div key={index} className={"tab-box"+activeClass}>{obj}</div>
              )
            },this)}
          </div>
        </div>  
      )
	}
});

module.exports = Tabs;


