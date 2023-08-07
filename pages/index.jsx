import { getSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import NoteTop from "./note/noteTop";
import ViewModel from "./note/viewModel";
import DeleteModel from "./note/deleteModel";
import Loading from "../components/loading";

export default function Notes() {
  const [title, setTitle] = useState('');  
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState('');
  const [modeNoteId, setModelNoteId] = useState('');
  const [fetchData, setFetchData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [api, setApi] = useState(true);
  const [empty, setEmpty] = useState(false);

  //get data from server
  useEffect(() => {
    const getNotes = async () => {
      setApi(false);
      await axios.get('/api/note/get').then(function (res) {
        setFetchData(res.data);
        setEmpty(res.data.length == 0);
      })
      .catch((error) => {
        if(error.response.data.error === undefined){
          alert('Internal error!');
        } else {
          alert(error.response.data.error);
        };
      });
      setApi(true);
    };
    getNotes();
  },[]);
  //search note
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = fetchData.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setSearchData(newFilter);
  };

  const editForm = (title, content, noteId) => {
    setTitle(title);
    setContent(content);
    setNoteId(noteId);
  };

  //note update model
  const updateNote = async (noteId) => {
    const noteIdData = { title: title, content: content }
    await axios.put(`/api/note/update?id=${noteId}`, noteIdData)
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

if(api===false) { 
  return <Loading />
} else {
  return (
    <div className="container">
      <NoteTop handleFilter={handleFilter}/>

      {/* <h1 className="text-center mt-2 mb-4">Note List - {fetchData.length}</h1> */}
      <div className="row mt-4 justify-content-md-center">
        {
          (searchData == '' ? fetchData : searchData).map((note) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={note._id} >
              <div className="card shadow" 
                onClick={(title, content, noteId) => editForm(note.title, note.content, note._id)} 
                data-bs-toggle="modal" data-bs-target="#exampleModalView">
                <div className="card-body bg-body-secondary">
                  <h6 className="card-title">{note.title.slice(0, 34)}</h6>
                  <hr />
                  <p className="card-text textSize">{note.content.slice(0, 37)}</p>
                  <button type="button" 
                    className="btn btn-outline-dark btn-sm me-1" 
                    data-bs-toggle="modal" data-bs-target="#exampleModal" 
                    onClick={(title, content, noteId) => editForm(note.title, note.content, note._id)}
                    ><i className="bi bi-pencil-square" /> 
                  </button>
                  <button type="button" 
                    className="btn btn-outline-dark btn-sm"
                    data-bs-toggle="modal" data-bs-target="#exampleModalDelete"
                    onClick={() => setModelNoteId(note._id)}
                    ><i className="bi bi-trash" />
                  </button>
                </div>
              </div>
            </div>
          )})
        }
        {/* if note is empty */}
        {(empty === true) ? <p className="text-center">Empty Note</p> : ''}

        {/* View modal */}
        <ViewModel title={title} content={content}/>

        {/* <!-- Delete Modal --> */}
        <DeleteModel deleteId={modeNoteId} />

        {/* <!-- Update Modal --> */}
        <div className="modal fade" id="exampleModal" aria-hidden="true">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Note</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="col-form-label">Title</label>
                    <input type="text" className="form-control" id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Content</label>
                    <textarea className="form-control" id="content"
                      value={content}
                      style={{ height: '150px' }}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal"
                  ><i className="bi bi-x-circle-fill" />
                </button>
                <button type="submit" className="btn btn-outline-dark"
                  onClick={() => updateNote(noteId)}
                  ><i className="bi bi-check-circle-fill" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )};
};

export async function getServerSideProps({req}) {
  const session = await getSession({ req });
  if(!session) {
    return {
      redirect: {
        destination: '/authentication',
        permeanent: false
      }
    };
  };
  // const data = {
  //   name: session.user.name,
  //   email: session.user.email
  // }
  return {
    props: {
      session,
      // user: data
    }
  };
};