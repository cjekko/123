import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {IPicture} from "../domain/types";
import axios from "axios";
import {chunk} from "lodash";

const Pictures = () => {
    const navigate = useNavigate();
    const [pictures, setPictures] = useState<Array<IPicture>>([]);

    useEffect(() => {
        axios.get<Array<IPicture>>("http://localhost:8080/api/v1/pictures/get")
            .then((response) => {
                setPictures(response.data);
            })
            .catch(console.error);
    }, []);

    const openPicture = (pictureId: number | undefined): void => {
        if (!pictureId) {
            return;
        }
        return navigate(`/picture/${pictureId}`);
    };


    return <div>
        <h1>Pictures</h1>
        <button onClick={() => navigate("/add-picture")}>Add picture</button>
        <table>
            {<tbody>
            {chunk(pictures, 4)
                .map((chunk, index) =>
                    (<tr key={`row-${index}`}>
                        {chunk.map((picture) =>
                            (<td key={`image-${picture.id}`} onClick={() => openPicture(picture.id)}>
                                <img style={{height: '50%', width: '50%'}}
                                     src={`data:image/jpeg;base64,${picture.imageData}`}
                                     alt=""/>
                            </td>)
                        )}
                    </tr>)
                )}
            </tbody>}
        </table>
    </div>
};

export default Pictures;
