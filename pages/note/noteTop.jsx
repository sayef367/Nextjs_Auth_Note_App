export default function NoteTop(props) {
  return (
    <div className="justify-content-center mt-4">
      <div className="mb-3">
        <form>
          <input 
            onChange={props.handleFilter}
            className="form-control form-control-lg fw-light text-center me-2 border border-dark " 
            type="search" 
            placeholder="Search note title" />
        </form>
      </div>
    </div>
  );
};
