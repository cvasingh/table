import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Main() {
    return <div className='App'>

        <Link to="/">Table</Link>
        <Link to="/BasicTable">BasicTable</Link>
        <Link to="/SortingTable">SortingTable</Link>
        <Link to="/FilteringTable">FilteringTable</Link>
        <Link to="/PaginationTable">PaginationTable</Link>
        <Link to="/">Table</Link>
        <Link to="/">Table</Link>
        <Link to="/">Table</Link>
        <hr />

        <Outlet />

    </div>
}
