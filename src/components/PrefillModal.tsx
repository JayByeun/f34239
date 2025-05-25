import React, { JSX, useState, useEffect } from "react";
import Close from "../icons/Close";
import Search from "../icons/Search";
import "./styles/PrefillModal.css";
import RightArrow from "../icons/RightArrow";
import { BlueprintGraph, Node, Form } from "../utils/types";

const PrefillModal = ({
    open,
    onClose,
    formData,
}: {
    open: boolean;
    onClose: () => void;
    formData: BlueprintGraph;
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
    useEffect(() => {
        const node = formData.nodes.find(
            (node: Node) => node.data.name === "Form A"
        );
        const componentId = node?.data?.component_id;
        const form = formData.forms.find(
            (form: Form) => form.id === componentId
        );

        if (form && form.field_schema && form.field_schema.properties) {
            const keys = Object.keys(form.field_schema.properties);
            const spans = keys.map((key) => (
                <span className="field-key" key={key}>
                    {key}
                </span>
            ));

            setAvailableData((prev) =>
                prev.map((item) =>
                    item.title === "Form A"
                        ? { ...item, content: <>{spans}</> }
                        : item
                )
            );
        } else {
            setAvailableData((prev) =>
                prev.map((item) =>
                    item.title === "Form A"
                        ? { ...item, content: <span>No content</span> }
                        : item
                )
            );
        }
    }, [formData]);
    return (
        open && (
            <div className="overlay">
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <button className="close" onClick={onClose}>
                        <Close />
                    </button>
                    <span className="header">Select data element to map</span>
                    <div className="container">
                        <div className="sidebar">
                            <span>Available data</span>
                            <div className="search">
                                <Search />
                                <input name="search" placeholder="Search" />
                            </div>
                            <Accordion items={availableData} />
                        </div>
                        <div className="content"></div>
                    </div>
                </div>
            </div>
        )
    );
};

export default PrefillModal;

interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

const Accordion = ({ items }: { items: AccordionItem[] }) => {
    const [openIndex, setOpenIndex] = useState<null | number>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div key={index} className="container">
                    <button
                        onClick={() => toggleIndex(index)}
                        className="title"
                    >
                        <RightArrow />
                        {item.title}
                    </button>
                    {openIndex === index && (
                        <div className="content">{item.content}</div>
                    )}
                </div>
            ))}
        </div>
    );
};
