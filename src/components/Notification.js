import React from 'react';

export const Notification = (props) => {

    let className = "p-3 mb-2 rounded text-white ";

    switch (props.type) {
        case 'ERROR':
            className += "bg-danger";
            break;
        case 'SUCCESS':
            className += "bg-success";
            break;
        default:
            break;
    }

    return (
        <div className={className}>
            {props.text}
        </div>
    );
} 