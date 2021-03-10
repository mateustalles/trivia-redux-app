export default function changeC(change) {
  const CHANGE_DIFFICULTY = 'CHANGE_DIFFICULTY';
  const actionChange = { type: CHANGE_DIFFICULTY, change };
  return actionChange;
}
