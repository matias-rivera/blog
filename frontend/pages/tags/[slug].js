import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { API, DOMAIN, APP_NAME  } from '../../config';
import renderHTML from 'react-render-html'
import moment from 'moment'
import Card from '../../components/blog/Card'
import { getTag } from '../../actions/tag';

const Tag = ({tag, blogs}) => {

    const head = () => (
        <Head>
            <title>{tag.name} | {APP_NAME}</title>
            <meta name='description' content={tag.name} />
            <link rel='canonical' href={`${DOMAIN}/tags/${tag.slug}`}/>
            <meta property='og:title' content={`${tag.name} | ${APP_NAME}`}/>
            <meta
                property='og:description'
                content={tag.name}
            />
            <meta property='og:type' content='website' />
            <meta property='og:url'  href={`${DOMAIN}/tags/${tag.slug}`}/>
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
                                    {tag.name}
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
 
Tag.getInitialProps = ({query}) => {
    return getTag(query.slug).then(data => {
        if(data.error){
            console.log(data.error)
        } else {
            return {tag:data.tag, blogs: data.blogs}
        }
    })
}

export default Tag;