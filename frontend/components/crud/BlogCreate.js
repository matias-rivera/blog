import React,{useState , useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories} from '../../actions/category'
import {getTags} from '../../actions/tag'
import { createBlog } from '../../actions/blog'
const ReactQuill = dynamic(() => import('react-quill'),{ssr: false})



const BlogCreate = ({router}) => {

    const blogFromLocal = () => {
        if(typeof window === 'undefined'){
            console.log('t')
            return false
        }
        
        if(localStorage.getItem('blog')){
            return JSON.parse(localStorage.getItem('blog'))
        } else{
            return false
        }
    }

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checkedCategories, setCheckedCategories] = useState([])
    const [checkedTags, setCheckedTags] = useState([])

    const [body, setBody] = useState( blogFromLocal())
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })

    const {
        error,
        sizeError,
        success,
        formData,
        title,
        hidePublishButton
    } = values
    const token = getCookie('token')

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initCategories()
        initTags()
    }, [router])
    
    const initCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setTags(data)
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createBlog(formData, token).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values, title: '', error:'', success: `A new blog titled ${data.title} was created`})
                setBody('')
                setCheckedCategories([])
                setCheckedTags([])
            }
        })
        
    }
    
    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]:value, formData, error: ''})
    }

    const handleBody = e => {
        setBody(e)
        formData.set('body',e)
        if(typeof window !== 'undefined'){
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const handleCategoriesToggle = id => () => {
        setValues({...values, error: ''})
        // return id
        const clickedCategory = checkedCategories.indexOf(id)
        const all = [...checkedCategories]

        if(clickedCategory === -1 ){
            all.push(id)
        }else{
            all.splice(checkedCategories,1)
        }
        setCheckedCategories(all)
        formData.set('categories', all)
    }

    const handleTagsToggle = id => () => {
        setValues({...values, error: ''})
        // return id
        const clickedTag = checkedTags.indexOf(id)
        const all = [...checkedTags]

        if(clickedTag === -1 ){
            all.push(id)
        }else{
            all.splice(clickedTag,1)
        }
        setCheckedTags(all)
        formData.set('tags', all)
    }


    const showCategories = () => {
        return (
            categories && categories.map((category, i) => (
                <li className='list-unstyled' key={i}>
                    <input 
                        type='checkbox'
                        className='mr-2'
                        onChange={handleCategoriesToggle(category._id)}
                    />
                    <label
                        className='form-check-label'
                    >
                        {category.name}
                    </label>
                </li>
            ))
        )
    }

    const showTags = () => {
        return (
            tags && tags.map((tag, i) => (
                <li className='list-unstyled' key={i}>
                    <input 
                        type='checkbox'
                        className='mr-2'
                        onChange={handleTagsToggle(tag._id)}
                    />
                    <label
                        className='form-check-label'
                    >
                        {tag.name}
                    </label>
                </li>
            ))
        )
    }

    const showError = () => (
        <div 
            className='alert alert-danger'
            style={{display: error ? '' : 'none'}}
        >
            {error}
        </div>
    )

    const showSuccess = () => (
        <div 
            className='alert alert-success'
            style={{display: success ? '' : 'none'}}
        >
            {success}
        </div>
    )

    const createBlogForm = () => {
        return (
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label className='text-muted'>Title</label>
                    <input 
                        type='text'
                        className='form-control'
                        value={title}
                        onChange={handleChange('title')}
                    />
                </div>
                <div className='form-group'>
                    <ReactQuill 
                        modules={BlogCreate.modules}
                        formats={BlogCreate.formats}
                        value={body}
                        placeholder='Write here...'
                        onChange={handleBody}
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='btn btn-primary'
                    >
                        Publish
                    </button>
                </div>
            </form>
        )
    }

    return ( 
        <>
           <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        {showError()}
                        {showSuccess()}
                        {createBlogForm()}
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group pb-2'>
                            <h5>Featured Image</h5>
                            <hr/>
                            <h6><small className='text-muted'>Max size: 1MB</small></h6>
                            <label
                                className='btn btn-outline-info'
                            >
                                Upload featured image
                                <input 
                                    type='file'
                                    accept='image/*'
                                    onChange={handleChange('photo')}
                                    hidden
                                />
                            </label>
                        </div>
                        
                        <br/>
                        <h5>Categories</h5>
                        <hr/>
                        <ul style={{maxHeight:'200px', overflowY:'scroll'}}>
                            {showCategories()}
                        </ul>
                        <br/>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{maxHeight:'200px', overflowY:'scroll'}}>
                            {showTags()}
                        </ul>
                        
                    </div>
                </div>
           </div>
        </>
     );
}
 

BlogCreate.modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block'],
    ],
  };
  
  BlogCreate.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
  ];

export default withRouter(BlogCreate);