var React = require('react');

var PageModal = React.createClass({
	getDefaultProps:function(){
	    return {
        show:false,
        title:"新窗口",
        type:"checkbox",
        ifBindSP:false,
        onClose:function(){

        },
        bgClass:"",
        scroll:true
	    };
	},
  getInitialState: function() {
      return {
          show:this.props.show,
        };
  },
  componentWillReceiveProps:function(nextProps){
    if(nextProps.show!=this.state.show){
      this.setState({show:nextProps.show});
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
  closeModal:function(){
    this.setState({show:false});
    this.props.onClose();
  },
  render: function() {
      var style={display:this.state.show?"block":"none"};
      var bgClass=this.state.show?"in":"";
      var modelClass=this.state.show?"":"hide";
      document.body.style.overflow=this.state.show?"hidden":"visible";
      var scrollClass=this.props.scroll?"oya":"oh";
      return (
            <div className="page-model fixed "  style={style}>
            <div className={"page-model-bg "+bgClass}></div>
            <div className={"page-model-in white-bg ub-fv ub ub-ver "+modelClass}>
                <div className="base-bg pt05 headbar ub ub-ac  ub-pc pb05">
                    <div className="head-icon left pl5" onClick={this.closeModal}>
                        <div className="iconfont icon-fanhui white-color fs32 "></div>
                    </div>
                    <div className="tc white-color">{this.props.title}</div>
                </div>
                <div className={this.props.bgClass+" page-model-cont ub-f1 "+scrollClass}>
                  {this.props.children}
                </div>
                
                
            </div>
        </div>
          )
	}
});

module.exports = PageModal;


