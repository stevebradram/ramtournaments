import Navbar from './NavFooter/NavBar'
import Footer from './NavFooter/Footer'
import { useRouter } from 'next/router'
const Layout = ({children})=>{
    const router = useRouter();
    const isSpecialPath = router.pathname === '/qgtdfreojlfghrted';
    const showRouter = !isSpecialPath;
    return(
        <>
        {showRouter?<Navbar/>:null}
        {children}
        {showRouter?<Footer/>:null}
        
        </>
    )
}
export default Layout;