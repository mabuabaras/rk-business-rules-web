import { useState, useEffect } from "react";
import api from "../services/api"; // Asegúrate de que este sea el camino correcto a tu archivo api.js

export default function RulesIndex(props) {
    const { configurationId } = props;
    const [rules, setRules] = useState([]);

    // Método para obtener las Reglas
    const fetchDataRules = async () => {
        try {
            const response = await api.get(`/rules/${configurationId}`);
            console.log("Datos recibidos:", response.data); // Agregar para depurar
            setRules(response.data);
        } catch (error) {
            console.error('Error al obtener las reglas:', error);
            setRules([]);
        }
    };

    // Hook useEffect para llamar a fetchDataRules al montar el componente
    useEffect(() => {
        fetchDataRules();
    }, [configurationId]);

    // Método para eliminar una regla
    const deleteRule = async (id_rule) => {
        try {
            await api.delete(`/rules/${id_rule}`);
            fetchDataRules();
        } catch (error) {
            console.error('Error al eliminar la regla:', error);
        }
    };

    return (
        <table className="table table-bordered">
            <thead className="bg-dark text-white">
            <tr>
                <th scope="col">Id Rule</th>
                <th scope="col">Configuration Id</th>
                <th scope="col">Rule Type</th>
                <th scope="col">Field Name</th>
                <th scope="col">Field Value</th>
                <th scope="col">Position</th>
                <th scope="col" style={{width: "25%"}}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {rules.length > 0 ? (
                rules.map((rule, index) => (
                    <tr key={index}>
                        <td>{rule.id}</td>
                        <td>{rule.configuration_id}</td>
                        <td>{rule.rule_type}</td>
                        <td>{rule.field_name}</td>
                        <td>{rule.field_value}</td>
                        <td>{rule.position}</td>
                        <td className="text-center">
                            <a
                                href={`/configurations/rules/edit/${rule.configuration_id}-${rule.id}`}
                                className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                            >
                                EDIT
                            </a>

                            <button
                                onClick={() => deleteRule(rule.id)}
                                className="btn btn-sm btn-danger rounded-sm shadow border-0">
                                DELETE
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="7" className="text-center">
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
