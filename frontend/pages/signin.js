import Layout from "../components/Layout"
import SigninComponent from '../components/auth/SigninComponent';
import Link from 'next/link'

const Signin = () => {
    return (
        <Layout>
            <h2 className='text-center py-4'>Signin</h2>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <SigninComponent />
                </div>
            </div>
        </Layout>
    )
}



export default Signin