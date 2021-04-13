import Link from "next/link";
import { useState } from "react";
import { isAuth } from "../actions/auth";
import AdminRender from "./auth/AdminRender";
import Private from "./auth/Private";


const Dashboard = ({children}) => {



    return ( 
        <>
            <Private>

                <div className='container'>

                    <div className='row'>
                        <div className='col-md-3 mb-2'>
                            <ul className='list-group'>
                                <li className={`list-group-item bg-dark`}>
                                    <Link href={isAuth() && isAuth().role== 1 ? '/admin/' : '/user/'}>
                                        <a className='text-white'><i className="fas fa-tachometer-alt"></i> Dashboard</a>
                                    </Link>
                                </li>
                        <AdminRender>
                                <li className='list-group-item'>
                                    <Link href='/admin/crud/category'>
                                        <a className='text-dark'><i className="fa fa-book"></i> Categories</a>
                                    </Link>
                                </li>

                                <li className='list-group-item'>
                                    <Link href='/admin/crud/tag'>
                                        <a className='text-dark'><i className="fa fa-hashtag"></i> Tags</a>
                                    </Link>
                                </li>
                        </AdminRender>
                                <li className='list-group-item'>
                                    <Link href={isAuth() && isAuth().role== 1 ? '/admin/crud/blog' : '/user/crud/blog'}>
                                        <a className='text-dark'><i className="fas fa-feather-alt"></i> Create Blog</a>
                                    </Link>
                                </li>
                                <li className='list-group-item'>
                                    <Link href={isAuth() && isAuth().role== 1 ? '/admin/crud/blogs' : '/user/crud/blogs'}>
                                        <a className='text-dark'><i className="far fa-edit"></i> Edit Blogs</a>
                                    </Link>
                                </li>
                  
                                <li className='list-group-item'>
                                    <Link href='/user/update'>
                                        <a className='text-dark'><i className="fas fa-user"></i> Update Profile</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-9'>
                            {children}
                        </div>

                    </div>
                </div>
            </Private>
           
        </>
     );
}
 
export default Dashboard;