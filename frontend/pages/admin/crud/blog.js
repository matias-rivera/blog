import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'
import Dashboard from "../../../components/Dashboard"
import DashboardContent from "../../../components/DashboardContent"

const Blog = () => {
    return (
        <Layout>
            <Dashboard>
                <Admin>
                    <DashboardContent title={'Create Blog'}>
                        <h2>Create a new blog</h2>
                        <BlogCreate />
                    </DashboardContent>
                </Admin>
            </Dashboard>
        </Layout>
    )
}



export default Blog