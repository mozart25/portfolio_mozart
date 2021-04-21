import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTutorial, deleteTutorial } from "../actions/tutorials";
import TutorialDataService from "../services/TutorialService";
import FileUpload from "./FileUpload";


const Tutorial = (props) => {
    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        skills: "",
        url: "",
        published: false
    };
    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getTutorial = id => {
        TutorialDataService.get(id)
            .then(response => {
                setCurrentTutorial(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTutorial(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentTutorial({ ...currentTutorial, [name]: value });
    };

    const updateStatus = status => {
        const data = {
            id: currentTutorial.id,
            title: currentTutorial.title,
            description: currentTutorial.description,
            skills: currentTutorial.skills,
            url: currentTutorial.url,
            published: status
        };

        dispatch(updateTutorial(currentTutorial.id, data))
            .then(response => {
                console.log(response);

                setCurrentTutorial({ ...currentTutorial, published: status });
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateContent = () => {
        dispatch(updateTutorial(currentTutorial.id, currentTutorial))
            .then(response => {
                console.log(response);

                setMessage("The tutorial was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeTutorial = () => {
        dispatch(deleteTutorial(currentTutorial.id))
            .then(() => {
                props.history.push("/tutorials");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentTutorial.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentTutorial.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Skills</label>
                            <input
                                type="text"
                                className="form-control"
                                id="skills"
                                name="skills"
                                value={currentTutorial.skills}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Url</label>
                            <input
                                type="text"
                                className="form-control"
                                id="url"
                                name="url"
                                value={currentTutorial.url}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>
                    </form>
                    <FileUpload />
                    {currentTutorial.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateStatus(false)}
                        >
                            UnPublish
            </button>
                    ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => updateStatus(true)}
                            >
                                Publish
            </button>
                        )}

                    <button className="badge badge-danger mr-2" onClick={removeTutorial}>
                        Delete
          </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Update
          </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>프로젝트를 선택해 주세요...</p>
                    </div>
                )}
        </div>);
};

export default Tutorial;