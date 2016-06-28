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

    var mailgunURL;

    mailgunURL = 'http://www.briangantick.com/api/mailer.php';

    $('#form-wrap form').on('submit',function(e) {
      e.preventDefault();

      $('#form-wrap form').append('Your submission is being processed...');

      $.ajax({
        type : 'POST',
        cache : false,
        url : mailgunURL,
        data : $(this).serialize(),
        success : function(data) {
          responseSuccess(data);
          console.log(data);
        },
        error : function(data) {
          console.log('Silent failure.');
        }
      });

      return false;

    });

    function responseSuccess(data) {

      data = JSON.parse(data);

      if(data.status === 'success') {
        $('#form-wrap').html('Submission sent succesfully.');
      } else {
        $('#form-wrap').html('Submission failed, please contact directly.');
      }

    }

  });

})(jQuery);
