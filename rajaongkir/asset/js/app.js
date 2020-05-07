$( document ).ready(function() {
  $('#kota_asal').select2({
     placeholder: 'Pilih kota/kabupaten asal',
     language: "id"
  });

  $('#kota_tujuan').select2({
     placeholder: 'Pilih kota/kabupaten tujuan',
     language: "id"
  });

    $.ajax({
      type: "GET",
      dataType: "html",
      url: "//pemainkode.byethost31.com/royproweb/cek_kabupaten.php?q=kotaasal",
      success: function(msg){
      $("select#kota_asal").html(msg);                                                     
      }
    });    
 
 $.ajax({
      type: "GET",
      dataType: "html",
      url: "//pemainkode.byethost31.com/royproweb/cek_kabupaten.php?q=kotatujuan",
      success: function(msg){
      $("select#kota_tujuan").html(msg);                                                     
      }
   });

   $("#ongkir").submit(function(e) {
      e.preventDefault();
      $.ajax({
          url: 'http://pemainkode.byethost31.com/royproweb/cek_ongkir.php',
          type: 'post',
          data: $( this ).serialize(),
          success: function(data) {
            console.log(data);
            document.getElementById("response_ongkir").innerHTML = data;
          }
      });
  });

});
