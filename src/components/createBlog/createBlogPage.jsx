    import React, { useState } from 'react';
    import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { storage } from "../../firebase/FirebaseConfig";
    import { CiCirclePlus } from "react-icons/ci";
    import { RxCrossCircled } from "react-icons/rx";
    import "./createBlogPage.css";

    const CreateBlogPage = () => {
    const [Title, SetTitle] = useState("");
    const [Bodies, SetBodies] = useState([
        { text: "", additionalData: "", images: [], imagePreviews: [], imageURLs: [], showFileUpload: true }
    ]);

    const handleBodyChange = (index, field, value) => {
        const newBodies = [...Bodies];
        newBodies[index][field] = value;
        SetBodies(newBodies);
    };

    const addBody = () => {
        SetBodies([...Bodies, { text: "", additionalData: "", images: [], imagePreviews: [], imageURLs: [], showFileUpload: true }]);
    };

    const handleFileSelect = (index, event) => {
        const files = Array.from(event.target.files);
        const newBodies = [...Bodies];
        newBodies[index].images = files;

        const previews = files.map(file => URL.createObjectURL(file));
        newBodies[index].imagePreviews = previews;
        newBodies[index].showFileUpload = false;

        SetBodies(newBodies);
    };

    const triggerFileInput = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };

    const uploadFiles = async (index) => {
        const body = Bodies[index];
        const urls = [...body.imageURLs]; // Retain old URLs

        for (let i = 0; i < body.images.length; i++) {
        const imageRef = ref(storage, `multipleFiles/${body.images[i].name}`);
        await uploadBytes(imageRef, body.images[i])
            .then(async () => {
            const url = await getDownloadURL(imageRef);
            urls.push(url);
            console.log("Success");
            })
            .catch(error => {
            console.log("Error", error);
            });
        }

        const newBodies = [...Bodies];
        newBodies[index].imageURLs = urls;
        newBodies[index].showFileUpload = true;
        SetBodies(newBodies);
    };

    const handleRemove = (bodyIndex, imageIndex) => {
        const newBodies = [...Bodies];
        newBodies[bodyIndex].images.splice(imageIndex, 1);
        newBodies[bodyIndex].imagePreviews.splice(imageIndex, 1);
        newBodies[bodyIndex].showFileUpload = true;
        console.log(newBodies);
        SetBodies(newBodies);
    };

    return (
        <div className='container'>
        <div className='title'>
            <input type="text" placeholder='Enter Title' value={Title} onChange={(e) => SetTitle(e.target.value)} />
        </div>

        {Bodies.map((body, index) => (
            <div className='body' key={index}>
            <textarea
                value={body.text}
                placeholder='Enter Body'
                onChange={(e) => handleBodyChange(index, 'text', e.target.value)}
            />
            <input
                type="text"
                value={body.additionalData}
                placeholder='Enter tags'
                onChange={(e) => handleBodyChange(index, 'additionalData', e.target.value)}
            />

            <div className="file-input-container">
                <input
                type="file"
                id={`fileInput${index}`}
                hidden
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(index, e)}
                />
                {body.showFileUpload && <img
                src={"https://imgs.search.brave.com/VSLi9jSoG-pn_vdjTbeywhjH7vIJLtle5wtWJGKkeCo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly95b3Vy/aW1hZ2VzaGFyZS5j/b20vaW1hZ2VzL3Nl/Y3Rpb25zL3VwbG9h/ZC5zdmc"}
                alt="Upload"
                width={150}
                className="upload-image"
                onClick={() => triggerFileInput(index)}
                />}
                {!body.showFileUpload && <div className="preview-container">
                {body.imagePreviews.map((url, i) => (
                    <div key={i} className='preview'>
                    <img key={i} src={url} alt={`Preview ${i}`} width={200} />
                    <button className='cross-button'
                        onClick={() => handleRemove(index, i)}
                    ><RxCrossCircled size={24} /></button>
                    </div>
                ))}
                </div>}
            </div>

            <button 
                className="upload-button"
                onClick={() => uploadFiles(index)}>Upload Selected Images</button>

            <div className="image-list">
                {body.imageURLs.map((url, i) => (
                <div key={i}>
                    <img src={url} alt={`Uploaded ${i}`} width={200} />
                </div>
                ))}
            </div>
            </div>
        ))}

        <button
            className="add-body-button"
            onClick={addBody}>
                <CiCirclePlus size={24} />
                <p className="need-to-add">Need to add more,Click here?</p>
        </button>

        <button
            className="submit-button"
            onClick={() => console.log(Title, Bodies)}>Submit</button>
        </div>
    );
    };

    export default CreateBlogPage;
