    import React, { useState } from 'react';
    import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
    import { storage } from "../../firebase/FirebaseConfig";
    import { CiCirclePlus } from "react-icons/ci";
    import { RxCrossCircled } from "react-icons/rx";
    import "./createBlogPage.css";
    import 'ldrs/lineSpinner';



    const CreateBlogPage = () => {
    const [Title, SetTitle] = useState("");
    const [Tags, SetTags] = useState([]);
    const [Tag,SetTag]=useState("");
    const [Bodies, SetBodies] = useState([
            { text: "", 
            images: [], 
            imagePreviews: [], 
            imageURLs: [], 
            showFileUpload: true,
            isUploadingFile: false,
            fileError: false
        },
    ]);



    const stopFileErrorMessage=(index)=>{
        setTimeout(()=>{
            const newBodies = [...Bodies];
            newBodies[index].fileError = false;
            SetBodies(newBodies);
        },3000)
    }

    const handleBodyChange = (index, field, value) => {
        const newBodies = [...Bodies];
        newBodies[index][field] = value;
        SetBodies(newBodies);
    };

    const addBody = () => {
        SetBodies([...Bodies, { text: "", images: [], imagePreviews: [], imageURLs: [], showFileUpload: true,isUploadingFile: false,
            fileError: false }]);
    };

    const handleFileSelect = (index, event) => {
        const files = Array.from(event.target.files);
        const newBodies = [...Bodies];
        newBodies[index].images = files;

        const previews = files.map(file => URL.createObjectURL(file));
        newBodies[index].imagePreviews = previews;
        newBodies[index].showFileUpload = false;

        SetBodies(newBodies);
        console.log("Bodies", Bodies);
    };

    const triggerFileInput = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };

    const uploadFiles = async (index) => {
        if(Bodies[index].images.length === 0){
            console.log("No files to upload");
            const newBodies = [...Bodies];
            newBodies[index].fileError = true;
            SetBodies(newBodies);
            stopFileErrorMessage(index);
        }
        else{
        
        const body = Bodies[index];
        console.log(body);
        const urls = [...body.imageURLs]; // Retain old URLs

        console.log(body);
        console.log(urls);

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
        newBodies[index].images = '';
        SetBodies(newBodies);
        
        console.log("Bodies", Bodies);
        }
    };

    const handleRemove = (bodyIndex, imageIndex) => {
        const newBodies = [...Bodies];
        newBodies[bodyIndex].images.splice(imageIndex, 1);
        newBodies[bodyIndex].imagePreviews.splice(imageIndex, 1);
        newBodies[bodyIndex].showFileUpload = true;
        console.log(newBodies);
        SetBodies(newBodies);
    };

    const submitBlog = (Title, Bodies) => {
        console.log("1",Title,"2",Bodies);
    };

    const handleRemoveBody=(removeBodyId)=>{
        console.log(removeBodyId);
        const newBodies = Bodies.filter((body,index) => index !== removeBodyId);
        SetBodies(newBodies);
    }

    const addTag =()=>{
        if(!Tag){
            return;
        }
        SetTags([...Tags,Tag]);
        SetTag("");
    }

    const handleRemoveTag=(removeTagId)=>{
        const newTags = Tags.filter((tag,index) => index !== removeTagId);
        SetTags(newTags);
    }

    const handleRemoveUploadedImage=(bodyIndex,imageIndex)=>{
        console.log("hi")
        const newBodies = Bodies.filter((body,index) =>{
            if(index === bodyIndex){
                body.imageURLs.splice(imageIndex, 1);
                return body;
            }
            else{
                return body;
            }
        })

        SetBodies(newBodies);
        
    }

    return (
        <div className='container'>
        <div className='title'>
            <input type="text" placeholder='Enter Title' value={Title} onChange={(e) => SetTitle(e.target.value)} />
        </div>

        {Bodies.map((body, index) => (
            <div className='body' key={index}>
                {index>0 && <div>
                    <RxCrossCircled 
                    color="red"
                    className="cross-icon"
                    size={36} 
                    onClick={() => handleRemoveBody(index)} />
                </div> }   
            <textarea
                value={body.text}
                placeholder='Enter Body'
                onChange={(e) => handleBodyChange(index, 'text', e.target.value)}
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

            {!body.isUploadingFile ?<button 
                className="upload-button"
                onClick={() => uploadFiles(index)}>
                Upload
            </button>:
                <l-line-spinner
                size="30"
                stroke="3"
                speed="1"
                color="white" 
                style={{margin: "0 auto",width:'25%',backgroundColor:'#599de6',borderRadius:'20px',opacity:'0.75'}}
                ></l-line-spinner>}
            {body.fileError && 
            <p 
            style={{margin: "0 auto",width:'100%',color:'red',textAlign:'center'}}
            className="error">No file selected</p>
            }    
            <div className="image-list">
                {body.imageURLs.map((url, i) => (
                <div key={i} className='image-container'>
                    <img src={url} 
                    alt={`Uploaded ${i}`} 
                    width={200} />
                    <button className='remove-uploaded-image-button'
                        onClick={() => handleRemoveUploadedImage(index,i)}
                    ><RxCrossCircled size={24} /></button>
                </div>
                ))}
            </div>
            </div>
        ))}

        <button
            className="add-body-button"
            onClick={addBody}>
                <CiCirclePlus size={24} />
                <p className="need-to-add">add more?</p>
        </button>

        <form className='tags'>
            <input
                type="text"
                value={Tag}
                placeholder='Enter tags'
                onChange={(e) => SetTag(e.target.value)}
            />
            <button type="button" onClick={() => addTag(Tag)}>Add tag</button>
        </form>
        <div className='tag-container'>
        {Tags?.map((tag, index) => (
            <div className='tag' key={index}>
                {tag}
                <button 
                className='remove-tag'
                onClick={() => handleRemoveTag(index)}
                >
                <RxCrossCircled size={20} />
                </button>
            </div>
        ))}
        </div>

        <button
            className="submit-button"
            onClick={() => submitBlog(Title, Bodies)}>Submit</button>
        </div>
    );
    };

    export default CreateBlogPage;
