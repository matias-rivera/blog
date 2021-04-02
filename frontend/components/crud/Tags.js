import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { isAuth, getCookie} from '../../actions/auth'
import { createTag, getTags, getTag, removeTag } from '../../actions/tag'
const Tags = () => {
    
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    })

    const { name, error, success, tags, removed, reload} = values
    const token = getCookie('token')

    //on start load all tags and reload everytime a tag is created or deleted
    useEffect(() => {
        loadTags()
    },[reload])


     //load all tags
     const loadTags = () => {
        getTags().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setValues({...values, tags: data})
            }
        })
    }

     //confirm delete
     const deleteConfirm = slug => {
        const answer = window.confirm('Are you sure do you want to delete this tag?')
        if(answer){
            deleteTag(slug)
        }
    }

    //delete cateogry
    const deleteTag = slug => {
        removeTag(slug, token).then(data =>{
            if(data.error){
                console.log(data.error)
            } else {
                setValues({...values, error: false, success: false, name: '', removed: true, reload: !reload})
            }
        })
    }

    //show all cateogries
    const showTags = () => {
        return tags.map((tag, i) => (
            <button 
                key={i}
                className='btn btn-outline btn-primary mx-1 mt-3'
                title='Double click to delete'
                onDoubleClick={() => deleteConfirm(tag.slug)}
            >
                {tag.name}
            </button>
        ))
    }

    //handle form submit to create a tag
    const onSubmit = (e) => {
        e.preventDefault()
        createTag({name}, token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false})
            } else {
                setValues({...values, error: false, success: true, name: '', removed: false, reload: !reload})
            }
        })
    }

    //handle input change of tag name
    const handleChange = e => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''})
    }

    //show if tag was successfully created
    const showSuccess = () => {
        if(success){
            return (
                <p className='text-success'>
                    Tag was created
                </p>
            )
        }
    }
        
    //show if there was any error
    const showError = () => {
        if(error){
            return (
                <p className='text-danger'>
                    Tag already exist
                </p>
            )
        }
    }

    //show if tag was successfully deleted
    const showRemoved = () => {
        if(removed){
            return (
                <p className='text-success'>
                    Tag was removed
                </p>
            )
        }
    }

    //Tag create form
    const newTagForm = () => (
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input 
                    type='text' 
                    className='form-control'
                    onChange={handleChange}
                    value={name}
                    required
                /> 
            </div>
                <button 
                    type='submit'
                    className='btn btn-primary'
                >
                    Create
                </button>

        </form>
    )

    //On mouse move set Messages to false
    const mouseMoveHandler = e => {
        setValues({...values, error: false, success: false, removed: ''})
    }

    return (
        <>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div onMouseMove={mouseMoveHandler}>
                {newTagForm()}
                {showTags()}
            </div>
            
        </>
    )
}

export default Tags
