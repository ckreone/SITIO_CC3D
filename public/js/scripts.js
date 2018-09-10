(function($) {
    
    
    "use strict";
    
    
    $( window ).on( 'load', function() {
        $( '#preloader' ).delay( 200 ).fadeOut( 'slow' );
        $( '#load' ).delay( 200 ).fadeOut( 'slow' );
        
        /*if( $( window ).width() > 1150 ) {
            var mrg = parseInt( $( '.wrapper' ).css('margin-left'), 10 );
            var hmr = $( '.hamburger' ).width();
            var dot = $( '.cd-dot' ).width();
            $( '.hamburger' ).css( 'left', ( ( mrg - hmr ) / 2 ) );
            $( '#cd-vertical-nav' ).css( 'right', ( ( mrg - dot ) / 2 ) );
        }*/
    });
    
    
    
    
    
    
    
    /*$(document).on( 'hidden', '.custom-modal', function (e) {
        $( '.custom-modal' ).remove();
    });
    
    $('body').on('hide', '.modal', function(e) {
        $(e.target).data('modal', null);
    });
        
    $( '.custom-modal' ).on('hidden.bs.modal', function (e) {
       console.log( 'fffewewefewfwef' );
    });*/
    
    
    
    $( document ).on( 'click', '.div_video', function( e ) {
        var video = $( this ).attr( 'data' );        
        emergente( video );
        $( '#myModal' ).modal( 'show' );
        $( '#myModal .vidio' ).trigger( 'play' );
    });
    
    
    
    /*$( '#myModal' ).on( "hide.bs.modal", function () {
        console.log( 'dfffv' );
    });*/
    
    
    $( '#myModal' ).on( 'hidden.bs.modal', function () {
        //$( '#myModal .vidio' ).trigger( 'stop' );
        $( '#myModal .vidio' ).first().attr('src','');
    });


    /*$( '#myModal' ).on( 'show.bs.modal', function () { 
        alert('Hi');
    });*/
    
    
    /*var timer;
    
    $( document ).on( 'mouseenter', '.div_video .img_video', function() {
        var ele = $( this );
        var src = $(this).parent().attr( 'data' );
        ele.parent().find( '.content_thumb' ).html( '' );
        //timer = setTimeout( function () {
            ele.parent().find( '.content_thumb' ).addClass( "show" );
            ele.parent().find( '.content_thumb' ).append( '<video src='+src+' autoplay ></video>' );
        //}, 1500 );
    }).on( 'mouseleave', '.div_video .img_video', function() {
        $( this ).parent().find( '.content_thumb' ).removeClass( "show" );
        //$( this ).parent().find( '.content_thumb' ).html( '' );
        clearTimeout( timer );
    });*/
    
    
    
    function emergente( video ) {
        $( '.custom-modal .modal-body' ).html('');
        var text = '\
            <div class="row" > \
                <div class="col-12" > \
                    <div class="embed-responsive embed-responsive-16by9" > \
                        <video class="embed-responsive-item vidio" controls controlsList="nodownload nodetach" > \
                            <source src='+video+' type="video/mp4"> \
                        </video> \
                    </div> \
                </div> \
            </div>';
        /*var text = '\
            <div class="modal fade custom-modal" role="dialog" id="myModal" >\
                <div class="modal-dialog modal-lg" >\
                    <div class="modal-content" >\
                        <div class="modal-body" > \
                            <div class="row" > \
                                <div class="col-12" > \
                                    <div class="embed-responsive embed-responsive-16by9" > \
                                        <video class="embed-responsive-item vidio" controls > \
                                            <source src='+video+' type="video/mp4"> \
                                        </video> \
                                    </div> \
                                </div> \
                            </div> \
                        </div>\
                    </div>\
                </div>\
            </div>';*/
        $( '.custom-modal .modal-body' ).append( text );        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $( 'a.js-scroll[href*="#"]:not([href="#"])' ).click( function() {
        if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
            var target = $( this.hash );
            target = target.length ? target : $( '[name=' + this.hash.slice(1) + ']' );
            if ( target.length ) {
                $( 'html, body' ).animate({
                    scrollTop: ( target.offset().top )
                }, 1000, 'easeInOutExpo' );
                return false;
            }
        }
    });
    
    
    
    $( window ).on( 'scroll', function() {
        var size = $( this ).height();
        if( $( '.fondo' )[0] ) {
            size = $( '.fondo' ).height();
        }
        if( $( '.hamburger' ).offset().top > size ) {
            $( '.hamburger' ).removeClass( 'scroll' );
        }
        else {
            $( '.hamburger' ).addClass( 'scroll' );
        }
        /*if( ! $( 'body' ).hasClass( 'inicio' ) ) {
            if( $( '.floating-scrollspy  li' ).offset().top <= size ) {
                $( '.floating-scrollspy  a' ).removeClass( 'scroll' );
            }
            else {
                $( '.floating-scrollspy  a' ).addClass( 'scroll' );
            }
        }*/
        /*else {
            if( $( '#sidemenu' ).offset().top > size ) {
                $( '#sidemenu' ).addClass( 'dsdsadsa' );
            }
        }*/
    });
    
    
    
    $( '#dismiss' ).on( 'click', function () {
        $('#sidebar').removeClass( 'active' );
        $('.overlay').fadeOut();
    });
    
    
    
    $( '.cont' ).on( 'click', function () {
        $('#sidebar').removeClass( 'active' );
        $('.overlay').fadeOut();
    });
    
    
    
    $( '.overlay' ).on( 'click', function () {
        $( '#sidebar' ).removeClass( 'active' );
        $( '.overlay' ).fadeOut();
    });
    
    
    
    $( '#sidebarCollapse' ).on( 'click', function () {
        $( '#sidebar' ).addClass( 'active' );
        $( '.overlay' ).fadeIn();
        $( '.collapse.in' ).toggleClass( 'in' );
        $( 'a[aria-expanded=true]' ).attr( 'aria-expanded', 'false' );
    });
    
    
    
    $( '.nav a' ).on( 'click', function() {
        $( '.nav' ).find( '.active' ).removeClass( 'active' );
        $( this ).parent().addClass( 'active' );
    });
    
    
    
    $( '.floating-scrollspy  a' ).on( 'click',  function( event ) {
        event.preventDefault();
        $( 'html, body' ).animate( {
            scrollTop: $( $.attr( this, 'href' ) ).offset().top
        }, 600, 'easeInOutExpo' );
    });
    
    
    /*$( '#sidemenu' ).affix({
        offset : {
            top: $( '.portada' ).offset().top + $( '.portada' ).outerHeight(),
            bottom: $( 'footer' ).outerHeight() + 50
        }
    });*/
    
    
    $( '#sidemenu' ).affix({
        offset : {
            top: $( '.fondo' ).offset().top + $( '.fondo' ).outerHeight(),
            bottom: $( 'footer' ).outerHeight() + 50
        }
    });
    
    
    
    
    /*lightbox.option({
      'showImageNumberLabel': false
    });*/






})(jQuery);
