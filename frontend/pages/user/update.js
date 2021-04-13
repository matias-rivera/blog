import Layout from "../../components/Layout"
import Private from '../../components/auth/Private'
import Link from 'next/link'
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import Dashboard from "../../components/Dashboard";
import DashboardContent from "../../components/DashboardContent";

const UserProfileUpdate = () => {
    return (
        <Layout>
            <Private>
                <Dashboard>
                    <DashboardContent title={'Profile'}>
                        <ProfileUpdate />
                    </DashboardContent>
                </Dashboard>
            </Private>
        </Layout>
    )
}



export default UserProfileUpdate