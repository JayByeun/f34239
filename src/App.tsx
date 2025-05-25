import "./App.css";
import React, { useEffect, useState } from "react";
import { BlueprintGraph, FormInfo } from "./utils/types";
import { API_URL } from "./utils/utils";
import FormList from "./components/FormList";
import ToggleButton from "./components/ToggleButton";

export const PREFILL_CONFIG = {
    email: { formName: "Form A", field: "email" } as FormInfo,
    dynamic_checkbox_group: null,
    dynamic_object: null,
};
function App() {
    const [graphData, setGraphData] = useState<BlueprintGraph | null>(null);
    const [error, setError] = useState<null | string>(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchFormGraph = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) {
                    throw new Error(`HTTP Error, status: ${res.status}`);
                }
                const data = await res.json();
                setGraphData(data);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError(String(e));
                }
            }
        };

        fetchFormGraph();
    }, []);

    if (!graphData) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        !error && (
            <div className="App">
                <div className="header-wrapper">
                    <div className="header">
                        <h2>Prefill</h2>
                        <span className="description">
                            Prefill fields for this form
                        </span>
                    </div>
                    <div className="toggle">
                        <span>{editMode ? "Edit" : "View"}</span>
                        <ToggleButton onClick={() => setEditMode(!editMode)} />
                    </div>
                </div>
                <div className={`fields ${!editMode ? "view" : ""}`}>
                    <FormList
                        formData={graphData}
                        prefillConfig={PREFILL_CONFIG}
                        editMode={editMode}
                    />
                </div>
            </div>
        )
    );
}

export default App;
