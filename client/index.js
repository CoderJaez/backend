const fetchData = fetch(`http://localhost:3000/api/students/`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((e) => console.error(e));
