import React from "react";

export default function OutputDescriptionModule() {
    return (
        <div className="row-span-1 col-span-2 md:p-2 rounded-lg border-1 border-gray-300">
            <div className="py-1 flex justify-between items-center space-x-3 border-b">
                <p className="text-xl font-bold">Output Description</p>
            </div>
            <p className="px-2 pt-2">Measured Execution Time : </p>
        </div>
    );
}