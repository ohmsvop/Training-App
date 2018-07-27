import database from '../firebase/firebase';

export const addRecord = (record) => ({
  type: 'ADD_RECORD',
  record
});

export const startAddRecord = (recordData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      detail = '',
      createdAt = 0
    } = recordData;
    const record = { title, detail, createdAt }
    return database.ref(`users/${uid}/records`).push(record).then((ref) => {
      dispatch(addRecord({
        id: ref.key,
        ...record
      }));
    });
  };
};