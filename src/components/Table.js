import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import DATA from './data.json'

// set columns 
const COLUMNS = [
    {
        Header: "Id",
        Footer: "Id",
        accessor: "id"
    },
    {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name"
    },
    {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name"
    },
    // {
    //     Header: "Email",
    //     Footer: "Email",
    //     accessor: "email"
    // },
    // {
    //     Header: "DOB",
    //     Footer: "DOB",
    //     accessor: "DOB",
    //     Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') }
    // },
    {
        Header: "Country",
        Footer: "Country",
        accessor: "country"
    },
    {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone"
    }
]

// for searching
const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span>
            Global Search:
            <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
        </span>
    )
}

export default function SortingTable() {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        state } = useTable({
            columns,
            data
        }, useGlobalFilter, useSortBy, usePagination)

    const { pageIndex, pageSize, globalFilter } = state
    return (<>
        <select value={pageSize} onChange={e => setPageSize(e.target.value)}>
            {
                [10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))
            }
        </select>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()} className="table table-striped table-hover table-bordered">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(
                                [{ className: column.className },
                                column.getSortByToggleProps(),
                                ]
                            )}>
                                <div className='position-relative'>
                                    {column.render('Header')}
                                    <div className='position-absolute bottom-0 end-0'>
                                        {column.isSorted ? (column.isSortedDesc ?
                                            <i className="bi bi-sort-up" /> :
                                            <i className="bi bi-sort-down" />) :
                                            <i className="bi bi-list disable" />}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} className="table-group-divider">
                {page.map(row => {
                    prepareRow(row)
                    return <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                })}
            </tbody>
        </table>
        <div>
            <span>
                Page:{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <br />
            <div class="btn-group" role="group" aria-label="Basic example">
                <button className="btn btn-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <i className="bi bi-chevron-double-left" />
                </button>
                <button className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <i className="bi bi-caret-left-fill" />
                </button>
                <button className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>
                    <i className="bi bi-caret-right-fill" />
                </button>
                <button className="btn btn-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <i className="bi bi-chevron-double-right" />
                </button>
            </div>
        </div>
    </>)
}
