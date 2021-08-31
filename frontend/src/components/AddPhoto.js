import { useState } from 'react'
import Button from "./Button";

function AddPhoto(props) {
    const[name, setName] = useState('');
    const[file, setFile] = useState('');
    const[tag, setTag] = useState('');

    function onSubmit(e){
        e.preventDefault();

        if(!name){
            alert("Vnesite ime!");
            return;
        }

        props.onAdd({name,tag,file});

        setName("");
        setFile("");
        setTag("");
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            <input type="text" className="form-control" name="ime" placeholder="Ime slike" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type="text" className="form-control" name="tag" placeholder="Oznake" value={tag} onChange={(e)=>{setTag(e.target.value)}}/>
            <label>Izberi sliko</label>
            <input type="file" id="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
            <Button text="Naloži"/>
        </form>
    )
}

export default AddPhoto;