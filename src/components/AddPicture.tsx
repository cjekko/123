import {useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import axios from "axios";

const AddPicture = () => {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [wasUploadedSuccessfully, setWasUploadedSuccessfully] = useState(false);
    const [hasUploadFailed, setHasUploadFailed] = useState(false);

    const fileInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files && event.target.files[0]);
        if (wasUploadedSuccessfully) {
            setWasUploadedSuccessfully(false);
        }
    };

    const submitFile = () => selectedFile?.arrayBuffer()
        .then((buffer) => {
            const data = new FormData();
            data.append("image", new Blob([buffer], {type: selectedFile?.type}))
            return data;
        })
        .then((data) => axios.post("http://localhost:8080/api/v1/pictures/add", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }))
        .then(() => {
            setSelectedFile(null);
            setWasUploadedSuccessfully(true);
        })
        .catch(() => setHasUploadFailed(true));

    return <div>
        <h1>Add picture</h1>
        <input type="file"
               onChange={fileInputHandler}
               accept=".png, .jpg, .jpeg"/>
        {wasUploadedSuccessfully && <span style={{color: "green"}}>File was uploaded successfully</span>}
        {hasUploadFailed && <span style={{color: "red"}}>File upload failed</span>}
        <br/>
        <button onClick={submitFile}>Add</button>
        <br/>
        <button onClick={() => navigate("/")}>Back</button>
    </div>
};

export default AddPicture;
