import React, {useState} from 'react'
import Link from 'next/link'
import { emailContactForm } from '../../actions/form'


const ContactForm = ({authorEmail}) => {
    const [values, setValues] = useState({
        message: '',
        name: '',
        email: '',
        sent: false,
        buttonText: 'Send message',
        success: false,
        error: false
    })

    const {message, name, email, sent, buttonText, success, error} = values

    const onSubmit = e => {
        e.preventDefault();
        setValues({...values, buttonText:'Sending...'})
        emailContactForm({authorEmail, name, email, message}).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    sent:true,
                    name: '',
                    email: '',
                    message: '',
                    buttonText: 'Sent',
                    success: data.success
                })
            }
        })
        
    }

    const showSuccessMessage = () => success && (
        <div className='alert alert-info'>
            Thank you from contacting us.
        </div>
    )

    const showErrorMessage = () => error  && (
        <div className='alert alert-danger'>
            {error}
        </div>
    )

    const handleChange = name => e => {
        const value =  e.target.value
        setValues({...values, [name]:value, error: false, success: false, buttonText: 'Send Message'})
    }
    
    const contactForm = () => {
        return (
            <form onSubmit={onSubmit} className='pb-5'>
                <div className='form-group'>
                    <label className='lead'>Message</label>
                    <textarea
                        onChange={handleChange('message')}
                        type='text'
                        className='form-control'
                        value={message}
                        required
                        rows='10'
                    >
                    </textarea>
                </div>
                <div className='form-group'>
                    <label className='lead'>Name</label>
                    <input 
                        type='text'
                        onChange={handleChange('name')}
                        className='form-control'
                        value={name}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='lead'>Email</label>
                    <input 
                        type='email'
                        onChange={handleChange('email')}
                        className='form-control'
                        value={email}
                        required
                    />
                </div>
                <div>
                    <button
                        className='btn btn-primary'
                        type='submit'
                    >
                        {buttonText}
                    </button>
                </div>


            </form>
        )
    }

    return (
        <>
            {showSuccessMessage()}
            {showErrorMessage()}
            {contactForm()}
        </>
    )
}

export default ContactForm
