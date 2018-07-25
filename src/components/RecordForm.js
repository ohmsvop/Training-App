import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class RecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movement: props.record ? props.record.movement : '',
      note: props.record ? props.record.note : '',
      weight: props.record ? props.record.weight : '',
      rep: props.record ? props.record.rep : '',
      set: props.record ? props.record.set : '',
      createdAt: props.record ? moment(props.record.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }
  onMovementChange = (e) => {
    const movement = e.target.value;
    this.setState(() => ({ movement }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onWeightChange = (e) => {
    const weight = e.target.value;
    if (!weight || weight.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({ weight }));
    }
  };
  onRepChange = (e) => {
    const rep = e.target.value;
    if (!rep || rep.match(/^\d+$/)) {
      this.setState(() => ({ rep }));
    }
  };
  onSetChange = (e) => {
    const set = e.target.value;
    if (!set || set.match(/^\d+$/)) {
      this.setState(() => ({ set }));
    }
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
    if (!this.state.movement || !this.state.weight || !this.state.rep || !this.state.set) {
      this.setState(() => ({ error: 'Please provide movement, weight, rep, and set' }))
    } else {
      this.setState(() => ({ error: '' }))
      this.props.onSubmit({
        movement: this.state.movement,
        weight: this.state.weight,
        rep: this.state.rep,
        set: this.state.set,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}

        <input
          type="text"
          placeholder="Movement"
          autoFocus
          className="text-input"
          value={this.state.movement}
          onChange={this.onMovementChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Weight"
          value={this.state.weight}
          onChange={this.onWeightChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Rep"
          value={this.state.rep}
          onChange={this.onRepChange}
        />
        <input
          type="text"
          className="text-input"
          placeholder="Set"
          value={this.state.set}
          onChange={this.onSetChange}
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
          placeholder="Add a note for your record (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button className="button">Save Record</button>
        </div>
      </form>
    )
  }
};