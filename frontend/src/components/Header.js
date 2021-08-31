async function logout() {
    fetch('http://localhost:3001/users/logout', {
        method: 'GET',
        credentials: 'include'
    });
    sessionStorage.removeItem("username");
}

function Header(props){
    return(
        <header>
            <label>Pozdravljen, {sessionStorage.getItem("username")}!</label>
            <a class="text-decoration-none m-3" href="/profile">Profil</a>
            <a class="text-decoration-none" href="/" onClick={logout}>Odjava</a><br/>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;