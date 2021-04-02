import { isAuth } from '../../actions/auth'

const AdminRender = ({children}) => {

    return isAuth() && isAuth().role== 1 ? <>{children}</> : ''
}

export default AdminRender