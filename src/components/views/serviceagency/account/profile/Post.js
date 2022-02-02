import React from 'react'

import { Image } from 'react-bootstrap'

const Post = (props) => {
    const post = props.post
    const currentDate = post.date
    const date = new Date(currentDate)
    return (
        <div className='d-flex'>
            <div className='me-3 mb-3'>
                <Image style={{maxWidth:'150px'}} fluid className='post-pic' src={post.imageRef} />
            </div>
            <div>
                <h3>{post.title}</h3>
                {post.details}
                <br />
                {date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear()}
                <br />
            </div>
        </div>
    )
}

export default Post
