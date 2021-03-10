async function tokenRequest() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const token = (localStorage.getItem('token')) ? localStorage.getItem('token') : await fetch(URL)
    .then((response) => response.json())
    .then((result) => result);
  return token;
}

export default tokenRequest;
