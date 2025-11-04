import Navbar from './NavFooter/NavBar'
import Footer from './NavFooter/Footer'
import { useRouter } from 'next/router'
var showRouter=true
const Layout = ({children})=>{
    const router = useRouter();
    var pathName = router.pathname
    if (pathName === '/qgtdfreojlfghrted') {
        showRouter = false
    } else {
        showRouter = true
    }
    return(
        <>
        {showRouter?<Navbar/>:null}
        {children}
        {showRouter?<Footer/>:null}
        
        </>
    )
}
export default Layout;