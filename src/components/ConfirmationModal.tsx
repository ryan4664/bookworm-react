import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface IProps {
  isOpen: boolean;
  bodyText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal = ({ isOpen, bodyText, onConfirm, onCancel }: IProps) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onCancel}>Modal title</ModalHeader>
      <ModalBody>{bodyText}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>
          Do Something
        </Button>
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
