import React, { JSX, useState, useEffect } from "react";
import Database from "../icons/Database";
import Close from "../icons/Close";
import PrefillModal from "./PrefillModal";
import "./styles/FormList.css";
import { Node, Form, BlueprintGraph, PrefillConfig } from "../utils/types";

const FormList = ({
    formData,
    prefillConfig,
    editMode,
}: {
    formData: BlueprintGraph;
    prefillConfig: PrefillConfig;
    editMode: boolean;
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
            setActiveField(null);
            setOpen(false);
        }
    };

    const openPrefillModal = (fieldName: string) => {
        if (!editMode) {
            return;
        }
        setActiveField(fieldName);
        setOpen(true);
    };

    const firstField = (
        <div
            data-testid="first"
            className={`field dynamic-checkbox ${
                !prefillMapping["dynamic_checkbox_group"] ? "empty" : ""
            }`}
            onClick={() => openPrefillModal("dynamic_checkbox_group")}
        >
            <Database />
            <span>
                {prefillMapping["dynamic_checkbox_group"] ??
                    "dynamic_checkbox_group"}
            </span>
        </div>
    );

    const secondField = (
        <div
            data-testid="second"
            className={`field dynamic-object ${
                !prefillMapping["dynamic_object"] ? "empty" : ""
            }`}
            onClick={() => openPrefillModal("dynamic_object")}
        >
            <Database />
            <span>{prefillMapping["dynamic_object"] ?? "dynamic_object"}</span>
        </div>
    );

    const thirdField = (
        <div data-testid="third" className="email-form">
            <span>email: {prefillValues.email}</span>
            <button
                data-testid="clear"
                className={!editMode ? "view" : ""}
                onClick={(e) => {
                    e.stopPropagation();
                    prefillValues["email"] = null;
                    setPrefillValues({ ...prefillValues, email: null });
                }}
            >
                <Close />
            </button>
        </div>
    );

    return (
        <>
            {firstField}
            {secondField}
            {thirdField}
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
