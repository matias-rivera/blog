import Layout from "../components/Layout"
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router';
import { listBlogsWithCategoriesAndTags } from '../actions/blog'
import Card from '../components/blog/Card'
import { API, DOMAIN, APP_NAME  } from '../config';
import Smallcard from "../components/blog/smallcard/index";
import Categories from '../components/categories'
import Tags from "../components/tags";

const Index =  ({blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router}) => {

    const [limit, setLimit] = useState(blogsLimit)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(totalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([])

    const showAllBlogs = () => {
        
        return blogs.map((blog, i) => (
            <Smallcard blog={blog} key={i} /> 
        ))
    }

    const showLoadedBlogs = () => (
        loadedBlogs.map((blog, i) => (
            <Smallcard blog={blog} key={i} /> 
        ))
    )

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
                className='btn btn-outline-primary btn-lg mt-4'
                onClick={loadMore}
            >
                Load More
            </button>
        )
    )

    return <Layout>
                <Categories categories={categories}/>
                <div className='blogs-display'>
                    {showAllBlogs()}
                    {showLoadedBlogs()}
                </div>
                    {loadMoreButton()}
                <Tags tags={tags}/>
            </Layout>
        
    
}



Index.getInitialProps = () => {
    const skip = 0
    const limit = 10
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

export default withRouter(Index);