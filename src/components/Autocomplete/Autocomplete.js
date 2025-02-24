import { useEffect, useState } from "react";
import "./Autocomplete.css"


function Autocomplete({ onChange, data }) {

    const [ isFocused, setIsfocused ] = useState(false)

    function setIsFocused(bool) {
        setIsfocused(bool)
    }

    return (
        <>
            <div class="autocomplete-container">
                <input 
                    type="text" 
                    onChange={(e) => onChange({ value: e.target.value })} 
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                    class="autocomplete-input" 
                    placeholder="Search..." 
                 />

                {data.length > 0 && isFocused &&
                    <div class="autocomplete-list">
                        {data.map((value) => (
                            <div key={value.id} className="autocomplete-item">{value.title}</div>
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default function AutocompleteConfig() {

    const [list, setList] = useState([])
    const [search, setSearch] = useState("")

    async function onFetchList() {
        let res = await fetch('https://dummyjson.com/products/search?q=' + search)
        res = await res.json()
        let { products } = res
        setList(products)
    }


    useEffect(() => {
        const timeout = setTimeout(onFetchList, 300)
        return () => {
            clearTimeout(timeout)
        }
    }, [search])

    function onSearch(value) {
        setSearch(value)
    }


    return (
        <>
            <Autocomplete onChange={({ value }) => onSearch(value)} data={list}> </Autocomplete>
        </>
    )


}