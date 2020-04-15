import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import { Formik } from "formik";
import { object, string } from "yup";
import { IBook } from "../constants";
import BookCard from "../components/BookCard";

interface IForm {
  title: string;
  isbn?: string;
  numberOfPages?: string;
  authors?: string;
}

const Books = () => {
  const { loading: isLoadingUser, user, getTokenSilently } = useAuth0();
  const [isLoadingBooks, setIsLoadingBooks] = useState<boolean>(true);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
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

    if (user) {
      getBooksByUserID();
    }
  }, [user]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  const saveBook = async (values: IForm) => {
    let newBook: IBook = {
      userID: user.sub,
      title: values.title,
      isbn: values.isbn,
      numberOfPages: values.numberOfPages ? +values.numberOfPages : undefined,
      authors: values?.authors?.split(",") ?? [],
    };
    const token = await getTokenSilently();
    const response = await fetch("https://localhost:44350/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBook),
    });

    console.log("response", response);
  };

  const initialValues: IForm = {
    title: "Test Book",
    isbn: "123456789",
    numberOfPages: "100",
    authors: "Ryan Donohue",
  };

  return (
    <div className="container mb-5">
      {isLoadingBooks || isLoadingUser ? (
        <Loading />
      ) : (
        <>
          {books.map((x) => (
            <div className="row" key={x.bookID}>
              <div className="col-12">
                <BookCard book={x} />
              </div>
            </div>
          ))}
        </>
      )}

      <div className="row align-items-center profile-header mb-5 text-center text-md-left">
        <p>hello {user.nickname}</p>
        <div className="row">
          <div className="col-12">
            <Formik
              initialValues={initialValues}
              validationSchema={object({
                title: string()
                  .max(100, "Title be 100 characters or less")
                  .min(3, "Title be 3 characters or more")
                  .required("Title is required"),
              })}
              onSubmit={saveBook}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  {errors.title && touched.title && errors.title}
                  <input
                    type="text"
                    name="isbn"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.isbn}
                  />
                  {errors.isbn && touched.isbn && errors.isbn}
                  <input
                    type="text"
                    name="numberOfPages"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numberOfPages}
                  />
                  {errors.numberOfPages &&
                    touched.numberOfPages &&
                    errors.numberOfPages}
                  <input
                    type="text"
                    name="authors"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.authors}
                  />
                  {errors.authors && touched.authors && errors.authors}
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
