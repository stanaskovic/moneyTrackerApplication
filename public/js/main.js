$(document).ready( function () {
    $('#myTable').DataTable();
} );

// Add

$(document).ready(function() {
    let table = $('#myTable').DataTable();
    
    $('#addRow').on( 'click', function () {
        
        let main_date = $('#main_date').val();
        let main_cat = $('#main_cat').val();
        let main_sum = $('#main_sum').val();
        let main_com = $('#main_com').val();

        fetch('/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                main_date: main_date,
                main_cat: main_cat,
                main_sum: main_sum,
                main_com: main_com
            })
        }).then(function(res){
            if(res.ok) {
                table.row.add([
                    main_date,
                    main_cat,
                    main_sum,
                    main_com
                ]).draw( false );
            }
        })
    } );
} );

$('#addRow').click();


// Delete

$(document).ready(function() {
  let table = $('#myTable').DataTable();

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
            url: '/delete',
            data : data,
            dataType: 'json',
            success: function(data){
                if(data.delete == true){
                row.remove().draw( false );
                
                }
            }
        });
        window.location.href= "/";             
    });
});


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


//Row color

$('#myTable').DataTable({
            
            "createdRow": function( row, data, dataIndex ) {
                if ( data["2"] == "Salary" ) {
                    $( row ).css( "background-color", "#7dd861" );
                } else{
                    $( row ).css( "background-color", "#e57777" );
                }

            },
           

        });



