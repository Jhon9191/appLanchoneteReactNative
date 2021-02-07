import React, { createContext, useState } from 'react';

import firebase from '../services/firebase';
export const AuthContext = createContext({});

function authProvider({ children }) {
    const [user, setUser] = useState(null);

    async function cadastrar(nome, email, password) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async(value) => {
                let uid = value.user.uid;
                await firebase.database().ref('users').child(uid).set({
                    nome: nome,
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email
                        };
                        setUser(data);
                    })
            })
            .catch((error)=>{
                alert(error.code);
            })
    }

    async function logar(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async(value)=>{
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot)=>{
                let data ={
                    uid : uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                };
                setUser(data);
            })
        })
        .catch((error)=>{
            alert(error.code);
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, cadastrar, logar }}>
            {children}
        </AuthContext.Provider>
    );
}

export default authProvider;