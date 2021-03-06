import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogUpdate'

import Link from 'next/link'
import BlogUpdate from "../../../components/crud/BlogUpdate"
import Dashboard from "../../../components/Dashboard"
import DashboardContent from "../../../components/DashboardContent"

const Blog = () => {
    return (
        <Layout>
            <Dashboard>
                <Admin>
                    <DashboardContent title={'Update Blog'}>
                        <h2>Update blog</h2>
                        <BlogUpdate />
                    </DashboardContent>
                </Admin>
            </Dashboard>
        </Layout>
    )
}



export default Blog