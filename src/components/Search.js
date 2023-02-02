import React , {useState} from 'react'
import { useGlobalContext } from '../Context';
function Search()
{
    const [text,setText ] = useState('');
    const {setSearchTerm,fetchRandomMeal} = useGlobalContext();
    const handleChange = (e) =>{
        setText(e.target.value);
        // console.log(text);
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(text)
        {
            setSearchTerm(text)
            // setText('')
        }

    }
    const handleRandomMeal = () =>{
        setSearchTerm('')
        setText('')
        fetchRandomMeal();
    }
 
    return <header className='search-container'>
        <form onSubmit={handleSubmit}>
            <input type='text' value={text} onChange={handleChange}  placeholder = 'favorite meal' className='form-input' />
            <button type = 'submit' className='btn'>Search</button>
            <button type='button' className='btn btn-hipster' onClick={handleRandomMeal}>Surprise me!</button>
         </form>
    </header>
}
export default Search;