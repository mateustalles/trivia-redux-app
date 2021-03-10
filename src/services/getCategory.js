export default async function getCategory() {
  const URL = 'https://opentdb.com/api_category.php';
  const results = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
  return results;
}
