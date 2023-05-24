import React, {Dispatch, SetStateAction} from 'react';
import '../../styles/delete-modal.css';
import {DeleteModalContext} from "../../types/chameleon-client";
import {PlatformAPI} from "../../platform/PlatformAPI";

export default function DeleteModal({modalData, setModalData, setSelectedModelId}: {
    modalData: DeleteModalContext,
    setModalData: Dispatch<SetStateAction<DeleteModalContext>>,
    setSelectedModelId: React.Dispatch<React.SetStateAction<number>>;
}) {
    if (!modalData.open) {
        return <></>;
    }
    const model = modalData.currentModel;

    return (
        <div className='modal'>
            <section>
                <header>
                    {`${model.name}을 삭제하시겠습니까?`}
                    <button className="close" onClick={() => setModalData({...modalData, open: false})}>
                        &times;
                    </button>
                </header>
                <footer>
                    <button className="submit" onClick={async () => {
                        try {
                            console.log('HELLO');
                            await PlatformAPI.deleteModelById(modalData.currentModel.id);
                            setModalData({...modalData, open: false});
                            setSelectedModelId(-1);
                        } catch (e: any) {
                            alert(`Error: ${e?.response.data.reason}`);
                        }
                    }}>
                        delete
                    </button>
                    <button className="close" onClick={() => setModalData({...modalData, open: false})}>
                        close
                    </button>
                </footer>
            </section>
        </div>
    )
}