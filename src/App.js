import React from 'react';

const fakeUsers = [
  {
    id: '1',
    name: 'Robin',
  },
  {
    id: '2',
    name: 'Dennis',
  },
];

function getFakeUsers() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeUsers), 2000)
  );
}

function updateFakeUserName(users, id, name) {
  const updatedUsers = users.map((user) => {
    if (user.id === id) {
      return { id, name };
    } else {
      return user;
    }
  });

  return new Promise((resolve) =>
    setTimeout(() => resolve(updatedUsers), 1000)
  );
}

function App() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const data = await getFakeUsers();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  async function handleUpdateName(item, name) {
    const newUsers = await updateFakeUserName(users, item.id, name);

    setUsers(newUsers);
  }

  return (
    <div>
      <h1>Derive State from Props in React</h1>

      <List list={users} onUpdateName={handleUpdateName} />
    </div>
  );
}

function List({ list, onUpdateName }) {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.id} item={item} onUpdateName={onUpdateName} />
      ))}
    </ul>
  );
}

function Item({ item, onUpdateName }) {
  // derive initial state from props
  const [name, setName] = React.useState(item.name);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  // derive updated state from props
  React.useEffect(() => {
    setName(item.name);
  }, [item]);

  return (
    <li>
      {item.name}
      <input type="text" value={name} onChange={handleNameChange} />
      <button type="button" onClick={() => onUpdateName(item, name)}>
        Update
      </button>
    </li>
  );
}

export default App;
