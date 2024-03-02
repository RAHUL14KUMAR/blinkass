import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Upload() {
    const navigate=useNavigate();
    const [selectedFiles, setSelectedFiles] = useState(null);
    let a= Math.random();

    const [photos,setPhotos]=useState([]);


    useEffect(()=>{
        const a =JSON.parse(localStorage.getItem("user"))

        if(!a){
            navigate('/login');
            return;
        }else{
            
        }
        getPhoto();
    },[])

    const upload = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
        }

        try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE}/upload`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        console.log('File upload successful:', response.data);

        } catch (error) {
        console.error('Error uploading files:', error);
        }
    };


    const getPhoto=async()=>{
        try{
          const res=await axios.get(`${process.env.REACT_APP_SERVER_BASE}/upload/list`);
          setPhotos(res.data.data);
        }catch(error){
          console.log(error);
        }
    }
    console.log("photos",photos);


    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };
  return (
    <div className="text-center">
      <div>
        <input type="file" name="files" multiple onChange={handleFileChange} className='border-4 border-yellow-400 p-2'/>
        <button className='font-mono tracking-widest text-xl p-2 bg-yellow-400 hover:bg-yellow-600 text-black font-bold m-5 rounded-sm' onClick={upload}>UPLOAD</button>
      </div>

      {
        photos.length>0&&
        <div>
            {
                photos.map((item)=>{
                    return (
                        item.profile.map((pro)=>{
                            return <div key={item._id}>
                            <img src={`${process.env.REACT_APP_SERVER_BASE}/images`+pro} width='240' height='200'/>
                            </div>
                            
                        })
                        
                    )
                })
            }
      </div>
      }
    </div>
  )
}

export default Upload
