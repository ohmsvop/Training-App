import React from 'react';
import 'raf/polyfill';
import { shallow } from 'enzyme';
import moment from 'moment';
import RecordForm from '../../components/RecordForm';
import records from '../fixtures/records';

test('should render RecordForm correctly', () => {
  const wrapper = shallow(<RecordForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render RecordForm with record data', () => {
  const wrapper = shallow(<RecordForm record={records[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<RecordForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set title on input change', () => {
  const value = 'New title';
  const wrapper = shallow(<RecordForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('title')).toBe(value);
});

test('should set detail on textarea change', () => {
  const value = 'New detail';
  const wrapper = shallow(<RecordForm />);
  wrapper.find('textarea').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('detail')).toBe(value);
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<RecordForm record={records[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    title: records[0].title,
    detail: records[0].detail,
    createdAt: records[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<RecordForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<RecordForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});