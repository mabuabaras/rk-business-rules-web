//import useState
import { useState } from "react";

//import API
import api from "../services/api";
export default function ConfigurationEdit({ ruleId, ruleConfiguration_id, ruleRule_type, ruleField_name, ruleField_value, rulePosition }) {
    //define state
    const [rule_type, setRule_type] = useState(ruleRule_type);
    const [field_name, setField_name] = useState(ruleField_name);
    const [field_value, setField_value] = useState(ruleField_value);
    const [position, setPosition] = useState(rulePosition);

    //state validation
    const [errors, setErrors] = useState([]);

    //method update configuration
    const updateConfiguration = async (e) => {
        e.preventDefault();

        //init FormData
        const data = {
            rule_type: parseInt(rule_type),
            field_name: field_name,
            field_value: field_value,
            position: parseInt(position),
        };

        //send data with API
        await api
            .put(`/rules/${ruleId}`, data)
            .then(() => {
                //redirect to rules index
                window.location.href = `/configurations/${ruleConfiguration_id}`;
            })
            .catch((error) => {
                //set errors response to state "errors"
                setErrors(error.response.data);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={updateConfiguration}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Rule Type</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => setRule_type(e.target.value)}
                                        value={rule_type}
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
                                        value={field_name}
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
                                        value={field_value}
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
                                        type="text"
                                        className="form-control"
                                        value={position}
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
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}