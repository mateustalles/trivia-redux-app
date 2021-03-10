export const FORMAT_ANSWERS = 'FORMAT_ANSWERS';

export default function formatAnswers(answersClasses) {
  return { type: FORMAT_ANSWERS, answersClasses };
}
