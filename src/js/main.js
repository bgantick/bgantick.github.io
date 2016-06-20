window.onload = function(){
  var anchors = document.getElementsByTagName('a');
  var a = new RegExp('/' + window.location.host + '/');
  for (var i=0; i<anchors.length; i++){
    if (!a.test(this.href)) {
      anchors[i].setAttribute('target', '_blank');
    }
  }
}
