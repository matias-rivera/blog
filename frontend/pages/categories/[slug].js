import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'

import { API, DOMAIN, APP_NAME  } from '../../config';
import renderHTML from 'react-render-html'
import moment from 'moment'
import { getCategory } from '../../actions/category';
import Card from '../../components/blog/Card'

const Category = ({category, blogs}) => {

    const head = () => (
        <Head>
            <title>{category.name} | {APP_NAME}</title>
            <meta name='description' content={category.name} />
            <link rel='canonical' href={`${DOMAIN}/categories/${category.slug}`}/>
            <meta property='og:title' content={`${category.name} | ${APP_NAME}`}/>
            <meta
                property='og:description'
                content={category.name}
            />
            <meta property='og:type' content='website' />
            <meta property='og:url'  href={`${DOMAIN}/categories/${category.slug}`}/>
            <meta property='og:site_name' content={`${APP_NAME}`} />

            <meta property='og:image' content={`${DOMAIN}/static/images/image.jpg`}/>
            <meta property='og:image:secure_url'  content={`${DOMAIN}/static/images/image.jpg`} />
            <meta property='og:image:type' content='image/jpg' />
            <meta property='fb:app_id' content={`${APP_NAME}`} />
        </Head>
    )

    return ( 
        <>
        {head()}
            <Layout>
                <main>
                    <div className='container text-center'>
                        <header>
                            <div className='col-md-12 pt-3'>
                                <h1 className='display-4 font-weight-bold'>
                                    {category.name}
                                </h1>
                                {blogs.map((blog, i) => (
                                    <div key={i}>
                                        <Card  blog={blog} />
                                        <hr/>
                                    </div>
                                    
                                ))}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </>
     );
}
 
Category.getInitialProps = ({query}) => {
    return getCategory(query.slug).then(data => {
        if(data.error){
            console.log(data.error)
        } else {
            return {category:data.category, blogs: data.blogs}
        }
    })
}

export default Category;