import React,{useState, useEffect} from 'react'
import { signin, authenticate, isAuth } from '../../actions/auth'
import Router from 'next/router'

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
                        Router.push(`/`)
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
        </>
    )
}

export default SigninComponent