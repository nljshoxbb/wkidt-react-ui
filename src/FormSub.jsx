import React, {
  Component,
  PropTypes
} from 'react';
import tools from '../tools/public_tools';

class FormSub extends Component {
  constructor(props) {
      super(props);
      this.state = {
        validate:"",
        tips:""
      };
  }
  static defaultProps={ 
    readOnly:false,
    type:"text"
  };
  componentWillMount() {
   
  }
  componentWillReceiveProps(nextProps) {
    
  }
  render(){

    return(
      <div className="form-sub">
        FormSub
      </div>
    )
  }

}


export default FormSub;