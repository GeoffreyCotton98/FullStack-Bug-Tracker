import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TablePagination,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommentTable() {
  const [ticket, setTicket] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  useEffect(() => {
    const getTicket = async () => {
      const ticketFromServer = await fetchTicket();
      setTicket(ticketFromServer);
      const reversedComments = ticketFromServer.comments.reverse();
      setComments(reversedComments);
    };
    getTicket();
  }, []);

  const params = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = loggedInUser.token;

  const fetchTicket = async () => {
    const res = await fetch(`http://localhost:5000/api/tickets/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const addComment = async (comment) => {
    const res = await fetch(
      `http://localhost:5000/api/tickets/addComment/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(comment),
      }
    );

    setComments([comment, ...comments]);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - comments.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleComment = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = () => {
    addComment({
      user: loggedInUser.email,
      comment: commentText,
    });
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={9} lg={9}>
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="Add Comment"
          name="Add Comment"
          value={commentText}
          onChange={handleComment}
        />
      </Grid>
      <Grid item xs={3} lg={3}>
        <Button
          onClick={handleAddComment}
          variant="contained"
          sx={{
            m: 2,
          }}
        >
          Submit
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className="tableTitle">
                  <strong>Author</strong>
                </TableCell>
                <TableCell>
                  <strong>comment</strong>
                </TableCell>

                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? comments.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : comments
              ).map((comment, idx) => (
                <TableRow className="tableEl" key={idx}>
                  <TableCell>{comment.user}</TableCell>
                  <TableCell>{comment.comment}</TableCell>

                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[0]}
            component="div"
            count={comments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default CommentTable;
