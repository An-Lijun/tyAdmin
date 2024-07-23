
const getIframe=()=>{
  const iframe = document.createElement('iframe');
  iframe.setAttribute("style",`
      position:fixed; 
      z-index: -99;
      left:-9999px;
      top:-9999px;
  `)
  document.body.appendChild(iframe);
  return {
    iframe,
    iframeDoc: iframe.contentWindow.document
  }
}

export default getIframe