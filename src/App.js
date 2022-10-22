import { useState, useEffect } from 'react';
import './App.css';
// allows us to access the db & then the collections in firebase/firestore
import {db} from './firebase';
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import Login from './Login';

function App() {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [nameChange, setNameChange] = useState('');

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  const createUser = async () => {
    // this says: add a document to the user's collection, with the following keys
    await addDoc(usersCollectionRef, {name: newName, email: newEmail});
  }

  const updateUser = async (id, name) => {
    const userDoc = doc(db, 'users', id)
    const newFields = {name: nameChange}
    await updateDoc(userDoc, newFields)
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    //any time you make a request on an API, it returns a promise. We never know how long that will take so we use async...await
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getUsers()
  }, [])

  return (
    <div className="App">

    <Login />

      <h2> User CRUD Testing </h2>
      <input placeholder='Name' onChange={(e) => {setNewName(e.target.value)}} />
      <input placeholder='Email' onChange={(e) => {setNewEmail(e.target.value)}} />
      <button onClick={createUser} >Create User</button>
      {users.map((user) => {
        return <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => {updateUser(user.id, user.name)}} >Change Name</button>
          <input onChange={(e) => {setNameChange(e.target.value)}} placeholder='Update name' />
          <button onClick={() => deleteUser(user.id)} >Delete User</button>
        </div>
      })}
    </div>
  );
}

export default App;
