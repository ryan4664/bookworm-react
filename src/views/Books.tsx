import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import AddEditBookModal from "../components/AddEditBookModal";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import { IBook } from "../constants";
import { useAuth0 } from "../react-auth0-spa";

const Books = () => {
  const { loading: isLoadingUser, user, getTokenSilently } = useAuth0();
  const [isLoadingBooks, setIsLoadingBooks] = useState<boolean>(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [isAddingBook, setIsAddingBook] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      getBooksByUserID();
    }
  }, [user]);

  const getBooksByUserID = async () => {
    setIsLoadingBooks(true);
    const token = await getTokenSilently();
    const response = await fetch(
      `https://localhost:44350/books/user/${user.sub}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (response.status === 200) {
      const responseData = await response.json();
      setBooks(responseData);
    }
    setIsLoadingBooks(false);
  };

  const deleteBook = async (bookID: string) => {
    setIsLoadingBooks(true);
    const token = await getTokenSilently();
    const response = await fetch(`https://localhost:44350/books/${bookID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (response.status === 200) {
      getBooksByUserID();
    } else {
      setIsLoadingBooks(false);
    }
  };

  const saveBook = async (newBook: IBook) => {
    newBook.userID = user.sub;
    //@ts-ignore
    newBook.authors = newBook.authors?.join();
    const token = await getTokenSilently();
    const response = await fetch("https://localhost:44350/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBook),
    });

    if (response.status === 200) {
      setIsAddingBook(false);
      getBooksByUserID();
    }
  };

  return (
    <>
      <div className="container mb-5">
        {isLoadingBooks || isLoadingUser ? (
          <Loading />
        ) : (
          <>
            {books.map((x) => (
              <div className="row" key={x.bookID}>
                <div className="col-12">
                  <BookCard
                    book={x}
                    deleteBook={(bookID: string) => deleteBook(bookID)}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="row">
        <div className="col-12">
          <Button onClick={() => setIsAddingBook(true)}>Add Book</Button>
        </div>
      </div>
      <AddEditBookModal
        isOpen={isAddingBook}
        toggle={() => setIsAddingBook(!isAddingBook)}
        onSave={saveBook}
      />
    </>
  );
};

export default Books;
