import Link from 'next/link'
import { useEffect, useState } from 'react';
import Router from 'next/router'
import { getCookie, isAuth, loginWithGoogle, authenticate } from '../../actions/auth';
import GoogleLogin from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../config';


const LoginGoogle = () => {

    const responseGoogle = response => {
        const tokenId = response.tokenId
        const user = {tokenId}

        loginWithGoogle(user).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                authenticate(data, () => {
                    console.log(data)
                    if(isAuth() && isAuth().role === 1){
                        Router.push(`/admin`)
                    } else {
                        Router.push(`/user`)
                    }
                    
                })
            }
        })
    }

    return ( 
        <div className='pb-3'>
             <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme={'dark'}
            />
        </div>
     );
}
 
export default LoginGoogle;