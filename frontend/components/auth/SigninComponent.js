import React,{useState, useEffect} from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth'
import Router from 'next/router'
import Link from 'next/link'

const SigninComponent = () => {
    
    const [values, setValues] = useState({
        email: 'matias@example.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const {email, password, error, loading, message, showForm} = values

    useEffect(() => {
        isAuth() && Router.push(`/`)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        setValues({...values, loading: true, error: false})
        const user = {email, password}
        signin(user)
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    // save user token
                    // save user info
                    // auth
                    authenticate(data, () => {
                        if(isAuth() && isAuth().role === 1){
                            Router.push(`/admin`)
                        } else {
                            Router.push(`/user`)
                        }
                        
                    })
                }
            })
           
        
    }

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    }

    const showLoading = () => (loading ? <div className='alert alert-info'>Loading...</div> : '')
    const showError = () => (error ? <div className='alert alert-danger'>{error}</div> : '')
    const showMessage = () => (message ? <div className='alert alert-info'>{message}.</div> : '')


    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input 
                        value={email}
                        className='form-control'
                        placeholder='email'
                        type='email'
                        onChange={handleChange('email')}
                    />
                </div>
                <div className='form-group'>
                    <input 
                        value={password}
                        className='form-control'
                        type='password'
                        onChange={handleChange('password')}
                    />
                </div>
                <div>
                    <button 
                        className='btn btn-primary'
                        
                        >
                            Signin
                    </button>
                </div>
            </form>

        )
    }
    
    return(
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
            <hr />
            <Link href='/auth/password/forgot'>
                <a className='btn btn-outline-danger btn-sm'>Forgot password?</a>
            </Link>
        </>
    )
}

export default SigninComponent