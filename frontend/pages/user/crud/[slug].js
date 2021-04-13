import Layout from "../../../components/Layout"
import Private from '../../../components/auth/Private'
import BlogCreate from '../../../components/crud/BlogUpdate'

import Link from 'next/link'
import BlogUpdate from "../../../components/crud/BlogUpdate"
import Dashboard from "../../../components/Dashboard"
import DashboardContent from '../../../components/DashboardContent'

const Blog = () => {
    return (
        <Layout>
            <Dashboard>
                <Private>
                    <DashboardContent title={'Update Blog'}>
                        <h2>Update blog</h2>
                        <BlogUpdate />
                    </DashboardContent>
                </Private>
            </Dashboard>
        </Layout>
    )
}



export default Blog