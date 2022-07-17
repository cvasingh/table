import React, { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import DATA from './data.json'
import { COLUMNS } from './columns'

export default function PaginationTable() {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
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
        state
    } = useTable({
        columns,
        data
    }, usePagination)

    const { pageIndex, pageSize } = state
    return (<>
        <select value={pageSize} onChange={e => setPageSize(e.target.value)}>
            {
                [10, 25, 50, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))
            }
        </select>
        <table {...getTableProps()} className="table table-striped table-hover table-bordered">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
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
    </>
    )
}
