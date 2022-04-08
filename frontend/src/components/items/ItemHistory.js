import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { useState } from "react";

/**
 * CSW | 2022.03.30 | UPDATE
 * @name ItemHistory
 * @des itemDetail ItemHistory 컴포넌트
 * HACK 위치잡기위해서 임시로 넣어둔 표
 * TODO 표 정보 연결
 */

ColumnGroupingTable.propTypes = {
  products: PropTypes.array,
};

const columns = [
  { id: "no", label: "no", minWidth: 20 },
  { id: "Unit", label: "Unit", minWidth: 70 },
  { id: "Price", label: "Price", minWidth: 70 },
  { id: "From", label: "From", minWidth: 90 },
  { id: "To", label: "To", minWidth: 90 },
  { id: "Date", label: "Date", minWidth: 120 },
];

function createData(no, Unit, Price, From, To, Date) {
  return { no, Unit, Price, From, To, Date };
}

export default function ColumnGroupingTable({ products }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let idx = 1;

  const rows = [];

  products.map((row) => {
    const timedata = row.completed_at;
    let newDate = new Date(timedata);
    newDate.setHours(newDate.getHours() + 9);
    const realEndDate = newDate.toISOString().split("T");
    const rrealEndDate = realEndDate[0] + " " + realEndDate[1].split(".")[0];

    rows.push(
      createData(
        idx,
        "SSF",
        row.price,
        row.seller_address,
        row.buyer_address,
        rrealEndDate
      )
    );
    idx++;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "70%",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0 0 10px rgba(225, 223, 214, 1)",
      }}
    >
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={6}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    <TableCell
                      key={columns[0].id}
                      align={columns[0].align}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "80px",
                      }}
                    >
                      {row[columns[0].id]}
                    </TableCell>
                    <TableCell
                      key={columns[1].id}
                      align={columns[1].align}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "80px",
                      }}
                    >
                      {row[columns[1].id]}
                    </TableCell>
                    <TableCell
                      key={columns[2].id}
                      align={columns[2].align}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "50px",
                      }}
                    >
                      {row[columns[2].id]}
                    </TableCell>
                    <TableCell
                      key={columns[3].id}
                      align={columns[3].align}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "90px",
                      }}
                    >
                      {row[columns[3].id]}
                    </TableCell>
                    <TableCell
                      key={columns[4].id}
                      align={columns[4].align}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "90px",
                      }}
                    >
                      {row[columns[4].id]}
                    </TableCell>
                    <TableCell
                      key={columns[5].id}
                      align={columns[5].align}
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        maxWidth: "200px",
                      }}
                    >
                      {row[columns[5].id]}
                    </TableCell>
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
