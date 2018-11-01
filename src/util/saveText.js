export default function saveText(text, fileName) {
    var textFileAsBlob = new Blob([text], {type:'text/csv'});
    var downloadLink = document.createElement("a");

    downloadLink.download = fileName;

    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    } else {
      alert('This browser does not support webkitURL!');
    }
}