import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'
import Dashboard from "../../../components/Dashboard"

const Blog = () => {
    return (
        <Layout>
            <Dashboard>
                <h2>Create a new blog</h2>
                <BlogCreate />

            </Dashboard>
                        



        </Layout>
    )
}



export default Blog