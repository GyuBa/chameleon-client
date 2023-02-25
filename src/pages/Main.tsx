import React from 'react';
import {Header} from "../components/index";

export default function Main() {
    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Main" title="What is Chameleon?"/>
            </div>
        </div>
    );
};