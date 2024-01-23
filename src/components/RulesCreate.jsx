import { useState } from "react";
import api from "../services/api";

export default function RulesCreate({ configurationId }) { // Destructurando props
    console.log(configurationId);

    // Define state
    const [rule_type, setRule_type] = useState("");
    const [field_name, setField_name] = useState("");
    const [field_value, setField_value] = useState("");
    const [position, setPosition] = useState(0); // Tratando position como número

    // State validation
    const [errors, setErrors] = useState({});

    // Method store configuration
    const storeRule = async (e) => {
        e.preventDefault();

        // Init FormData
        const data = {
            rule_type:parseInt(rule_type),
            field_name:field_name,
            field_value:field_value,
            position:parseInt(position)
        };

        console.log(data);

        // Send data with API
        await api.post(`/rules/${configurationId}`, data)
            .then(() => {
                window.location.href = `/configurations/${configurationId}`;
            })
            .catch((error) => {
                setErrors(error.response.data);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storeRule}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Rule Type</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => setRule_type(e.target.value)}
                                        placeholder="Rule Type"
                                    >
                                        <option value="">Select Rule Type</option>
                                        <option value="1">Campo</option>
                                        <option value="2">Filtro</option>
                                        <option value="3">Agregación</option>
                                    </select>
                                    {errors.rule_type && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.rule_type[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Field Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setField_name(e.target.value)}
                                        placeholder="Field Name"
                                    />
                                    {errors.field_name && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.field_name[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Field Value</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setField_value(e.target.value)}
                                        placeholder="Field Value"
                                    />
                                    {errors.field_value && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.field_value[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Position</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) => setPosition(e.target.value)}
                                        placeholder="Position"
                                    />
                                    {errors.position && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.position[0]}
                                        </div>
                                    )}
                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-md btn-primary rounded-sm shadow border-0"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}