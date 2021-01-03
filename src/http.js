const fetchAll = cb => {
  fetch('http://localhost:5000/api/tasks')
    .then(raw => {
      return raw.json();
    })
    .then(json => {
      cb(json);
    })
    .catch(err => alert(err));
};

const createTask = (title, cb) => {
  fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
    .then(raw => {
      return raw.json();
    })
    .then(json => {
      cb(json);
    })
    .catch(err => alert(err));
};

export { fetchAll, createTask };
