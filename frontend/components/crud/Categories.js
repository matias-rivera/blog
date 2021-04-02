import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { isAuth, getCookie} from '../../actions/auth'
import { createCategory, getCategory, getCategories, removeCategory } from '../../actions/category'

const Categories = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false
    })

    const { name, error, success, categories, removed, reload} = values
    const token = getCookie('token')

    //on start load all categories and reload everytime a category is created or deleted
    useEffect(() => {
        loadCategories()
    },[reload])

    //load all categories
    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                setValues({...values, categories: data})
            }
        })
    }

    //confirm delete
    const deleteConfirm = slug => {
        const answer = window.confirm('Are you sure do you want to delete this category?')
        if(answer){
            deleteCategory(slug)
        }
    }

    //delete cateogry
    const deleteCategory = slug => {
        removeCategory(slug, token).then(data =>{
            if(data.error){
                console.log(data.error)
            } else {
                setValues({...values, error: false, success: false, name: '', removed: true, reload: !reload})
            }
        })
    }

    //show all cateogries
    const showCategories = () => {
        return categories.map((category, i) => (
            <button 
                key={i}
                className='btn btn-outline btn-primary mx-1 mt-3'
                title='Double click to delete'
                onDoubleClick={() => deleteConfirm(category.slug)}
            >
                {category.name}
            </button>
        ))
    }

    //handle form submit to create a category
    const onSubmit = (e) => {
        e.preventDefault()
        createCategory({name}, token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false})
            } else {
                setValues({...values, error: false, success: true, name: '', removed: false, reload: !reload})
            }
        })
    }

    //handle input change of category name
    const handleChange = e => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''})
    }

    //show if category was successfully created
    const showSuccess = () => {
        if(success){
            return (
                <p className='text-success'>
                    Category was created
                </p>
            )
        }
    }
        
    //show if there was any error
    const showError = () => {
        if(error){
            return (
                <p className='text-danger'>
                    Category already exist
                </p>
            )
        }
    }

    //show if category was successfully deleted
    const showRemoved = () => {
        if(removed){
            return (
                <p className='text-success'>
                    Category was removed
                </p>
            )
        }
    }

    //Category create form
    const newCategoryForm = () => (
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
                {newCategoryForm()}
                {showCategories()}
            </div>
            
        </>
    )
}

export default Categories

