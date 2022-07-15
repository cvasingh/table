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
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(
                                [{ className: column.className },
                                column.getSortByToggleProps(),
                                ]
                            )}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ?
                                        <i className="bi bi-sort-up" /> :
                                        <i className="bi bi-sort-down" />) :
                                        <i className="bi bi-list disable" />}
                                </span>
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
