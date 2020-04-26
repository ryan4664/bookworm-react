import React, { useState } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";
import { IBook } from "../constants";
import ConfirmationModal from "../components/ConfirmationModal";

const Card = styled.div`
  background-color: red;
  margin-bottom: 1rem;
`;

interface IProps {
  book: IBook;
  deleteBook: (bookID: string) => void;
}

const BookCard = ({ book, deleteBook }: IProps) => {
  const [bookToDelete, setBookToDelete] = useState<string>("");

  return (
    <>
      <Card>
        <div className="row">
          <div className="col-12">
            <h2>{book.title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Button
              color="danger"
              onClick={() => setBookToDelete(book.bookID!)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {bookToDelete && (
        <ConfirmationModal
          isOpen={!!bookToDelete}
          bodyText="Are you sure that you want to delete this book?"
          onConfirm={() => deleteBook(bookToDelete)}
          onCancel={() => setBookToDelete("")}
        />
      )}
    </>
  );
};

export default BookCard;
