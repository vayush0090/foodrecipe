import React, { useEffect, useState } from 'react'
import './meal.css'

const Meal = () => {
    const [mealData, setMealData] = useState([])
    const [area, setArea] = useState('Indian')
    const [inputData, setInputData] = useState("")

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
            const data = await api.json()
            console.log(data.meals)
            setMealData(data.meals)  // Correctly set the mealData here
        }
        fetchDataFromAPI()
    }, [area])

    const submitHandler = async (e) => {
        e.preventDefault()
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`)
        const data = await api.json()
        console.log("search data:", data.meals)
        setMealData(data.meals)  // Update the mealData with the search results
    }

    return (
        <>
            <div className='navcontainer'>
                <h1>Food Recipe</h1>
                <form onSubmit={submitHandler}>
                    <input onChange={(e) => setInputData(e.target.value)} type="text" />
                </form>

                <div className='buttoncontainer'>
                    <button onClick={() => setArea("Indian")} type="button" className="btn btn-primary mx-3">Indian</button>
                    <button onClick={() => setArea("Canadian")} type="button" className="btn btn-secondary mx-3">Canadian</button>
                    <button onClick={() => setArea("American")} type="button" className="btn btn-success mx-3">American</button>
                    <button onClick={() => setArea("Thai")} type="button" className="btn btn-danger mx-3">Thai</button>
                    <button onClick={() => setArea("British")} type="button" className="btn btn-warning mx-3">British</button>
                    <button onClick={() => setArea("Russian")} type="button" className="btn btn-info mx-3">Russian</button>
                </div>
            </div>

            <div className='foodcontainer'>
                {mealData && mealData.map((data) => (
                    <div key={data.idMeal} className='fooditem'>
                        <div>
                            <img className='foodimg' src={data.strMealThumb} alt={data.strMeal} />
                        </div>
                        <h5>{data.strMeal}</h5>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Meal
