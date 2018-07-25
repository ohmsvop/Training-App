import database from '../firebase/firebase';

export const addRecord = (record) => ({
  type: 'ADD_RECORD',
  record
});

export const startAddRecord = (recordData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      movement = '',
      note = '',
      weight = 0,
      rep = 0,
      set = 0,
      createdAt = 0
    } = recordData;
    const record = { movement, note, weight, rep, set, createdAt }
    return database.ref(`users/${uid}/records`).push(record).then((ref) => {
      dispatch(addRecord({
        id: ref.key,
        ...record
      }));
    });
  };
};