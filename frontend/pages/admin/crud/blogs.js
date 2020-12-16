import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'
import BlogRead from "../../../components/crud/BlogRead"

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 py-5 text-center'>
                            <h2>Manage blogs</h2>
                        </div>
                        <div className='col-md-12'>
                           <BlogRead />
                        </div>

                    </div>
                </div>
            </Admin>
        </Layout>
    )
}



export default Blog