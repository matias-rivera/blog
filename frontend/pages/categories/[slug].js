import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { API, DOMAIN, APP_NAME  } from '../../config';
import { getCategory } from '../../actions/category';
import Smallcard from '../../components/blog/smallcard/index';

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

    const showAllBlogs = () => {
        
        return blogs.map((blog, i) => (
            <Smallcard blog={blog} key={i} /> 
        ))
    }

    return (<> 
      {head()}
      <Layout>
            <h1 className='text-center'>
                {category.name}
            </h1>
            {blogs.length > 0 ?
            <div className='blogs-display'>
               {showAllBlogs()}
            </div>
            : <h1 className='text-center'>No Blogs found</h1>
        }
        </Layout>
    
    </>)
   
           
        
    
    

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