import React,{ useState, useEffect} from 'react'
import { signup, isAuth } from '../../actions/auth'
import Router from 'next/router'

const SignupComponent = () => {
    
    const [values, setValues] = useState({
        name: 'matias',
        email: 'matias@example.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const {name, email, password, error, loading, message, showForm} = values

    useEffect(() => {
        isAuth() && Router.push(`/`)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()

        setValues({...values, loading: true, error: false})
        const user = {name, email, password}
        signup(user)
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                    setValues({
                        ...values, 
                        name: '', 
                        email: '', 
                        password: '', 
                        error: '', 
                        loading: false,
                        message: data.message,
                        showForm: false
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


    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        value={name} 
                        className='form-control'
                        placeholder='username'
                        type='text'
                        onChange={handleChange('name')}
                    />
                </div>
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
                            Signup
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
            {showForm && signupForm()}
        </>
    )
}

export default SignupComponent