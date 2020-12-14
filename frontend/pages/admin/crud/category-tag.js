import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import Link from 'next/link'
import Category from '../../../components/crud/Category'
import Tag from "../../../components/crud/Tag"

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 py-5 text-center'>
                            <h2>Manage Categories and Tags</h2>
                        </div>
                        <div className='col-md-6'>
                           <Category />
                        </div>
                        <div className='col-md-6'>
                            <Tag />
                        </div>

                    </div>
                </div>
            </Admin>
        </Layout>
    )
}



export default CategoryTag