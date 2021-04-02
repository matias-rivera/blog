import Layout from "../../../components/Layout"
import Private from '../../../components/auth/Private'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'
import BlogRead from "../../../components/crud/BlogRead"
import {isAuth} from '../../../actions/auth'
import Dashboard from "../../../components/Dashboard"

const Blog = () => {
    const username = isAuth() && isAuth().username
    return (
        <Layout>
            <Dashboard>
                <h2>Manage blogs</h2>

                <BlogRead username={username}/>
            </Dashboard>
        </Layout>
    )
}



export default Blog