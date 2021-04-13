import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import Dashboard from "../../../components/Dashboard"
import Tags from '../../../components/crud/Tags'
import DashboardContent from "../../../components/DashboardContent"


const Tag = () => {
    return (
        <Layout>
            <Dashboard>
                <Admin>
                    <DashboardContent title={'Tags'}>
                        <h2>Manage Tags</h2>
                        <Tags />
                    </DashboardContent>
                </Admin>
            </Dashboard>
        </Layout>
    )
}



export default Tag