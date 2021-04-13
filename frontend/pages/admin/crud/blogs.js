import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'
import BlogRead from "../../../components/crud/BlogRead"
import Dashboard from "../../../components/Dashboard"
import DashboardContent from "../../../components/DashboardContent"

const Blog = () => {
    return (
        <Layout>
            <Dashboard>
                <Admin>
                    <DashboardContent title={'Blogs'}>
                        <h2>Manage blogs</h2>
                        <BlogRead />
                    </DashboardContent>
                </Admin>
            </Dashboard>
        </Layout>
    )
}



export default Blog