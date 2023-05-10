import React from "react";

export default function OutputDescriptionModule() {
    return (
        <div className="row-span-1 col-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
            <div className="pb-1 flex justify-between items-center border-b">
                <p className="text-xl font-semibold">Output Description</p>
            </div>
            <div className="overflow-y-auto max-h-[80px]">
                <p className="px-2 pt-2">Measured Execution Time : </p>
            </div>
        </div>
    );
}