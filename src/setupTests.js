import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import fetch from './test/mock/fetch'

global.fetch = fetch;
Enzyme.configure({ adapter: new EnzymeAdapter() });