import React from "react";
import Popup from "reactjs-popup";

const DeletePopup = ({ deletepop }) => {
  return (
    <Popup
      trigger={<button className="btn btn-danger">X </button>}
      position="left center"
      closeOnDocumentClick
    >
      {(close) => (
        <div className="popup">
          <span>Voulez-vous vraiment supprimer l'élément ?</span>
          <button className="btn btn-outline-danger mr-1" onClick={deletepop}>
            Oui
          </button>
          <button className="btn btn-outline-secondary ml-1" onClick={close}>
            Non
          </button>
        </div>
      )}
    </Popup>
  );
};
export default DeletePopup;
