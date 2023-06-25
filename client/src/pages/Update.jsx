import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [book,setBook] = useState({
        title:"",
        descr:"",
        price:0,
        cover:"",
    });
    
    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/books/"+bookId)
                setBook(res.data[0]);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllBooks()
    },[]);


    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2];
    
    const handleChange  = (e) =>{
        setBook((prev)=>({...prev, [e.target.name]: e.target.value }));
    };
    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/books/"+bookId,book);
            navigate("/")
        }catch(err){
            console.log(err);
        }
    }

    console.log(book);

    return (

            
        <div className='form' >
            <h1>Update Book</h1>
            
                <input value={book.title} type="text" placeholder='title' onChange={handleChange} name="title"/>
                <input value={book.descr} type="text" placeholder='descr' onChange={handleChange} name="descr" />
                <input value={book.price} type="number" placeholder='price' onChange={handleChange} name="price" />
                <input value={book.cover} type="text" placeholder='cover' onChange={handleChange} name="cover" />           
                <button onClick={handleClick} >Update</button>
        </div>
    )
}

export default Update