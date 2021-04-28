import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { createTutorial } from "../actions/tutorials";

const AddTutorial = () => {

    const { user: currentUser } = useSelector(state => state.auth);

    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        skills: "",
        url: "",
        published: false
    };
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTutorial({ ...tutorial, [name]: value });
    };

    const saveTutorial = () => {
        const { title, description, skills, url } = tutorial;
        dispatch(createTutorial(title, description, skills, url))
            .then(data => {
                setTutorial({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    skills: data.skills,
                    url: data.url,
                    published: data.published
                });
                setSubmitted(true);

                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setSubmitted(false);
    };
    if (!currentUser) {
        return <Redirect to="/register" />;
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
          </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={tutorial.title}
                                onChange={handleInputChange}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={tutorial.description}
                                onChange={handleInputChange}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Skills</label>
                            <input
                                type="text"
                                className="form-control"
                                id="skills"
                                required
                                value={tutorial.skills}
                                onChange={handleInputChange}
                                name="skills"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Url</label>
                            <input
                                type="text"
                                className="form-control"
                                id="url"
                                required
                                value={tutorial.url}
                                onChange={handleInputChange}
                                name="url"
                            />
                        </div>

                        <button onClick={saveTutorial} className="btn btn-success">
                            Submit
          </button>
                    </div>
                )}
        </div>
    );
};

export default AddTutorial;