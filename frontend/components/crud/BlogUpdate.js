import React,{useState , useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import {withRouter} from 'next/router'
import {getCookie, isAuth} from '../../actions/auth'
import {getCategories} from '../../actions/category'
import {getTags} from '../../actions/tag'
import { singleBlog, updateBlog } from '../../actions/blog'
const ReactQuill = dynamic(() => import('react-quill'),{ssr: false})
import { API } from './../../config';



const BlogUpdate = ({router}) => {


    const [body, setBody] = useState('')

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checkedCategories, setCheckedCategories] = useState([])
    const [checkedTags, setCheckedTags] = useState([])

    const [values, setValues] = useState({
        error: '',
        success: '',
        formData: '',
        title: ''
    })

    const {
        error,
        success,
        formData,
        title
    } = values

    const token = getCookie('token')

    useEffect(() => {
        initBlog()
        initCategories()
        initTags()
       
    },[router])

    const initBlog = () => {
        if(router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if(data.error){
                    console.log(data.error)
                } else{
                    setValues({...values, title: data.title, formData: new FormData()})
                    setBody(data.body)
                    setCategoriesArray(data.categories)
                    setTagsArray(data.tags)
                }
            })
        }
    }
    
    const setCategoriesArray = blogCategories => {
        const categoriesBlog = []
        blogCategories.map((category,i) => {
            categoriesBlog.push(category._id)
        })
        setCheckedCategories(categoriesBlog)
    }

    const setTagsArray = blogTags => {
        const tagsBlog = []
        blogTags.map((tag,i) => {
            tagsBlog.push(tag._id)
        })
        setCheckedTags(tagsBlog)
    }

    const handleBody = e => {
        setBody(e)
        console.log(formData)
        if(formData){
            formData.set('body',e)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
       try {
        updateBlog(formData, token, router.query.slug).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({...values, title: '', success: 'Blog was successfully updated'})
                if(isAuth() && isAuth().role === 1) {
                    Router.replace(`/admin`)
                } else if(isAuth() && isAuth().role === 0) {
                    Router.replace(`/user`)
                }
            
            }
        })
       } catch (error) {
        setValues({...values, error: 'error' })
       }

    }




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


    
    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        console.log(formData)
        if(formData) formData.set(name, value);
        setValues({...values, [name]:value, formData, error: ''})
    }


    const handleCategoriesToggle = id => () => {
        setValues({...values, error: ''})
        // return id
        const clickedCategory = checkedCategories.indexOf(id)
        const all = [...checkedCategories]

        if(clickedCategory === -1 ){
            all.push(id)
        }else{
            all.splice(clickedCategory,1)
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


    const findCategory = category => {
        const result = checkedCategories.indexOf(category)
        if(result !== -1) {
            return true
        } else {
            return false
        }
    }

    const findTag = tag => {
        const result = checkedTags.indexOf(tag)
        if(result !== -1) {
            return true
        } else {
            return false
        }
        
    }

    const showCategories = () => {
        return (
            categories && categories.map((category, i) => (
                <li className='list-unstyled' key={category._id}>
                    <input 
                        type='checkbox'
                        className='mr-2'
                        checked={findCategory(category._id)}
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
                <li className='list-unstyled' key={tag._id}>
                    <input 
                        type='checkbox'
                        className='mr-2'
                        checked={findTag(tag._id)}
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

    const updateBlogForm = () => {
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
                        modules={BlogUpdate.modules}
                        formats={BlogUpdate.formats}
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
                        Update
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
                        {updateBlogForm()}
                        <div className='pt-3'>
                            <p>show success error msg</p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='form-group pb-2'>
                            <h5>Featured Image</h5>
                            <hr />
                            {body && (
                                <img 
                                    className='img img-fluid'
                                    style={{maxHeight: 'auto', width: '100%'}}
                                    src={`${API}/blog/photo/${router.query.slug}`}
                                    alt={title}
                                />
                            )}
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
 

BlogUpdate.modules = {
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
  
  BlogUpdate.formats = [
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

export default withRouter(BlogUpdate);