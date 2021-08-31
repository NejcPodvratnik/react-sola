import Button from './Button'
function Photo(props) {

    async function like()
    {
        await fetch('http://localhost:3001/photos/' + props.photo._id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({likes: props.photo.likes + 1,likedBy: sessionStorage.getItem("username")})
        });
        window.location="/";
    }

    function displayPhoto()
    {
        sessionStorage.setItem("photo",JSON.stringify(props.photo));
        window.location="/photo";
    }

    return (
        <div className="bg-light col-4">
            <img className="h-90 w-100" src={"http://localhost:3001/"+props.photo.path} alt={props.photo.name}/>
            <h5>{props.photo.name}</h5>
            <p>Oznake: {props.photo.tag}</p>
            <p>Datum: {props.photo.date}</p>
            <p>Avtor: {props.photo.author}</p>
            <p>Št. Všečkov: {props.photo.likes}</p>

            {sessionStorage.getItem("username") != null && !props.photo.likedBy.includes(sessionStorage.getItem("username")) && <Button text="Všečkaj" onClick={() => like()}/>}
            {sessionStorage.getItem("username") != null && props.photo.likedBy.includes(sessionStorage.getItem("username")) && <label>Všečkano</label>}

            <br/><button onClick={displayPhoto}>Preberi Več</button>
        </div>
    )
}

export default Photo;