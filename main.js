
$(document).ready( function () {
    //$('#myTable').DataTable();
    const table = $('#myTable').DataTable();
    
    // var myTable = $('#myTable').DataTable({ "editModal": [
    //               {
    //                   "targets": [ 0 ],
    //                   "visible": false
                      
    //               }]});

            //   $("#myTable tbody tr").click(function() {
            //       var row = table.row();
            //       var rowData = table.row( this ).data(); 
                 
            //      $('#editModal').modal('show')
            //       let dataFromClick = this.innerText
            //       $('.modal-body').text(`Old value: ${dataFromClick}`)
            //        $('#id').val(`${rowData[0]}`) 
            //        $('#date').val(`${rowData[1]}`) 
            //        $("#category option:selected" ).text(`${rowData[2]}`);
            //        $('#number').val(`${rowData[3]}`) 
            //        $('#comment').val(`${rowData[4]}`) 
               
            //   }); 

            //   DODAVANJE U BAZU IZ INPUTA

                  $('#addRow').on('click', function(event) {
                    event.preventDefault();
                     
                    
                     var date = $('#main_date').val();
                     var category = $('#main_cat').val();
                     var number = $('#main_sum').val();
                     var comment = $('#main_com').val();
                     console.log(date,category,number,comment)
                     var data = {};
                     //data.id = id;
                     data.date = date;
                     data.category = category;
                     data.number = number;
                     data.comment = comment;
                       $.ajax({
                          type: 'post',
                          data: JSON.stringify(data),
                          contentType: 'application/json',
                          url: 'http://localhost:3000/add',
                          success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                            }
                      });
                      window.location.href = "http://localhost:3000/";
                  })





                //   edit start



                $('#editModal').modal('hide')
                $("#myTable tbody tr").on('click',function() {
                    var row = table.row();
                    var rowData = table.row( this ).data(); 
                   
                    $('#editModal').modal('show')
                    // let dataFromClick = this.innerText
                    // $('.modal-body').text(`Old value: ${dataFromClick}`)
                    $('#id').val(`${rowData[0]}`) 
                    $('#date').val(`${rowData[1]}`) 
                     $("#cat" ).text(`${rowData[2]}`); 
                     $('#number').val(`${rowData[3]}`) 
                     $('#comment').val(`${rowData[4]}`) 
                 
                }) 
                    $('#save1').on('click', function(event) {
                      event.preventDefault();
                       
                      var id = $('#id').val()
                      var date = $('#date').val();
                      var category = $('#cat').val();
                      var number = $('#number').val();
                      var comment = $('#comment').val();
                      var data = {};
                      data.id = id;
                      data.date = date;
                      data.category = category;
                      data.number = number;
                      data.comment = comment;
                        $.ajax({
                           type: 'post',
                           data: JSON.stringify(data),
                           contentType: 'application/json',
                           url: 'http://localhost:3000/edit',
                           success: function(data) {
                             console.log('success');
                             console.log(JSON.stringify(data));
                             }
                       });
                       window.location.href = "http://localhost:3000/";
                    });
                // $('#editRow').on('click', function(event) {
                    
                //     $('#editModal').modal('show')
                //     event.preventDefault();
                     
                //     var id = $('#id').val
                //      var date = $('#date').val();
                //      var category = $('#category').val();
                //      var number = $('#number').val();
                //      var comment = $('#comment').val();
                //      var data = {};
                //      data.id = id;
                //      data.date = date;
                //      data.category = category;
                //      data.number = number;
                //      data.comment = comment;
                //        $.ajax({
                //           type: 'post',
                //           data: JSON.stringify(data),
                //           contentType: 'application/json',
                //           url: 'http://localhost:3000/edit',
                //           success: function(data) {
                //             console.log('success');
                //             console.log(JSON.stringify(data));
                //             }
                //       });
                //       window.location.href = "http://localhost:3000/";
                //   })
                // edit end

                //   DELETEEEEE
                  $('#myTable tbody').on( 'click', 'tr', function () {
                          if ( $(this).hasClass('selected') ) {
                              $(this).removeClass('selected');   
                          }
                          else {
                              table.$('tr.selected').removeClass('selected');
                              $(this).addClass('selected');
                          }
                      } );
                    
                      $('#deleteRow').click( function () {
                            let row = table.row('.selected');
                            let data = {
                                main_id: row.data()[0],
                                isAjax: true,
                            };
                            $.ajax({
                                type: 'post',
                                url: 'http://localhost:3000/delete',
                                data : data,
                                dataType: 'json',
                                success: function(data){
                                    if(data.edit == true){
                                    row.remove().draw( false );
                                    
                                    }
                                }
                            });
                            window.location.href= "http://localhost:3000/";             
                        });





}); // END OF READY DOCUMENT

// Add

// $(document).ready(function() {
    
// } );

// $('#addRow').click();


// // Delete

// $(document).ready(function() {
//   let table = $('#myTable').DataTable();

//   $('#myTable tbody').on( 'click', 'tr', function () {
//       if ( $(this).hasClass('selected') ) {
//           $(this).removeClass('selected');   
//       }
//       else {
//           table.$('tr.selected').removeClass('selected');
//           $(this).addClass('selected');
//       }
//   } );

//   $('#deleteRow').click( function () {
//         let row = table.row('.selected');
//         let data = {
//             main_id: row.data()[0],
//             isAjax: true,
//         };
//         $.ajax({
//             type: 'post',
//             url: '/delete',
//             data : data,
//             dataType: 'json',
//             success: function(data){
//                 if(data.edit == true){
//                 row.remove().draw( false );
                
//                 }
//             }
//         });
//         window.location.href= "/";             
//     });
// });


// //Edit



// $(document).ready(function() {
//     
//   });


//chartovi

$('#showCharts').on('click', function(event) {
    
      $.ajax({
         type: 'get',
         contentType: 'application/json',
         url: 'http://localhost:3000/charts',
         success: function(response) {
            let arr =  [];
            response.forEach(element => {
                arr.push(element);
             });
             console.log(arr);
             chart.data = arr;
             chart2.data = arr;
           }
     });
  });


//Row color

$('#myTable').DataTable({
            
            "createdRow": function( row, data, dataIndex ) {
                if ( data["2"] == "Salary" ) {
                    $( row ).css( "background-color", "#5cb85c" );
                } else{
                    $( row ).css( "background-color", "#E04A4A" );
                }

            },
           

        });
