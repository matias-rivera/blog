import Layout from "../components/Layout"
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router';
import { listBlogsWithCategoriesAndTags } from '../actions/blog'
import Card from '../components/blog/Card'
import { API, DOMAIN, APP_NAME  } from '../config';
import SmallCard from "../components/blog/SmallCard/SmallCard";
import Maintenance from '../components/Maintenance';
import { MAINTENANCE  } from '../config';
import Categories from '../components/Categories'

const Index =  ({blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router}) => {

    const [limit, setLimit] = useState(blogsLimit)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(totalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([])

    const showAllBlogs = () => {
        
        return blogs.map((blog, i) => (
            <SmallCard blog={blog} key={i} /> 
        ))
    }

    return MAINTENANCE ? <Maintenance /> : (
        <Layout>

                <Categories categories={categories}/>


             <div className='blogs-display'>
                {showAllBlogs()}
             </div>

        

         
           
        </Layout>
    )
}



Index.getInitialProps = () => {
    const skip = 0
    const limit = 20
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