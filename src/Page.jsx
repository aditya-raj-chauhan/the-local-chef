import Header from './Header';
import Input from './Input';
import './page.css'
function Page(){
    return(
<div className="page">

    <Header 
    url="https://img.pikbest.com/png-images/20241102/-22classic-chef-logo-for-culinary-brands-22_11048986.png!sw800"
    title="the local chef"
    />
     
    <Input />

</div>
    );
}
export default Page