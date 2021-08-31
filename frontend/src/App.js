
import {useState, useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import Button from './components/Button';
import Photos from './components/Photos';
import AddPhoto from './components/AddPhoto';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import DisplayPhoto from './components/DisplayPhoto.js';


function App() {

    const [photos, setPhotos] = useState([]);
    const [showAddPhoto, setShowAddPhoto] = useState(false);
    const [sort, setSort] = useState(true);
    const [tag, setTag] = useState("");

    useEffect(function () {
        const getPhotos = async function () {
            if(sort)
            {
                const res = await fetch('http://localhost:3001/photos/decay');
                const data = await res.json();
                console.log(data);
                setPhotos(data);
            }
            else
            {
                const res = await fetch('http://localhost:3001/photos/');
                const data = await res.json();
                console.log(data);
                setPhotos(data);
            }
        }
        getPhotos();
    },[sort]);

    async function addPhoto(task) {
        const formData = new FormData();
        formData.append('name', task.name);
        formData.append('tag', task.tag);
        formData.append('slika', task.file);

        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();
        setPhotos([...photos, data]);
    }

    function toggle(){
        setSort(!sort);
    }

    function toggleAddPhoto(){
        setShowAddPhoto(!showAddPhoto);
    }

    async function search(e){
        e.preventDefault();

        var res;
        if(tag === "")
            res = await fetch('http://localhost:3001/photos/decay');
        else
            res = await fetch('http://localhost:3001/photos/search/' + tag);
        const data = await res.json();
        console.log(data);
        setPhotos(data);

        setTag("");
    }

    return (
        <BrowserRouter>
            <div className='container'>

                <Route path='/' exact>
                    <div>
                        {sessionStorage.getItem("username") == null && <><a class="text-decoration-none m-3" href="/login">Prijava</a><a class="text-decoration-none" href="/register">Registracija</a><br/></>}
                        {sessionStorage.getItem("username") != null && <><Header title='Slike'/><Button text={showAddPhoto ? 'Prekliči' : 'Dodaj sliko'} onClick={toggleAddPhoto}/><br/></>}
                        {showAddPhoto && <AddPhoto onAdd={addPhoto}/>}
                        {showAddPhoto || <><br/><form className="form-group" onSubmit={search}><input type="text" className="form-control w-50" name="tag" placeholder="Napiši Oznako" value={tag} onChange={(e)=>{setTag(e.target.value)}}/><Button text="Išči"/></form><br/><Button text={sort ? 'Sortiraj po času' : 'Sortiraj po aktivnosti'} onClick={toggle}/><br/><br/><Photos photos={photos}/></>}
                    </div>
                </Route>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/register'>
                    <Register/>
                </Route>
                <Route path='/profile'>
                    <Profile/>
                </Route>
                <Route path='/photo'>
                    <DisplayPhoto photo={sessionStorage.getItem("photo")}/>
                </Route>
            </div>
        </BrowserRouter>
    );
}

export default App;
