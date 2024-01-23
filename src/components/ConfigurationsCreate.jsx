//import useState
import { useState } from "react";

//import API
import api from "../services/api";

export default function ConfigurationsCreate() {
    //define state
    const [db_type, setDb_type] = useState("");
    const [db_name, setDb_name] = useState("");
    const [connection_string, setConnection_string] = useState("");
    const [table_name, setTable_name] = useState("");

    //state validation
    const [errors, setErrors] = useState([]);

    //method store configuration
    const storeConfiguration = async (e) => {
        e.preventDefault();

        //init FormData
        const data = {
            db_type: db_type,
            db_name: db_name,
            connection_string: connection_string,
            table_name: table_name,
        };

        console.log(data);


        //send data with API
        await api
            .post("/configurations/", data)
            .then(() => {
                //redirect to configurations index
                window.location.href = "/configurations";
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
                            <form onSubmit={storeConfiguration}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Db Type</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setDb_type(e.target.value)}
                                        placeholder="Db Type"
                                    />
                                    {errors.db_type && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.db_type[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Db Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setDb_name(e.target.value)}
                                        placeholder="Db Name"
                                    />
                                    {errors.db_name && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.db_name[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Connection String</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setConnection_string(e.target.value)}
                                        placeholder="Db Type"
                                    />
                                    {errors.connection_string && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.connection_string[0]}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Table Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setTable_name(e.target.value)}
                                        placeholder="Db Type"
                                    />
                                    {errors.table_name && (
                                        <div className="alert alert-danger mt-2">
                                            {errors.table_name[0]}
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