import React, { JSX, useState, useEffect } from "react";
import ArrowDown from "../icons/ArrowDown";
import RightArrow from "../icons/RightArrow";
import "./styles/Accordion.css";

interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

const Accordion = ({ items }: { items: AccordionItem[] }): JSX.Element => {
    const [openIndex, setOpenIndex] = useState<null | number>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div key={index} className="wrapper">
                    <button
                        data-testid={item.title}
                        onClick={() => toggleIndex(index)}
                        className="name"
                    >
                        {openIndex === index ? <ArrowDown /> : <RightArrow />}
                        {item.title}
                    </button>
                    {openIndex === index && (
                        <div className="details">{item.content}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
