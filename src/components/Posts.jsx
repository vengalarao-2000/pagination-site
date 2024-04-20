import React, { useEffect, useState } from 'react'
import PostItem from './PostItem';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const getPosts = async (page) => {

        try {
            setIsLoading(true);
            let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit_=10&_page=${page}`);
            let data = await response.json();
            setPosts(data);
            let count = Number(response.headers.get("X-Total-Count"));
            setTotalCount(count);
            setIsLoading(false);
        }
        catch(error){
            console.log("Fetch error", error);
        }

    }

    const pageChange = (value) => {
        const newPageValue = page + value;
        setPage(newPageValue);
    }

    const handlePageChange = (value) => {
        setPage(value);
    }

    useEffect(() => {
        getPosts(page);
    }, [page])

  return (
    isLoading ? <h1>Loading</h1> :
    <>
        {
            posts.map((element, index) => {
                return (
                    <PostItem key={index} id={element.id} title={element.title} />
                )
            })
        }
        <div style={{display: "flex"}}>
            <button disabled={page === 1} onClick={() => pageChange(-1)}>prev</button>
            <p></p>
            <button disabled={page === Math.ceil(totalCount / 10)} onClick={() => pageChange(1)}>next</button>
        </div>

        <div>
            <h1>{page}</h1>
            {
                new Array(10).fill(0).map((element, index) => {
                    //onClick={() => setPage(index+1)} or onClick={() => handlePageChange(index+1)}
                    return <button key={index} onClick={() => handlePageChange(index+1)}>{index+1}</button>
                })
            }
        </div>
    </>
  )
}

export default Posts