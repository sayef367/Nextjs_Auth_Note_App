import axios from "axios";

export default function DeleteModel(props) {

  //note delete method
  const deleteNote = async (noteId) => {
    await axios.delete(`/api/note/delete?id=${noteId}`)
    .then((res) => {
      alert(res.data.message);
      window.location.reload(false);
    })
    .catch((error) => {
      if(error.response.data.error === undefined){
        alert('Internal error!');
      } else {
        alert(error.response.data.error);
      };
    });
  };

  return (
    <div className="modal fade" id="exampleModalDelete" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="row pt-3 pb-1">
            <div className="col-6">
              <p className="ps-3">Are you delete this note!</p>
            </div>
            <div className="col-6 text-end pe-4">
              <button type="button" className="btn btn-outline-dark btn-sm me-2" data-bs-dismiss="modal"
                ><i className="bi bi-x-lg" />
              </button>
              <button type="button" 
                className="btn btn-outline-dark btn-sm"
                onClick={() => deleteNote(props.deleteId)}
                ><i className="bi bi-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
