import React from 'react';
import Link from 'next/link'
import renderHTML from 'react-render-html'
import moment from 'moment'
import { API } from '../../../config'
import './SmallCard.css'

const SmallCard = ({blog}) => {

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

    return ( 

        <div className='smallcard'>
            <Link href={`/blogs/${blog.slug}`}>
                <img className='smallcard__image' src={`${API}/blog/photo/${blog.slug}`}/>
            </Link>
            <h4 className='smallcard__title'>{blog.title}</h4>
            <Link href={`/blogs/${blog.slug}`}>
                <a className='smallcard__link'>Read more</a>
            </Link>
        </div>
        
     );
}
 
export default SmallCard;