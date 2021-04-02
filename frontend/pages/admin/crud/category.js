import Layout from "../../../components/Layout"
import Link from 'next/link'
import Categories from '../../../components/crud/Categories'
import Dashboard from "../../../components/Dashboard"

const Category = () => {
    return (
        <Layout>
            <Dashboard>
          

                                <h2>Manage Categories</h2>
                            <Categories />
                            

                   
       
            </Dashboard>
        </Layout>
    )
}



export default Category