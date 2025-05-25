import React, { JSX, useState, useEffect } from "react";
import Close from "../icons/Close";
import Search from "../icons/Search";
import "./styles/PrefillModal.css";
import { BlueprintGraph, Node, Form } from "../utils/types";
import Accordion from "./Accordion";

const PrefillModal = ({
    open,
    onClose,
    formData,
    onSelectPrefill,
}: {
    open: boolean;
    onClose: () => void;
    formData: BlueprintGraph;
    onSelectPrefill: (key: string) => void;
}): boolean | JSX.Element => {
    const [availableData, setAvailableData] = useState([
        { title: "Action Properties", content: <span>No content</span> },
        {
            title: "Client Organisation Properties",
            content: <span>No content</span>,
        },
        { title: "Form A", content: <span>No content</span> },
        { title: "Form B", content: <span>No content</span> },
    ]);
    const [search, setSearch] = useState("");
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<any>(null);

    useEffect(() => {
        const formTitles = ["Form A", "Form B"];

        const updatedData = availableData.map((item) => {
            if (!formTitles.includes(item.title)) {
                return item;
            }
            const node = formData.nodes.find(
                (node: Node) => node.data.name === item.title
            );
            const componentId = node?.data?.component_id;
            const form = formData.forms.find(
                (form: Form) => form.id === componentId
            );

            if (form?.field_schema?.properties) {
                const entries = Object.entries(form.field_schema.properties);
                const spans = entries.map(([key, value]) => (
                    <span
                        data-testid={key}
                        className="field-key"
                        key={key}
                        onClick={() => {
                            setSelectedKey(key);
                            setSelectedValue(value);
                            onSelectPrefill(key);
                        }}
                    >
                        {key}
                    </span>
                ));
                return { ...item, content: <>{spans}</> };
            } else {
                return {
                    ...item,
                    content: <span className="field-key">No content</span>,
                };
            }
        });

        setAvailableData(updatedData);
    }, [formData]);

    const closeSelf = () => {
        setSearch("");
        setSelectedKey(null);
        setSelectedValue(null);
        onClose();
    };

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeSelf();
        }
    });

    const sidebar = (
        <div className="sidebar">
            <span>Available data</span>
            <div className="search">
                <Search />
                <input
                    name="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Accordion
                items={availableData.filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                )}
            />
        </div>
    );

    const formContent = (
        <div className="content">
            {selectedKey ? (
                <>
                    <h3>
                        Selected Key: <code>{selectedKey}</code>
                    </h3>
                    <pre>{JSON.stringify(selectedValue, null, 2)}</pre>
                </>
            ) : (
                <span>Select a field to view its value</span>
            )}
        </div>
    );

    const buttons = (
        <div className="buttons">
            <button className="cancel" onClick={closeSelf}>
                Cancel
            </button>
            <button
                data-testid="select"
                disabled={!selectedKey}
                className="select"
                onClick={() => {
                    if (!selectedKey) {
                        return;
                    }
                    onSelectPrefill(selectedKey);
                    closeSelf();
                }}
            >
                Select
            </button>
        </div>
    );

    return (
        open && (
            <div className="overlay" onClick={closeSelf}>
                <div
                    data-testid="modal"
                    className="modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close" onClick={closeSelf}>
                        <Close />
                    </button>
                    <div className="contents-wrapper">
                        <span className="header">
                            Select data element to map
                        </span>
                        <div className="container">
                            {sidebar}
                            {formContent}
                        </div>
                        {buttons}
                    </div>
                </div>
            </div>
        )
    );
};

export default PrefillModal;
