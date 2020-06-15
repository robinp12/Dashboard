import React from "react";

const USNumber = ({ averee }) => {
  let tabinf = [];
  let tab = [];
  if (typeof averee != "undefined") {
    for (let e of averee) {
      if (e.value != 0) {
        if (!tabinf.includes(e.id_service)) {
          tabinf.push(e.id_service);
        }
      }
      if (!tab.includes(e.id_service)) {
        tab.push(e.id_service);
      }
    }
  }
  return (
    <>
      <div className="col-md col-xs col-sm card">
        <div className="card-header">Unités infectées</div>
        <div className="card-body text-center">
          <span id="nb">
            {tabinf.length != 0 ? tabinf.length : 2}/
            {tab.length != 0 ? tab.length : 14}
          </span>
          <br />
          <span>Unité(s) infectées</span>
        </div>
      </div>
    </>
  );
};

export default USNumber;
