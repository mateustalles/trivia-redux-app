export default function receiveQuestion(results) {
  const GET_CATEGORY = 'GET_CATEGORY';
  const actionQuestion = { type: GET_CATEGORY, results };
  return actionQuestion;
}
