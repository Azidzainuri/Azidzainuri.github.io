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
      url: "https://rawcdn.githack.com/Azidzainuri/Azidzainuri.github.io/2974d927579f119dc65dc2afc1a9ab4e493d43ad/rajaongkir/data-kota.php?q=kotaasal",
      success: function(msg){
      $("select#kota_asal").html(msg);                                                     
      }
    });    
 
 $.ajax({
      type: "GET",
      dataType: "html",
      url: "https://rawcdn.githack.com/Azidzainuri/Azidzainuri.github.io/2974d927579f119dc65dc2afc1a9ab4e493d43ad/rajaongkir/data-kota.php?q=kotatujuan",
      success: function(msg){
      $("select#kota_tujuan").html(msg);                                                     
      }
   });

   $("#ongkir").submit(function(e) {
      e.preventDefault();
      $.ajax({
          url: 'https://rawcdn.githack.com/Azidzainuri/Azidzainuri.github.io/2974d927579f119dc65dc2afc1a9ab4e493d43ad/rajaongkir/cek-ongkir.php',
          type: 'post',
          data: $( this ).serialize(),
          success: function(data) {
            console.log(data);
            document.getElementById("response_ongkir").innerHTML = data;
          }
      });
  });

});
