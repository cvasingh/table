import 'bootstrap-icons/font/bootstrap-icons.css';

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Table from './components/Table';
import BasicTable from './components/BasicTable';
import FilteringTable from './components/FilteringTable';
import SortingTable from './components/SortingTable';
import PaginationTable from './components/PaginationTable';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Main />} >
        <Route path='/' element={<Table />} />
        <Route path='/BasicTable' element={<BasicTable />} />
          <Route path='/SortingTable' element={<SortingTable />} />
          <Route path='/FilteringTable' element={<FilteringTable />} />
          <Route path='/PaginationTable' element={<PaginationTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
