import Layout from "../../../components/Layout"
import Admin from '../../../components/auth/Admin'
import Dashboard from "../../../components/Dashboard"
import Tags from '../../../components/crud/Tags'


const Tag = () => {
    return (
        <Layout>
            <Dashboard>
                <Admin>
                    <h2>Manage Tags</h2>
                    <Tags />
                </Admin>
            </Dashboard>
        </Layout>
    )
}



export default Tag