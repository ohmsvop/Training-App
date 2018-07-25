import React from 'react';
import { connect } from 'react-redux';
import RecordForm from './RecordForm';
import { startAddRecord } from '../actions/records';

export class AddRecordPage extends React.Component {
  onSubmit = (record) => {
    this.props.startAddRecord(record)
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Record</h1>
          </div>
        </div>
        <div className="content-container">
          <RecordForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  startAddRecord: (record) => dispatch(startAddRecord(record))
});

export default connect(undefined, mapDispatchToProps)(AddRecordPage);
