export default function ViewModel(props) {
  return (
    <div className="modal fade" id="exampleModalView" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {props.content}
          </div>
        </div>
      </div>
    </div>
  );
};
