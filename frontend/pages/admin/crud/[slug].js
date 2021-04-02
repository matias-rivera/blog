import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogUpdate'

import Link from 'next/link'
import BlogUpdate from "../../../components/crud/BlogUpdate"
import Dashboard from "../../../components/Dashboard"

const Blog = () => {
    return (
        <Layout>
            <Dashboard>
                <h2>Update blog</h2>
                <BlogUpdate />
            </Dashboard>
        </Layout>
    )
}



export default Blog