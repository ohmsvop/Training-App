import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.record ? props.record.title : '',
      detail: props.record ? props.record.detail : '',
      createdAt: props.record ? moment(props.record.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onDetailChange = (e) => {
    const detail = e.target.value;
    this.setState(() => ({ detail }));
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title || !this.state.detail) {
      this.setState(() => ({ error: 'Please provide title and detail' }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit({
        title: this.state.title,
        createdAt: this.state.createdAt.valueOf(),
        detail: this.state.detail
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}

        <input
          type="text"
          placeholder="Title"
          autoFocus
          className="text-input"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          className="textarea"
          placeholder="Add a detail for your record (optional)"
          value={this.state.detail}
          onChange={this.onDetailChange}
        >
        </textarea>
        <div>
          <button className="button">Save Record</button>
        </div>
      </form>
    )
  }
};