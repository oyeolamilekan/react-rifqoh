let url;

window.location.hostname.indexOf("localhost") > -1 || window.location.hostname.indexOf("myapp") > -1
  
  ? (url = "http://127.0.0.1:8000")
  : (url = "https://kirr.xyz");
export default url;