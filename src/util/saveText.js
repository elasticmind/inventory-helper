export default function saveText(text, fileName) {
    var textFileAsBlob = new Blob([text], {type:'text/csv'});
    var downloadLink = document.createElement("a");

    downloadLink.download = fileName;

    if (window.URL != null) {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    } else {
      alert('This browser does not support webkitURL!');
    }
}