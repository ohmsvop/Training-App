import moment from 'moment';

export default [{
  id: '1',
  title: 'Chest',
  detail: 'Bench press',
  createdAt: 0
}, {
  id: '2',
  title: 'Back',
  detail: 'Deadlift',
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  title: 'Leg',
  detail: 'Squat',
  createdAt: moment(0).add(4, 'days').valueOf()
}];