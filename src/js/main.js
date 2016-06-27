/* jshint ignore:start */
//=require ../../assets/js/pace.min.js
/* jshint ignore:end */

window.onload = function() {
  var anchors = document.getElementsByTagName('a');
  var a = new RegExp('/' + window.location.host + '/');
  for (var i = 0; i < anchors.length; i++) {
    if (!a.test(anchors[i])) {
      anchors[i].setAttribute('target', '_blank');
    }
  }
};

(function($){
  $(document).ready(function(){
    $('a.form-toggle').click(function(e){
      e.preventDefault();
      $('#form-wrap').toggleClass('visible');
    });
    $('a.dismiss').click(function(e){
      e.preventDefault();
      $('#form-wrap').toggleClass('visible');
    });
  });
})(jQuery);
