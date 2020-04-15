import React from "react";
import styled from "styled-components";
import { IBook } from "../constants";

const Card = styled.div`
  display: flex;
  flex: 1;
  background-color: red;
`;

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => (
  <Card className="bg-light p-3 text-center">
    <h2>{book.title}</h2>
  </Card>
);

export default BookCard;
