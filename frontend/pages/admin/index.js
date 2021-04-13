import Layout from "../../components/Layout"
import Admin from '../../components/auth/Admin'
import Link from 'next/link'
import Dashboard from "../../components/Dashboard"
import DashboardContent from "../../components/DashboardContent"
import { getInfo, lastBlogs } from "../../actions/blog"
import { getCookie } from "../../actions/auth"
import { useState, useEffect } from "react"
import { getUsers } from "../../actions/user"


const AdminIndex = () => {

    const [info, setInfo] = useState({})
    const [users, setUsers] = useState([])
    const [blogs, setBlogs] = useState([])

    const token = getCookie('token')

    useEffect(() => {
        loadInfo()
        loadBlogs()
        loadUsers()
    },[])
    

    const loadInfo = () => {
        getInfo(token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setInfo(data)
            }
        })
    }

    const loadBlogs = () => {
        lastBlogs().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setBlogs(data)
            }
        })
    }

    const loadUsers = () => {
        getUsers(token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setUsers(data)
            }
        })
    }

    const showRecentBlogs = () => (
        <>
        
        {blogs.length > 0 ? <table className="table">
            <thead className='thead-dark'>
                <th>Recent blogs</th>               
            </thead>
            <tbody>
                {blogs.map((blog,i) => (
                    <tr key={i}>
                        <td>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a>{blog.title}</a>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>    
        </table>
        : <h3 className="text-center">No Blogs found</h3> }

       </>
    )

    const showUsers = () => (
    <>
        {users.length > 0 ? <table className="table">
            <thead className='thead-dark'>
                <th>New Users</th>               
            </thead>
            <tbody>
                {users.map((user,i) => (
                    <tr key={i}>
                        <td>
                            <Link href={user.profile}>
                                <a>{user.name} - {user.username}</a>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>    
        </table>
        : <h3 className="text-center">No Users found</h3> }
    </>
    )

    



    return (
        <Layout>
            <Dashboard>
                <Admin>
                    <DashboardContent title={'Dashboard'}>
                        <div className='row'>

                    
                        <div className="col-md-3 mb-2 index-button">
                            <a href="">
                                <div className="card card-body bg-light">
                                    <h2 className="text-center text-dark"><i className="fas fa-users"></i> {info.users}</h2>
                                    <h5 className="text-center text-dark">Users</h5>
                                </div>

                                </a>
                        </div>
                        <div className="col-md-3 mb-2 index-button">
                            <a href="">
                                <div className="card card-body bg-light">
                                    <h2 className="text-center text-dark"><i className="far fa-sticky-note"></i> {info.blogs}</h2>
                                    <h5 className="text-center text-dark">Blogs</h5>
                            </div>
                            </a>
                        </div>
                        <div className="col-md-3 mb-2 index-button">
                            <a href="">
                                <div className="card card-body bg-light">
                                    <h2 className="text-center text-dark"><i className="fa fa-hashtag"></i> {info.tags}</h2>
                                    <h5 className="text-center text-dark">Tags</h5>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-3 mb-2 index-button">
                            <a href="">
                                <div className="card card-body bg-light">
                                    <h2 className="text-center text-dark"><i className="fa fa-book"></i> {info.categories}</h2>
                                    <h5 className="text-center text-dark">Categories</h5>
                                </div>
                            </a>
                        </div>
                        </div>
                    </DashboardContent>

                    <DashboardContent classes={'mt-2'}>
                        <div className='row'>
                        <div className="col-md-7">
                            {showRecentBlogs()}
                        </div>


                        <div className="col-md-5">
                            {showUsers()}
                        </div>
                        </div>
                    </DashboardContent>
                </Admin>
            </Dashboard>
        </Layout>
    )
}



export default AdminIndex