// import Modal from "react-modal";
import { Formik } from "formik";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styled from "styled-components";
import { object, string } from "yup";
import { IBook } from "../constants";

const Card = styled.div`
  display: flex;
  flex: 1;
  background-color: red;
`;

interface IProps {
  isOpen: boolean;
  toggle: () => void;
  onSave: (newBook: IBook) => void;
}

interface IForm {
  title: string;
  isbn?: string;
  numberOfPages?: string;
  authors?: string;
}

const AddEditBookModal = ({ isOpen, toggle, onSave }: IProps) => {
  const initialValues: IForm = {
    title: "Test Book",
    isbn: "123456789",
    numberOfPages: "100",
    authors: "Ryan Donohue",
  };

  const saveBook = async (values: IForm) => {
    let newBook: IBook = {
      userID: "",
      title: values.title,
      isbn: values.isbn,
      numberOfPages: values.numberOfPages ? +values.numberOfPages : undefined,
      authors: values?.authors?.split(",") ?? [],
    };

    onSave(newBook);
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={true}>
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
              <>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                  <div className="row">
                    <div className="col-12">
                      <form>
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
                      </form>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    color="primary"
                  >
                    Do Something
                  </Button>{" "}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </Modal>
      )}
    </>
  );
};

export default AddEditBookModal;
