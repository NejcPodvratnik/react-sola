import { useState } from 'react'


function Comments(props) {
    const[comment, setComment] = useState('');

    async function addComment()
    {
        await fetch('http://localhost:3001/photos/' + props.photo._id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({comment: sessionStorage.getItem("username") + ": " + comment})
        });

        var res = await fetch('http://localhost:3001/photos/' + props.photo._id);

        sessionStorage.setItem("photo", JSON.stringify(await res.json()));
        window.location="/photo";
    }

    return (
        <div>
            {sessionStorage.getItem("username") != null && <><p>Napiši Komentar:</p><textarea  rows="4" cols="50" required value={comment} onChange={(e)=>{setComment(e.target.value)}}/><br/><button onClick={addComment}>Dodaj</button><br/></>}
            <h3>Komentarji:</h3>
            {props.photo.comments.map((comment) => (<p key={comment}>{comment}</p>))}
        </div>
    )
}

export default Comments;