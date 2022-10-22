import React, {useState} from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {auth} from './firebase';

function Login() {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const register = async () => {
        try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        console.log(user)
        } catch (e) {
            console.log(e.message);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user)
            } catch (e) {
                console.log(e.message);
            }
    };

    const logout = async () => {
        await signOut(auth);
    };

  return (
    <div>

        <div>
            <h3>Register User</h3>
            <input  
                placeholder='Email' 
                onChange={(e) => {setRegisterEmail(e.target.value)}}
                />
            <input 
                placeholder='Password' 
                onChange={(e) => {setRegisterPassword(e.target.value)}}
                 />

        <button onClick={register} > Create Account </button>           
        </div>

        <div>
            <h3>Login</h3>
            <input onChange={(e) => {setLoginEmail(e.target.value)}} placeholder='Email' />
            <input onChange={(e) => {setLoginPassword(e.target.value)}} placeholder='Password' />

            <button onClick={login} >Login</button>
        </div>

        <h4>User Logged In: { user?.email } </h4>

        <button onClick={logout} > Sign Out </button>


    </div>
  )
}

export default Login