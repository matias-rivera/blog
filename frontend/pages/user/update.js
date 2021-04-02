import Layout from "../../components/Layout"
import Private from '../../components/auth/Private'
import Link from 'next/link'
import ProfileUpdate from '../../components/auth/ProfileUpdate';
import Dashboard from "../../components/Dashboard";

const UserProfileUpdate = () => {
    return (
        <Layout>
            <Private>
                <Dashboard>
                    <ProfileUpdate />
                </Dashboard>
            </Private>
        </Layout>
    )
}



export default UserProfileUpdate