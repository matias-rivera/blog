import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogUpdate'

import Link from 'next/link'
import BlogUpdate from "../../../components/crud/BlogUpdate"

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 py-5 text-center'>
                            <h2>Update blog</h2>
                        </div>
                        <div className='col-md-12'>
                           <BlogUpdate />
                        </div>

                    </div>
                </div>
            </Admin>
        </Layout>
    )
}



export default Blog