import { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import Layout from '../../../../components/Layout'
import {withRouter} from 'next/router'
import { signup } from '../../../../actions/auth'

const ActivateAccount = ({router}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        message: '',
        loading: false,
        success: false,
        showButton: true
    })
    const {name, token, error, loading, success, showButton, message} = values

    useEffect(() => {
        let token = router.query.id
        if(token){
            const {name} = jwt.decode(token)
            setValues({...values, name, token})
        }
    },[router])

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true, error: false})
        signup({token}).then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false, showButton: false})
            } else {
                setValues({...values, message: data.message, loading: false, success: true, showButton: false})
            }
        })
    }

    const showLoading = () => (loading ? <h2>Loading...</h2> : '')
    const showError = () => (error ? <div className='alert alert-danger'>{error}</div> : '')
    const showMessage = () => (message ? <div className='alert alert-success'>{message}</div> : '')


    return ( 
        <Layout>
            <div className='container'>
                <h3 className='pb-4'>Hey {name}, Ready to activate your account?</h3>
                {showLoading()}
                {showError()}
                {showMessage()}
                {showButton && (
                    <button className='btn btn-outline-primary' onClick={handleSubmit}>
                        Activate Account
                    </button>
                )}
            </div>
        </Layout>
     );
}
 
export default withRouter(ActivateAccount);