import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { singleBlog, listRelated } from '../../actions/blog'
import { API, DOMAIN, APP_NAME  } from '../../config';
import renderHTML from 'react-render-html'
import moment from 'moment'
import SmallCard from '../../components/blog/SmallCard'

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
    },[])
    
    const loadRelated = () => {
        listRelated({blog}).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setRelated(data)
            }
        })
    }

    const showBlogCategories = blog => (
        blog.categories.map((category,i) => (
            <Link key={i} href={`/categories/${category.slug}`}>
                <a className='btn btn-primary mx-1 mt-3'>{category.name}</a>
            </Link>
        ))
    )

    const showBlogTags = blog => (
        blog.tags.map((tag,i) => (
            <Link key={i} href={`/tags/${tag.slug}`}>
                <a className='btn btn-outline-primary mx-1 mt-3'>{tag.name}</a>
            </Link>
        ))
    )

    const showRelatedBlogs = () => (
        related.map((blog, i) => (
            <div key={i} className='col-md-4'>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ))
    )

    return ( 
        <>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className='container-fluid'>
                            <section>
                                <div 
                                    className='row'
                                    style={{marginTop:'-30px'}}
                                >
                                    <img
                                        src={`${API}/blog/photo/${blog.slug}`}
                                        alt={blog.title}
                                        className='img img-fluid featured-image'
                                    />
                                </div>
                            </section>

                            <section>
                                <div className='container'>
                                    <h1 className='display-2 py-3 text-center font-weight-bold'>{blog.title}</h1>
                                    <p className='lead mt-3 mark'>
                                        Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | Published {moment(blog.updatedAt).fromNow()}
                                    </p>
                                    <div className='pb-3'>
                                        {showBlogCategories(blog)}
                                        {showBlogTags(blog)}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className='container card border-0'>
                            <section>
                                <div className='col-md-12 lead'>
                                    {renderHTML(blog.body)}
                                </div>
                            </section>
                        </div>
                        <div className='container'>
                            <h4 className='text-center py-5 h2'>Related Blogs</h4>
                            <hr />
                            <div className='row'>
                                {showRelatedBlogs()}
                            </div>
                        </div>

                        <div className='container pb-5'>
                            <p>Comments show</p>
                        </div>
                    </article>
                </main>
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