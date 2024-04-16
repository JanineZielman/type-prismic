import { createClient } from "../prismicio";
import { Layout } from "../components/Layout";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef, useState } from "react";

const Animate = ({ page}) => {

  const [progressBar, setProgressBar] = useState();
  let uploadProgress = []

  useEffect(() => {
    // Prevent default drag behaviors
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      document.getElementById("drop-area").addEventListener(eventName, preventDefaults, false)   
      document.body.addEventListener(eventName, preventDefaults, false)
    })
    
    // Highlight drop area when item is dragged over it
    ;['dragenter', 'dragover'].forEach(eventName => {
      document.getElementById("drop-area").addEventListener(eventName, highlight, false)
    })
    
    ;['dragleave', 'drop'].forEach(eventName => {
      document.getElementById("drop-area").addEventListener(eventName, unhighlight, false)
    })
    
    // Handle dropped files
    document.getElementById("drop-area").addEventListener('drop', handleDrop, false)

   
    
  })
  
  
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  
  function highlight(e) {
    document.getElementById("drop-area").classList.add('highlight')
  }
  
  function unhighlight(e) {
    document.getElementById("drop-area").classList.remove('active')
  }
  
  function handleDrop(e) {
    var dt = e.dataTransfer
    var files = dt.files
  
    handleFiles(files)
  }
  
  function initializeProgress(numFiles) {
    document.getElementById('progress-bar').value = 0
    uploadProgress = []
  
    for(let i = numFiles; i > 0; i--) {
      uploadProgress.push(0)
    }
  }
  
  function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    document.getElementById('progress-bar').value = total
  }
  
  function handleFiles(files) {
    files = [...files]
    initializeProgress(files.length)
    files.forEach(uploadFile)
    files.forEach(previewFile)
  }
  
  function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = reader.result
      document.getElementById('gallery').appendChild(img)
    }
  }
  
  function uploadFile(file, i) {
    var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
    var xhr = new XMLHttpRequest()
    var formData = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  
    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", function(e) {
      updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
    })
  
    xhr.addEventListener('readystatechange', function(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        updateProgress(i, 100) // <- Add this
      }
      else if (xhr.readyState == 4 && xhr.status != 200) {
        // Error. Inform the user
      }
    })
  
    formData.append('upload_preset', 'ujpu6gyk')
    formData.append('file', file)
    xhr.send(formData)
  }
  return (
    <Layout
    >
      <div className="animate-page">
        <h1>{page.data.title}</h1>

        <div id="drop-area">
          <form class="my-form">
            <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
            <input type="file" id="fileElem" multiple accept="image/*" onchange="handleFiles(this.files)"/>
            <label class="button" for="fileElem">Select some files</label>
          </form>
          <progress id="progress-bar" max="100" value="0"></progress>
          <div id="gallery"/>
        </div>
        </div>
    </Layout>
  );
};

export default Animate;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home");


  return {
    props: {
      page
    },
  };
}
