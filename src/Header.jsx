import './nav.css'
const Header=(props)=>{
return(
    <header className="nav">
    <img src={props.url} alt="logo" />
    <h3>{props.title}</h3>
   
</header>
);

}

export default Header