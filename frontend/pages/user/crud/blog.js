import Layout from "../../../components/Layout"
import Private from '../../../components/auth/Private'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'
import Dashboard from "../../../components/Dashboard"

const CreateBlog = () => {
    return (
        <Layout>
            <Dashboard>
                <h2>Create a new blog</h2>
                <BlogCreate />
            </Dashboard>
        </Layout>
    )
}



export default CreateBlog