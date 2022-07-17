import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import DATA from './data.json'
import { COLUMNS } from './columns'

export default function SortingTable() {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow } = useTable({
            columns,
            data
        }, useSortBy)
    return (
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
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
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
            <tfoot>
                {footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(column => (
                            <td {...column.getFooterProps()}>
                                {column.render('Footer')}
                            </td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    )
}
