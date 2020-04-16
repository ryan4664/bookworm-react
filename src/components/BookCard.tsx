import React from "react";
import styled from "styled-components";
import { IBook } from "../constants";

const Card = styled.div`
  display: flex;
  flex: 1;
  background-color: red;
  margin-bottom: 1rem;
`;

interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => (
  <Card>
    <h2>{book.title}</h2>
  </Card>
);

export default BookCard;
