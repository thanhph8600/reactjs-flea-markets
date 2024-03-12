const Search = ({ onHandSearch }: { onHandSearch: (value: string) => void }) => {
    return (
        <input onChange={(e) => { onHandSearch(e.target.value) }} type="search" name="search" id="" className=" border rounded-md px-2 py-2" placeholder="Tìm kiếm theo theo ten..." />
    )
}
export default Search