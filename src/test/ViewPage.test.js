import React from 'react';
import ReactDOM from 'react-dom'
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import ViewPage from '../pages/ViewPage'


let wrapper;

beforeEach(() => wrapper = shallow(<ViewPage location={{state:{userID:1}}}/>));
it('Renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

