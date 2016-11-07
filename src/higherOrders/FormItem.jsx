import React, {
  Component,
  createElement,
  PropTypes
} from 'react';
import tools from '../../tools/public_tools';
import lang from '../../lang/form';
export const COMPONENTS={}
export const enhance = (ComponsedComponent) =>{
  class FormItem extends Component {

    constructor(props) {
      super(props);
      
    }


    componentDidMount() {
      
    }

    componentWillUnmount() {
     
    }

    
    render() {

      return <ComponsedComponent {...this.props}  />;
    }
  };
  return FormItem;
}

export const regComp=(ComposedComponent, types = [], options = {})=>{
  let newComponent = enhance(ComposedComponent);
  if (!Array.isArray(types)) {
    types = [types];
  }

  types.forEach((type) => {

    if (COMPONENTS.hasOwnProperty(type)) {
      console.warn(lang.formItemReged(type));
      return;
    }

    let {
      valueType,
      render
    } = options;
    if (!valueType) {
      valueType = ['integer', 'number'].indexOf(type) > -1 ? 'number' : 'string';
    }

    if (!render) {
      render = (props) => createElement(newComponent, props);
    }

    COMPONENTS[type] = {
      render,
      valueType,
      component: ComposedComponent
    }
  });
  console.log(newComponent)
  return newComponent;
}

