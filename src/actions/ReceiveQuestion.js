export default function receiveQuestion(results) {
  const GET_QUESTION = 'GET_QUESTION';
  const actionToken = { type: GET_QUESTION, results };
  return actionToken;
}
