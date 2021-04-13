import Layout from "../../../components/Layout"
import Link from 'next/link'
import Categories from '../../../components/crud/Categories'
import Dashboard from "../../../components/Dashboard"
import DashboardContent from "../../../components/DashboardContent"
import Admin from "../../../components/auth/Admin"

const Category = () => {
    return (
        <Layout>
            <Dashboard>
                <Admin>
                    <DashboardContent title={'Categories'}>
                        <h2>Manage Categories</h2>
                        <Categories />
                    </DashboardContent>
                </Admin>
            </Dashboard>
        </Layout>
    )
}



export default Category