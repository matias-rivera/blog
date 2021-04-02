import Link from "next/link";
import AdminRender from "./auth/AdminRender";
import Private from "./auth/Private";


const Dashboard = ({children}) => {
    return ( 
        <>
            <Private>
                <div className='container'>
                        <div className='col-12'>
                            <h2>Dashboard</h2>
                        </div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminRender>
                                <ul className='list-group'>
                                    <li className='list-group-item active'>
                                        Admin
                                    </li>
                                    <li className='list-group-item'>
                                        <Link href='/admin/crud/category'>
                                            <a>Categories</a>
                                        </Link>
                                    </li>

                                    <li className='list-group-item'>
                                        <Link href='/admin/crud/tag'>
                                            <a>Tags</a>
                                        </Link>
                                    </li>
                                    <li className='list-group-item'>
                                        <Link href='/admin/crud/blog'>
                                            <a>Create Blog</a>
                                        </Link>
                                    </li>
                                    <li className='list-group-item'>
                                        <Link href='/admin/crud/blogs'>
                                            <a>Edit Blogs</a>
                                        </Link>
                                    </li>
                                </ul>
                            </AdminRender>
                            <ul className='list-group my-2'>
                                <li className='list-group-item active'>
                                    User
                                </li>
                                <li className='list-group-item'>
                                    <Link href='/user/crud/blog'>
                                        <a>Create Blog</a>
                                    </Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link href='/user/crud/blogs'>
                                        <a>Edit Blogs</a>
                                    </Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link href='/user/update'>
                                        <a>Update Profile</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-9 bg-white pt-2 rounded list-group-item'>
                            {children}
                        </div>

                    </div>
                </div>
            </Private>
           
        </>
     );
}
 
export default Dashboard;