import {LoaderFunction, LoaderFunctionArgs, useLoaderData, useNavigate} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {IPicture} from "../domain/types";

export const loader: LoaderFunction = ({params}: LoaderFunctionArgs) => {
    return {pictureId: params.pictureId};
}

const Picture = () => {
    const navigate = useNavigate();
    const {pictureId} = useLoaderData() as { pictureId: string };

    const [picture, setPicture] = useState<IPicture>();
    const [creatorName, setCreatorName] = useState<string>();
    const [text, setText] = useState<string>();

    useEffect(() => {
        axios.get<IPicture>(`http://localhost:8080/api/v1/pictures/get/${pictureId}`)
            .then((response) => {
                setPicture(response.data);
            });
    }, [pictureId]);

    const addComment = async (): Promise<void> => {
        if (!pictureId || !creatorName || !text) {
            return;
        }

        await axios.post('http://localhost:8080/api/v1/comments/add', {
            pictureId,
            creatorName,
            text
        });
        return window.location.reload();
    };


    const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCreatorName(event.target.value);
    };

    const textHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return <div>
        <img style={{height: '75%', width: '75%'}}
             src={`data:image/jpeg;base64,${picture?.imageData}`}
             alt=""/>
        <br/>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={creatorName} onChange={nameHandler}/>
        <br/>
        <label htmlFor="text">Text:</label>
        <input id="text" type="textarea" value={text} onChange={textHandler}/>
        <button onClick={addComment}>Add comment</button>
        {picture?.comments && picture.comments.length > 0 && <table>
            <tbody>
            {picture.comments.map((comment) => (<tr>
                <td>{comment.creatorName}:</td>
                <td>{comment.text}</td>
            </tr>))}
            </tbody>
        </table>}
        <br/>
        <button onClick={() => navigate("/")}>Back</button>
    </div>;
};

export default Picture;
