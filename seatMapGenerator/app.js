// Seat map generator
(function($){
  
  /*
	sample seatMapObj
	[
	  {
		"isSeat": true,
		"seatNo": 1,
		"actualSeatNumber": "a1"
	  }
	]
  */
 
  //TODO : complete row select option..
  
  /*
  ** Notes: realSeat is used determine isSeat
  ** seat selection will part user seat selection but not here
  ** 
  */
  //basic row by col map genrator
  $(document).on('click', '#gen', function(e){
    var nRows = parseInt($('#nRows').val(), 10);
    var nCols = parseInt($('#nCols').val(), 10),
        $seatLay = $('#seatLayWrap'),
        tpl= "",
		seatNo = 0,
        i,j;
    
    for(i=1; i <= nRows; i++){
      for(j=1; j <= nCols; j++){
		++seatNo;
        tpl += '<div class="seat seatSelect realSeat seat_'+seatNo+'" data-seat-num="'+seatNo+'" data-ac-seat-num="'+seatNo+'">&nbsp;</div>';
      }
      tpl = "<div class='row'>" + tpl + "</div><div class='rowsep'></div>";
      $seatLay.append(tpl);
      tpl = '';
    }
  });
  
  // seat selection
  $(document).on('click', '.seatSelect', function(e){
    $(this).toggleClass('selected');	
  });
  
  //remove selectable seat from seat map. will remove all selected seats
  $(document).on('click', '#removeSeats', function(e){
	var $seatLay = $('#seatLayWrap'),
		selectedToRemove = $seatLay.find('.selected');
	
	//seats should be still selectable, as they might can be added back to map using add seats
	selectedToRemove.addClass('noSeat').removeClass('realSeat selected');
  });
  
  //add selectable seat to seat map. will add all selected seats
  $(document).on('click', '#addSeats', function(e){
	var $seatLay = $('#seatLayWrap'),
		selectedToAdd = $seatLay.find('.selected');
	
	//seats should be still selectable, as they might can be added back to map using add seats
	selectedToAdd.removeClass('noSeat selected').addClass('realSeat');
  });  
  
  //gen seat map
  $(document).on('click', '#generateMap', function(e){
	var $seatLay = $('#seatLayWrap'),
		objDump = {},
		$ele,
		seatMapObj = [],
		allSeats = $seatLay.find('.seat');
		
	allSeats.each(function(index, ele){
		$ele = $(ele);
		objDump.isSeat = $ele.hasClass('realSeat');
		objDump.seatNo = parseInt($ele.attr('data-seat-num'), 10);
		objDump.actualSeatNumber = parseInt($ele.attr('data-ac-seat-num'), 10);
		
		seatMapObj.push(objDump);
		objDump = {};
	});
	
	//generate JSON map
	console.log(JSON.stringify(seatMapObj));
	$('#jsonSeatMap').val(JSON.stringify(seatMapObj));
  });
  
  //
})(jQuery);