import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router';
import Layout from '../../components/Layout'
import { listBlogsWithCategoriesAndTags } from '../../actions/blog'
import Card from '../../components/blog/Card'
import { API, DOMAIN, APP_NAME  } from './../../config';

const Blogs = ({blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router}) => {


    

    const head = () => (
        <Head>
            <title>Programming blogs | {APP_NAME}</title>
            <meta name='description' content='Programming blogs and tutorials' />
            <link rel='canonical' href={`${DOMAIN}${router.pathname}`}/>
            <meta property='og:title' content={`Latest web development tutorials | ${APP_NAME}`}/>
            <meta
                property='og:description'
                content='addddddddddddddddddddadadadadasda'
            />
            <meta property='og:type' content='website' />
            <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
            <meta property='og:site_name' content={`${APP_NAME}`} />
            <meta property='og:image' content={`${DOMAIN}/static/images/image.jpg`}/>
            <meta property='og:image:secure_url'  content={`${DOMAIN}/static/images/image.jpg`} />
            <meta property='og:image:type' content='image/jpg' />
            <meta property='fb:app_id' content={`${APP_NAME}`} />
        </Head>
    )

    const [limit, setLimit] = useState(blogsLimit)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(totalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([])

    const loadMore = () => {
        const toSkip = skip + limit
        listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
            if(data.error){
                console.log(data.error)
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => (
        size > 0 && size >= limit && (
            <button 
                className='btn btn-outline-primary btn-lg'
                onClick={loadMore}
            >
                Load More
            </button>
        )
    )

    const showAllBlogs = () => {
        return blogs.map((blog, i) => (
            <article key={i}>
                <Card blog={blog}/>
                <hr />
            </article>
        ))
    }

    const showAllCategories = () => (

        categories.map((category, i) => (
            <Link key={i} href={`/categories/${category.slug}`}>
                <a className='btn btn-primary mx-1 mt-3'>
                    {category.name}
                </a>
            </Link>
        ))
        
    )

    const showAllTags = () => (

        tags.map((tag, i) => (
            <Link key={i} href={`/tags/${tag.slug}`}>
                <a className='btn btn-outline-primary mx-1 mt-3'>
                    {tag.name}
                </a>
            </Link>
        ))
        
    )

    const showLoadedBlogs = () => (
        loadedBlogs.map((blog, i) => (
            <article key={i}>
                <Card blog={blog} />
            </article>
        ))
    )

    return ( 
        <>
            {head()}
            <Layout>
                <main>
                    <div className='container'>
                        <header>
                            <div className='col-md-12 pt-3'>
                                <h1 className='display-4 font-weight-bold text-center'>
                                    Programming blogs
                                </h1>
                                <section>
                                    <div className='pb-5 text-center'>
                                    {showAllCategories()}
                                    <br/>
                                    {showAllTags()}
                                    </div>
                                </section>
                            </div>
                        </header>
                    </div>
                    <div className='container'>
                                {showAllBlogs()}
                    </div>
                    <div className='container'>
                                {showLoadedBlogs()}
                    </div>
                <div className='text-center py-5'>
                                {loadMoreButton()}
                </div>
                </main>
            </Layout>
        </>
     );
}
 
Blogs.getInitialProps = () => {
    const skip = 0
    const limit = 2
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if(data.error) {
            return console.log(data.error)
        } else {
            return {
                blogs: data.blogs, 
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogsSkip: skip
            }
        }
    })
}

export default withRouter(Blogs);