
(function($){

	var pnl_cntrpnl_size_tmot;

	$(window).on('load',function(){
		$(window).trigger('pnl_cntrpnl_size');
	});
	
	$(window).on('resize',function(){
		clearTimeout(pnl_cntrpnl_size_tmot);
		pnl_cntrpnl_size_tmot = setTimeout(function(){
			$(window).trigger('pnl_cntrpnl_size');
		},200);
	});
	
	$(document).ready(function(){
	});

	$(window).on('pnl_cntrpnl_size',function(){
		window.electron.send('toMain',{
			act: 'pnl_cntrpnl_size',
			w: $('.pnlwrp .cntrpnl').outerWidth(),
			h: $('.pnlwrp .cntrpnl').outerHeight()
		});
	});
	
})(jQuery);
	