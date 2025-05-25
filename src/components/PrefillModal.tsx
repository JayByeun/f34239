import React, { JSX, useState, useEffect } from "react";
import Close from "../icons/Close";
import Search from "../icons/Search";
import "./styles/PrefillModal.css";
import RightArrow from "../icons/RightArrow";
import { BlueprintGraph, Node, Form } from "../utils/types";
import ArrowDown from "../icons/ArrowDown";

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
    const [search, setSearch] = useState("");

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
                const keys = Object.keys(form.field_schema.properties);
                const spans = keys.map((key) => (
                    <span className="field-key" key={key}>
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
    return (
        open && (
            <div className="overlay">
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <button className="close" onClick={onClose}>
                        <Close />
                    </button>
                    <div className="contents-wrapper">
                        <span className="header">
                            Select data element to map
                        </span>
                        <div className="container">
                            <div className="sidebar">
                                <span>Available data</span>
                                <div className="search">
                                    <Search />
                                    <input
                                        name="search"
                                        placeholder="Search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <Accordion
                                    items={availableData.filter((item) =>
                                        item.title
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    )}
                                />
                            </div>
                            <div className="content"></div>
                        </div>
                        <div className="buttons">
                            <button className="cancel">Cancel</button>
                            <button className="select">Select</button>
                        </div>
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
                        {openIndex === index ? <ArrowDown /> : <RightArrow />}
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
