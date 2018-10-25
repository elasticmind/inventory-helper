<template>
  <div id="app">
    <navigation />
    <keep-alive>
    <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  components: {
    Navigation
  }
};

/*
// TODO
function saveTextAsFile()
{
    var textToWrite = document.getElementById("inputTextToSave").value;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
      var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}
 */
</script>


<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
}

ul {
  list-style-type: none;
}

html:root {
  font-size: 20px;
  background-color: #222;
}

input[type="text"] {
  background-color: #ddd;
  display: block;
  height: 30px;
  width: 100%;
  margin-right: 5px;
  border: none;
  font-size: 1.2rem;
  padding: 5px;
}

input[type="checkbox"] {
  width: 40px;
  transform: scale(1.5);
}

button {
  font-size: 1.1rem;
  padding: 5px 20px;
  border-radius: 1000px;
  border: none;
  cursor: pointer;
}

.filter-wrapper {
  height: 40px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  width: 80%;
}
</style>
