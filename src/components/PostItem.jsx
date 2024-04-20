import React from 'react'
import style from './PostItem.module.css'

const PostItem = ({id, title}) => {
  return (
    <div className={style.container}>
        <h1>{id}</h1>
        <p>{title}</p>
    </div>
  )
}

export default PostItem