import "../App.css";

export const TaskContainer = (props) => {
  return (
    <div className="container d-flex justify-content-center">
      {props.isEditing ? (
        <div className="py-3 row gap-2 d-flex justify-content-center align-items-center save w-100 ">
          <input
            className="col-md-6 px-3 rounded "
            style={{
              fontSize: "24px",
              fontFamily: "monospace",
              fontWeight: "400px",
            }}
            type="text"
            value={props.editedTaskName}
            onChange={props.editTaskVal}
          />
          <button className="btn col-md-2" onClick={props.saveEdit}>
            Save
          </button>
        </div>
      ) : (
        <div className="py-3 row gap-2 d-flex justify-content-center align-items-center w-100">
          <div className="form-check col-md-6 px-5 py-md-0 py-3 d-flex">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => props.completeTask(props.id)}
              checked={props.completed}
              style={{ height: "25px", width: "25px" }}
            />
            <label
              className="form-check-label px-3 text-white"
              style={{
                textDecoration: props.completed ? "line-through" : "none",
                fontSize: "24px",
                fontFamily: "monospace",
                fontWeight: "400px",
              }}
            >
              {props.taskName}
            </label>
          </div>
          <div className="row col-md-2 gap-2 g-0 d-flex justify-content-center align-items-center">
            <button
              className="btn btn-warning col-sm-5"
              onClick={() => props.editTask(props.id, props.taskName)}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn btn-danger col-sm-5"
              onClick={() => props.deleteTask(props.id)}
            >
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
