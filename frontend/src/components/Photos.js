import Photo from './Photo'

function Photos(props) {
    return (
        <div className="row">
        {props.photos.map((photo) => (
            <Photo key={photo._id} photo={photo}/>
        ))}
        </div>
    )
}

export default Photos;