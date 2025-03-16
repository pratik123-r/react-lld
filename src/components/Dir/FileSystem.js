import React, { useRef, useState } from 'react';
import './FileSystem.css'; // CSS for styling

// Sample file system structure
const initialFileSystem = {
    id: 1,
    name: "root",
    type: "folder",
    children: [
        {
            id: 2,
            name: "src",
            type: "folder",
            children: [
                { id: 3, name: "App.js", type: "file", children: [] },
                { id: 4, name: "index.js", type: "file", children: [] },
            ],
        },
        {
            id: 5,
            name: "public",
            type: "folder",
            children: [
                { id: 6, name: "index.html", type: "file", children: [] }
            ],
        },
        { id: 7, name: "package.json", type: "file", children: [] },
    ],
};

const FileNode = ({ node, onAdd, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addFile, setAddFile] = useState({
        isEdit: false,
        fileType: '',
    });

    const fileName = useRef('');

    function onSave(id) {
        console.log(id);

        onAdd({
            fileName: fileName.current.value,
            fileType: addFile.fileType,
            id: id
        })
    }

    return (
        <>
            <div>
                <div className='file-info'>
                    <div
                        style={{ pointerEvents: node.type === 'file' ? 'none' : '' }}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {node.type === 'file' ? '📄' : isOpen ? '📂' : '📁'} {node.name}
                    </div>
                    {node.type === 'folder' && (
                        <>
                            <div
                                onClick={() => { setAddFile({ isEdit: true, fileType: 'folder' }); setIsOpen(true) }}
                                className='add-btn'
                            >
                                Folder +
                            </div>
                            <div
                                onClick={() => { setAddFile({ isEdit: true, fileType: 'file' }); setIsOpen(true) }}
                                className='add-btn'
                            >
                                File +
                            </div>
                        </>
                    )}
                </div>

                {addFile.isEdit === true && (
                    <div className='file-info' style={{ marginTop: '10px' }}>
                        <div style={{ marginLeft: '30px' }}>
                            {addFile.fileType === 'file' ? '📄' : '📁'} <input ref={fileName} type='text' />
                        </div>
                        <div className='add-btn' onClick={() => { onSave(node.id); setAddFile({ isEdit: false, fileType: '' }) }}>Save</div>
                        <div
                            className='add-btn'
                            onClick={() => { setAddFile({ isEdit: false, fileType: '' }); }}
                        >
                            Discard
                        </div>
                    </div>
                )}
            </div>

            {isOpen && node.children && node.children.map((children) => (
                <div className='dir' >
                    <FileNode node={children} onAdd={onAdd} />
                </div>
            ))}
        </>
    );
};

export default function FileSystem() {
    const [fileSystem, setFileSystem] = useState(initialFileSystem);
    function onAdd(details) {
        const newObj = JSON.parse(JSON.stringify(fileSystem))
        travarseTree(details, newObj)
        setFileSystem(newObj)
    }
    function travarseTree(details, obj) {
        if (obj.id === details.id) {
            if (details.fileType == 'folder')
                obj.children.unshift({
                    id: new Date().getTime(),
                    name: details.fileName,
                    type: details.fileType,
                    children: []
                })
            else
                obj.children.push({
                    id: new Date().getTime(),
                    name: details.fileName,
                    type: details.fileType,
                    children: []
                })
            return
        }

        for (let i = 0; i < obj.children.length; i++) {
            travarseTree(details, obj.children[i])
        }
    }
    return (
        <div className='file-system'>
            <h2>📂 File System Explorer</h2>
            <FileNode node={fileSystem} onAdd={(data) => onAdd(data)} />
        </div>
    );
}