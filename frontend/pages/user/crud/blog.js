import Layout from "../../../components/Layout"
import Private from '../../../components/auth/Private'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'
import Dashboard from "../../../components/Dashboard"
import DashboardContent from "../../../components/DashboardContent"

const CreateBlog = () => {
    return (
        <Layout>
            <Dashboard>
                <Private>
                    <DashboardContent title={'Create Blog'}>
                        <h2>Create a new blog</h2>
                        <BlogCreate />
                    </DashboardContent>
                </Private>
            </Dashboard>
        </Layout>
    )
}



export default CreateBlog