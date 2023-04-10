import React from "react";
import {Button, Header, SubmitButton} from "../../../components";
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import MDEditor from '@uiw/react-md-editor';
import instance from "../../../ConstantValue";

const sendData = async (data: string) => {
    try {
        await instance.post('/upload', {
            markdown: data
        });
        console.log('success');
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

export default function CreateDescription() {
    const {currentColor, value, setValue} = useStateContext();

    const handleSendData = () => {
        sendData(value);
    };

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div className="flex justify-between items-center">
                    <Header category="" title="Model Description"/>
                    <div className="flex gap-3 float-right">
                        <Link to="/model/create">
                            <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                                    className="w-16 p-2" text="back"/>
                        </Link>
                        <Link to="/model/create/parameter">
                            <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                    className="w-16 p-2" text="next"/>
                        </Link>
                    </div>
                </div>
                <div className="container pt-4">
                    <MDEditor value={value} onChange={setValue}/>
                </div>
                {/*임시 데이터 전송 버튼*/}
                <SubmitButton style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                              className="w-20 p-2" text="submit" onClick={handleSendData}/>
            </div>
        </div>
    );
}