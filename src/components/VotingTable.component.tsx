import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Voter, Candidate, TableColumn } from "../types/Voting.types";
import classes from "./VotingTable.module.css";

interface VotingTableProps {
  columns: TableColumn[];
  rows: Voter[] | Candidate[];
}

export const VotingTable: React.FC<VotingTableProps> = ({ columns, rows }) => {
  const getCell = (value: any) => {
    return typeof value === "boolean" ? (value ? "X" : "") : value;
  };

  return (
    <>
      <TableContainer className={classes.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} className={classes.headerCell}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  <>
                    {Object.values(row).map((value) => (
                      <TableCell key={value}>{getCell(value)}</TableCell>
                    ))}
                  </>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
