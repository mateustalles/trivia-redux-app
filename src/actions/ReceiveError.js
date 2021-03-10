export default function receiveQuestion(error) {
  const ERROR = 'ERROR';
  const actionError = { type: ERROR, error };
  return actionError;
}
