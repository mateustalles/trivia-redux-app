export default async function getQuestionsApi(props) {
  const {
    categorySelected, difficultySelected, typeSelected,
  } = props !== undefined ? props : '';
  const { id } = categorySelected !== undefined ? categorySelected : '';
  const token = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&encode=url3986&token=${token}&category=${id}&difficulty=${difficultySelected}&type=${typeSelected}`;
  const results = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  return results;
}
