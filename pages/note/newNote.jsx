import axios from "axios";
import { useState } from "react";

export default function NewNote() {
  const [noteObj, setNoteObj] = useState({
    title: '',
    content: '',
  });

  //note data send the server
  const handleSubmit = async () => {
    await axios.post('/api/note/post', noteObj)
    .then((res) => {
      alert(res.data.message);
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
    <div className="modal fade" id="exampleModalNewNote" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="text-center">Create Note</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3 fw-light">
                <input 
                  onChange={(e) => setNoteObj({...noteObj, title: e.target.value})}
                  className="form-control" 
                  placeholder="Write Title"
                  type="text"
                  required
                />
                <label>Title</label>
              </div>
              <div className="form-floating mb-3 fw-light">
                <textarea 
                  onChange={(e) => setNoteObj({...noteObj, content: e.target.value})}
                  className="form-control" 
                  style={{ height: '150px' }} 
                  placeholder="Leave a comment here" 
                  type="text"
                  required
                />
                <label>Write Note</label>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-dark">Save Note</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};