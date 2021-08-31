import Button from './Button';
import Header from './Header';
import Comments from './Comments';


function DisplayPhoto(props) {
    var photo = JSON.parse(props.photo);

    async function flag()
    {
        await fetch('http://localhost:3001/photos/' + photo._id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({flagCount: photo.flagCount + 1})
        });

        var res = await fetch('http://localhost:3001/photos/' + photo._id);

        sessionStorage.setItem("photo", JSON.stringify(await res.json()));
        window.location="/photo";
    }

    return (
        <>
        <Header title='Slika'/>
        <div>
            <img src={"http://localhost:3001/"+photo.path} alt={photo.name}/>
            <h5>{photo.name}</h5>
            <p>Datum: {photo.date}</p>
            <p>Avtor: {photo.author}</p>
            <p>Št. Všečkov: {photo.likes}</p>
            <Button text="Označi za nezaželeno vsebino!" onClick={flag}></Button>
        </div>
        <a class="text-decoration-none" href="/" onClick={() => sessionStorage.removeItem(photo)}>Nazaj</a>
        <Comments photo={photo}/>
        </>
    )
}

export default DisplayPhoto;