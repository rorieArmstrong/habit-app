import React from 'react';
import ReactDOM from 'react-dom'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Form from '../components/Form'

// test('renders widhout crashing', () => {
//   const wrapper = shallow(<Form />)
//   console.log(wrapper.debug()); //put in the terminal exactly what we are lookingg at the moment inside the app= it's the wrapper.
//   expect(wrapper).toBeTruthy(); //see if teh wrapper exists.  
//  const formComponent = wrapper.find("[data-test='component-form']")
//   expect(formComponent .length).toEqual(1);
// });

// describe('<Form/>', () => {
// //   it('mounts to DOM', () => {
// //       const div = document.createElement('div');
// //       ReactDOM.render(<Form />, div);
// //       ReactDOM.unmountComponentAtNode(div);
// //   });

//   let wrapper;
//   beforeEach(() => wrapper = shallow(<Form />));
//   it('Renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//   })

//   it('should render a <div />', () => {
//       expect(wrapper.find('div').length).toEqual(1);
//   });

//   it('should render a <form />', () => {
//     expect(wrapper.find('form').length).toEqual(1);
// });

// })

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}


describe('<Form />', () => {
  it('mounts to DOM', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Form />, div);
      ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper;

  beforeEach(() => wrapper = shallow(<Form />));
  it('Renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
  })

  it('should render a <div />', () => {
      expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render a <input />', () => {
      expect(wrapper.find('input').length).toEqual(2);
  });

  it('should render a <buton />', () => {
      expect(wrapper.find('button').length).toEqual(1);
  });

  it('should render a <form />', () => {
      expect(wrapper.find('form').length).toEqual(1);
  });

})

describe('Test case for testing Form',() =>{
  let wrapper;

  it('ativity check',()=>{
      wrapper = shallow(<Form/>);
      wrapper.find('input[type="text"]').simulate('change', {target: {name: 'activity', value: 'walking'}});
      expect(wrapper.state('activity')).toEqual('walking');
  });

  it('frequency check',()=>{
      wrapper = shallow(<Form/>);
      wrapper.find('[data-test="sel-frequency"]').simulate('change', {target: {name: 'frequency', value: 'weekly'}});
      expect(wrapper.state('frequency')).toEqual('weekly');
  });

  it('today checkbox check',()=>{
      wrapper = shallow(<Form/>);
      wrapper.find('input[type="checkbox"]').simulate('change', {target: {name: 'today', value: 'true'}});
      expect(wrapper.state('today')).toEqual(true);
  });


  it('form sent with right data',()=>{
      wrapper = shallow(<Form/>);
      wrapper.find('input[type="text"]').simulate('change', {target: {name: 'activity', value: 'walking'}});
      wrapper.find('[data-test="sel-frequency"]').simulate('change', {target: {name: 'frequency', value: 'weekly'}});
      wrapper.find('input[type="checkbox"]').simulate('change', {target: {name: 'today', value: 'true'}});
      wrapper.find('button').simulate('click');
      expect(wrapper.state('loading')).toBe(false);
  })

 

})

describe('ToDoList component', () => {
    describe('when rendered', () => {
      it('should fetch a list of tasks', () => {
        const fetchSpy = jest.spyOn(window, 'fetch');
        const toDoListInstance = shallow(
          <Form/>
        );
        expect(fetchSpy).toBeCalled();
      });
    });
  });