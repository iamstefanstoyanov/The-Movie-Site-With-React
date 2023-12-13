import notFound from '../images/404.jpg';
export default function NotFound(){
    return(
        <>
        <img style={{ width: '40%'}}className="404" src={notFound} alt="404 Not Found" />
        </>
    )
}