import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { singleBlog, listRelated } from '../../actions/blog'
import { API, DOMAIN, APP_NAME, FACEBOOK_APP_ID  } from '../../config';
import renderHTML from 'react-render-html'
import moment from 'moment'
import DisqusThread from '../../components/DisqusThread';
import Categories from '../../components/categories'
import './blog.css';
import Tags from '../../components/tags'

import {FacebookButton, FacebookCount} from 'react-social';

const SingleBlog = ({blog}) => {

    const head = () => (
        <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta name='description' content={blog.mdesc} />
            <link rel='canonical' href={`${DOMAIN}/blogs/${blog.slug}`}/>
            <meta property='og:title' content={`${blog.title} | ${APP_NAME}`}/>
            <meta
                property='og:description'
                content={blog.mdesc}
            />
            <meta property='og:type' content='website' />
            <meta property='og:url'  href={`${DOMAIN}/blogs/${blog.slug}`}/>
            <meta property='og:site_name' content={`${APP_NAME}`} />

            <meta property='og:image' content={`${API}/blogs/photo/${blog.slug}`}/>
            <meta property='og:image:secure_url'  content={`${API}/blogs/photo/${blog.slug}`}/>
            <meta property='og:image:type' content='image/jpg' />
            <meta property='fb:app_id' content={`${APP_NAME}`} />
        </Head>
    )

    const [related, setRelated] = useState([])

    useEffect(() => {
        loadRelated()
    },[blog])
    
    const loadRelated = () => {
        listRelated({blog}).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setRelated(data)
            }
        })
    }

    const showRelatedBlogs = () => (
        <div className='related__container'>
            <div className='related__title'>Related blogs</div>
            <ul className='related-list'>
                {related.map((blog, i) => (
                <>
                <Link href={`/blogs/${blog.slug}`} key={i}>
                    <li className='related-blog' >
                        <div className='related-blog__title'>{blog.title}</div>
                    
                    
                        <img className='related-blog__picture'
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                        
                    </li>
                </Link>
                {i + 1 <  Object.keys(related).length && (<hr className='related-line'/>)}
                
                </>
                ))}
                
            </ul>    
        </div>
       
    )

    const showComments = () => {
        return (
            <div>
                <DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`}/>
            </div>
        )
    }

    return ( 
        <>
            {head()}
            <Layout>
                <Categories categories={blog.categories} />
                
                <div className='blog__container'>
                    <div className='blog__main'> 
                    <div className='blog__header'>
                    <h1 className='blog__title'>{blog.title}</h1>
                    {/* <p className='blog__subtitle'>{blog.mdesc}</p> */}
                    <div className='author'>
                        <div>
                            Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link>
                        </div>
                        <div>
                            Published  {moment(blog.updatedAt).fromNow()}
                        </div>
                    </div>
                    <ul className='social'>
                        <li>
                            <FacebookButton 
                                url={`${DOMAIN}/blogs/${blog.slug}`}
                                appId={FACEBOOK_APP_ID}
                                className='social__link social__link--facebook'
                            >
                                Share on Facebook
                            </FacebookButton>
                        </li>
                    </ul>
                    
                    </div>
                        <img 
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                            className='blog__picture'
                        />
                        <div className='blog__body'>
                            
                                {renderHTML(blog.body)}
             
                        </div>
                        <Tags tags={blog.tags}/>

                        <div className='blog__comments'>
                            {showComments()}
                        </div>

                    </div>
                    <div className='sidebar'>
                        {showRelatedBlogs()}
                        
                    </div>
                </div>

            </Layout>
        </>
     );
}

SingleBlog.getInitialProps = ({query}) => {
    return singleBlog(query.slug).then(data => {
        if(data.error){
            console.log(data.error)
        } else {
            return {blog: data}
        }
    })
}

export default SingleBlog;