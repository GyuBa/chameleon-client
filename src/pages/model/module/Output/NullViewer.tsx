import React from "react";

export default function NullViewer() {
    return (
        <div>
            <div className="md:p-2 space-x-3 flex justify-between items-center border-b border-gray-300" style={{ backgroundColor: '#F6F6F6' }}>
                <p className="text-xl font-semibold">Output</p>
            </div>
        </div>
    );
}