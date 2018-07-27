import React from 'react';
import { shallow } from 'enzyme';
import { AddRecordPage } from '../../components/AddRecordPage';
import records from '../fixtures/records';

let startAddRecord, history, wrapper;

beforeEach(() => {
  startAddRecord = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddRecordPage startAddRecord={startAddRecord} history={history} />);
});

test('should render AddRecordPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('RecordForm').prop('onSubmit')(records[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddRecord).toHaveBeenLastCalledWith(records[1]);
});