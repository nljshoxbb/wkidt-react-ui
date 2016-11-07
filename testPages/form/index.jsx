import React,{Component} from 'react';
import Form from '../../src/Form';
import FormCtrl from '../../src/FormCtrl';
import Input from '../../src/Input';
class Wrap extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'Form';
        this.state = {
          
        }
    }

    componentWillMount() {

    }
    render() {
        return (
          <div className="main " style={{backgroundColor: "#fff",margin:"50px",padding:"50px",border:"1px solid #eee"}}>
             <FormCtrl label="姓名" />
            <Form >
              <div>123213</div>
              <div>
               
              </div>
              <FormCtrl label="密码"  />
              <FormCtrl />
              <FormCtrl />
            </Form>
          </div>
        )
    }
}




export default Wrap;
