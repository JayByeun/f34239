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

    return (
        <>
            <div className="field dynamic-checkbox">
                <Database />
                <span>
                    {prefillValues.dynamic_checkbox_group ??
                        "dynamic-checkbox_group"}
                </span>
            </div>
            <div className="field dynamic-object">
                <Database />
                <span>{prefillValues.dynamic_object ?? "dynamic-object"}</span>
            </div>
            <div className="field email-form" onClick={() => setOpen(true)}>
                <span>email: {prefillValues.email}</span>
                <button>
                    <Close />
                </button>
            </div>
            <PrefillModal
                open={true}
                onClose={() => setOpen(false)}
                formData={formData}
            />
        </>
    );
};

export default FormList;
