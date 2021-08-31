import { useState } from 'react'
import Header from './Header'

function Profile(props) {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[numOfPhotos, setPhotos] = useState('');
    const[numOfLikes, setLikes] = useState('');

    async function getProfile(){
        const res = await fetch('http://localhost:3001/users/profile', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        var profileData = await res.json();
        console.log(profileData);
        setUsername(profileData.user.username);
        setEmail(profileData.user.email);
        setPhotos(profileData.numOfPhotos);
        setLikes(profileData.numOfLikes);
    }

    getProfile();



    return (
    <>
    <Header title='Profile'/>
    <p>Ime: {username}</p>
    <p>E-Pošta: {email}</p>
    <p>Število Objav: {numOfPhotos}</p>
    <p>Število všečkov: {numOfLikes}</p>
    <a href="/">Nazaj</a>
    </>
    )
}

export default Profile;