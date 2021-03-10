export default function changeC(change) {
  const CHANGE_TYPE = 'CHANGE_TYPE';
  const actionChange = { type: CHANGE_TYPE, change };
  return actionChange;
}
