import Layout from "../../components/Layout"
import Private from '../../components/auth/Private'
import Link from 'next/link'
import Dashboard from "../../components/Dashboard"
import DashboardContent from "../../components/DashboardContent"
import { isAuth } from "../../actions/auth"

const UserIndex = () => {
    return (
        <Layout>                
            <Dashboard>
                <Private>
                    <DashboardContent title={'Dashboard'}>
                        <div className='text-center'>
                            <h4>Welcome {isAuth() && isAuth().name}</h4>
                        </div>
                        <div className='row'>
                            <div className="col-md-3 mb-2 index-button">
                                <div className="card card-body bg-light">
                                    <h2 className="text-center text-dark"><i className="far fa-sticky-note"></i></h2>
                                    <h5 className="text-center text-dark">Blogs</h5>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2 index-button">
                                <div className="card card-body bg-light">
                                    <h2 className="text-center text-dark"><i className="far fa-comments"></i></h2>
                                    <h5 className="text-center text-dark">Comments</h5>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2 index-button">
                                <div className="card card-body bg-light">
                                    <h2 className="text-center text-dark"><i className="far fa-thumbs-up"></i></h2>
                                    <h5 className="text-center text-dark">Likes</h5>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2 index-button"> 
                                <div className="card card-body bg-light">
                                    <h2 className="text-center text-dark"><i className="fas fa-users"></i></h2>
                                    <h5 className="text-center text-dark">Followers</h5>
                                </div>
                            </div>
                        </div>
                    </DashboardContent>
                </Private>
            </Dashboard>
        </Layout>
    )
}



export default UserIndex