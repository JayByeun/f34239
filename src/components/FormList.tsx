import React, { JSX, useState, useEffect } from "react";
import Database from "../icons/Database";
import Close from "../icons/Close";
import PrefillModal from "./PrefillModal";
import { Node, Form, BlueprintGraph, PrefillConfig } from "../utils/types";

const FormList = ({
    formData,
    prefillConfig,
}: {
    formData: BlueprintGraph;
    prefillConfig: PrefillConfig;
}): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [prefillValues, setPrefillValues] = useState<
        Record<string, null | string>
    >({});
    const [activeField, setActiveField] = useState<string | null>(null);
    const [prefillMapping, setPrefillMapping] = useState<
        Record<string, string>
    >({});

    useEffect(() => {
        const newPrefillValues: Record<string, null | string> = {};

        Object.entries(prefillConfig).forEach(([fieldKey, config]) => {
            if (!config) {
                newPrefillValues[fieldKey] = null;
                return;
            }

            const { formName, field } = config;

            const node = formData.nodes.find(
                (node: Node) => node.data.name === formName
            );
            const componentId = node?.data?.component_id;
            const form = formData.forms.find(
                (form: Form) => form.id === componentId
            );
            const hasField = form?.field_schema?.properties?.[field ?? null];

            if (hasField) {
                newPrefillValues[fieldKey] = `${formName}.${field}`;
            } else {
                newPrefillValues[fieldKey] = `${formName} is not found`;
            }
        });

        setPrefillValues(newPrefillValues);
    }, [formData]);

    const handlePrefillSelect = (key: string) => {
        if (activeField) {
            setPrefillMapping((prev) => ({
                ...prev,
                [activeField]: key,
            }));
            setActiveField(null); // Reset active field after selection
            setOpen(false); // Close modal
        }
    };

    const openPrefillModal = (fieldName: string) => {
        setActiveField(fieldName);
        setOpen(true);
    };

    return (
        <>
            <div
                className="field dynamic-checkbox"
                onClick={() => openPrefillModal("dynamic_checkbox_group")}
            >
                <Database />
                <span>
                    {prefillMapping["dynamic_checkbox_group"] ??
                        "dynamic_checkbox_group"}
                </span>
            </div>
            <div
                className="field dynamic-object"
                onClick={() => openPrefillModal("dynamic_object")}
            >
                <Database />
                <span>
                    {prefillMapping["dynamic_object"] ?? "dynamic_object"}
                </span>
            </div>
            <div
                className="field email-form"
                onClick={() => openPrefillModal("email")}
            >
                <span>email: {prefillValues.email}</span>
                <button>
                    <Close />
                </button>
            </div>
            <PrefillModal
                open={open}
                onClose={() => setOpen(false)}
                formData={formData}
                onSelectPrefill={handlePrefillSelect}
            />
        </>
    );
};

export default FormList;
