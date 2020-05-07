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
      url: "https://rawcdn.githack.com/Azidzainuri/Azidzainuri.github.io/b02340f4b9bf8e07b36654852dd475ae42c48c52/rajaongkir/data-kota.php?q=kotaasal",
      success: function(msg){
      $("select#kota_asal").html(msg);                                                     
      }
    });    
 
 $.ajax({
      type: "GET",
      dataType: "html",
      url: "https://rawcdn.githack.com/Azidzainuri/Azidzainuri.github.io/b02340f4b9bf8e07b36654852dd475ae42c48c52/rajaongkir/data-kota.php?q=kotatujuan",
      success: function(msg){
      $("select#kota_tujuan").html(msg);                                                     
      }
   });

   $("#ongkir").submit(function(e) {
      e.preventDefault();
      $.ajax({
          url: 'https://rawcdn.githack.com/Azidzainuri/Azidzainuri.github.io/b02340f4b9bf8e07b36654852dd475ae42c48c52/rajaongkir/cek-ongkir.php',
          type: 'post',
          data: $( this ).serialize(),
          success: function(data) {
            console.log(data);
            document.getElementById("response_ongkir").innerHTML = data;
          }
      });
  });

});
