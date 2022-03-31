import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import COMMON_ABI from '../../common/ABI';
import { Web3Client } from "../../common/web3Client";
import Axios from "axios";
import { useEffect, useState, useContext } from "react";

/**
 * CSW | 2022.03.30 | UPDATE
 * @name ItemHistory
 * @des itemDetail ItemHistory 컴포넌트
 * HACK 위치잡기위해서 임시로 넣어둔 표
 * TODO 표 정보 연결
 */

 ColumnGroupingTable.propTypes = {
  products: PropTypes.array

};

const columns = [
  { id: 'UnitPrice', label: 'UnitPrice', minWidth: 100 },
  { id: 'Quantity', label: 'Quantity', minWidth: 100 },
  { id: 'From', label: 'From', minWidth: 100 },
  { id: 'To', label: 'To', minWidth: 100 },
  { id: 'Date', label: 'Date', minWidth: 120 },
];

function createData( UnitPrice, Quantity, From, To, Date) {

  return {  UnitPrice, Quantity, From, To, Date };
}




export default function ColumnGroupingTable({products}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const rows=[];
  console.log(products);

  products.map(async(row)=>{
    const timedata = row.completed_at;
    const realEndDate = timedata.split("T");
    const rrealEndDate = realEndDate[0] + " " + realEndDate[1].split(".")[0];

    // const res = Axios.get()


    rows.push(createData("SSF", row.price, row.seller_address, row.buyer_address, rrealEndDate));
  });

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    <Paper sx={{ width: '70%', border:'1px solid rgba(0, 0, 0, 0.1)', boxShadow: '0 0 10px rgba(225, 223, 214, 1)' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={4}>
                History
              </TableCell>

            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.Date}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
