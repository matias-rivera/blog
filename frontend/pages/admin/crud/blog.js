import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'

import Link from 'next/link'

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 py-5 text-center'>
                            <h2>Create a new blog</h2>
                        </div>
                        <div className='col-md-12'>
                           <BlogCreate />
                        </div>

                    </div>
                </div>
            </Admin>
        </Layout>
    )
}



export default Blog