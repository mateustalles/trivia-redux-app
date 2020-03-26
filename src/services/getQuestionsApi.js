export async function getQuestionsApi(props) {
  const { token, Cselected, Dselected } = props !== undefined ? props : '';
  const { id } = Cselected !== undefined ? Cselected : '';
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}&category=${id}&difficulty=${Dselected}&type=`;
  const results = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  return results;
}

export default getQuestionsApi;
