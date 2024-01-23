import { useState, useEffect } from "react";
import api from "../services/api"; // Asegúrate de que este sea el camino correcto a tu archivo api.js

export default function ConfigurationsIndex() {
    const [configurations, setConfigurations] = useState([]);

    // Método para obtener las configuraciones
    const fetchDataConfigurations = async () => {
        try {
            const response = await api.get("/configurations/");

            console.log("Datos recibidos:", response.data); // Agregar para depurar
            setConfigurations(response.data);
        } catch (error) {
            console.error('Error al obtener las configuraciones:', error);
            setConfigurations([]);
        }
    };


    // Hook useEffect para llamar a fetchDataConfigurations al montar el componente
    useEffect(() => {
        fetchDataConfigurations();
    }, []);

    //method deletePost
    const deleteConfiguration = async (id) => {
        //delete with api
        await api.delete(`/configurations/${id}`).then(() => {
            //call method "fetchDataConfigurations"
            fetchDataConfigurations();
        });
    };

    return (
        <table className="table table-bordered">
            <thead className="bg-dark text-white">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">DB Type</th>
                <th scope="col">DB Name</th>
                <th scope="col">Connection String</th>
                <th scope="col">Table Name</th>
                <th scope="col" style={{width: "25%"}}>
                    Actions
                </th>
            </tr>
            </thead>
            <tbody>
            {configurations.length > 0 ? (
                configurations.map((configuration, index) => (
                    <tr key={index}>
                        <td>{configuration.id}</td>
                        <td>{configuration.db_type}</td>
                        <td>{configuration.db_name}</td>
                        <td>{configuration.connection_string}</td>
                        <td>{configuration.table_name}</td>
                        <td className="text-center">
                            <a
                                href={`/configurations/edit/${configuration.id}`}
                                className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                            >
                                EDIT
                            </a>

                            <a
                                href={`/configurations/${configuration.id}`}
                                className="btn btn-sm btn-secondary rounded-sm shadow border-0 me-2"
                            >
                                RULES
                            </a>

                            <button
                                onClick={() => deleteConfiguration(configuration.id)}
                                className="btn btn-sm btn-danger rounded-sm shadow border-0">
                                DELETE
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center">
                        <div className="alert alert-danger mb-0">
                            Empty Data...
                        </div>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}