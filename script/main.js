$(document).ready(function() {
    $('.defaultTable').dragtable();

    $( document.body ).on( "click", ".btn-coluna", function(){
        $('.local-table').css('display', 'block')
        $('.btn-print').css('display', 'block')
        $('.btn-image').css('display', 'block')
        $('.btn-find').css('display', 'initial')
        $('.btn-titulos').css('display', 'block')

        coluna = this.getAttribute('data-coluna')
        $('.'+coluna+'').toggleClass('hide-column')
        $('.'+coluna+'').toggleClass('show-column')
        $(this).toggleClass('btn-press')
    });

    $( document.body ).on( "click", ".btn-print", function(){
        window.print();
    });

    $( document.body ).on( "click", ".btn-image", function(){
        $(this).toggle()
        $('.loader-img').toggle()
        myVar = setTimeout(alertFunc, 500);
    });
    function alertFunc() {
        $('.loader-img').toggle()
        html2canvas($("#datatable"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                $(".canvas-download-logo").append(canvas);
                imgCanvas = $(".canvas-download-logo").find('canvas')[0]
                imgCanvas.className = 'imgCanvas-download'
                link = $('#download-logo')[0]
                img = $('.imgCanvas-download')[0]
                link.href = img.toDataURL()
                link.download = 'logo.png'
                // $(link).html('table')
                $(link).css('display', 'block')
            }
        });
    }

    $( document.body ).on( "click", "#download-logo", function(){
        setTimeout(function(){
            $('.btn-image').toggle()
            $('.btn-img-donwload').toggle()
        }, 1000);
    });


    $( document.body ).on( "blur", ".campo-coluna", function(){
        newTxt = this.textContent
        coluna = this.getAttribute('data-coluna')
        $('th.'+coluna+'').html(newTxt)

    });

    $( document.body ).on( "click", ".loader-btn", function(){
        $('.hide-column').remove()
        $(this).toggle()
        $('.loader').toggle()
        showLoader = setTimeout(donwloadRender, 1000);
    });
    function donwloadRender() {
        $('.loader').toggle()
        $('.export-exel').toggle()
    }

    $( document.body ).on( "click", ".export-exel", function(){
        setTimeout(function(){
            $('.export-exel').toggle()
            $('.loader-btn').toggle()
        }, 2000);
    });

    $( document.body ).on( "click", ".btn-find", function(){
        $('.input-find').toggle(500)
        $('.collapse').removeClass('in')
    });
    $( document.body ).on( "blur", ".input-find", function(){
        $('.input-find').toggle(500)
    });

    $( document.body ).on( "keyup", ".input-find", function(){
        linhas = $('tbody tr')
        valor = removeAcento(this.value.toLowerCase())
        for ( i = 0 ; i < linhas.length ; i ++ ) {
            matchFind = 0;
            celulas = $(linhas[i]).find('td.show-column')
            for ( x = 0 ; x < celulas.length ; x++ ) {
                conteudo = removeAcento(celulas[x].textContent.toLowerCase())
                if(conteudo.match(valor)){
                    matchFind ++
                }
            }
            if ( matchFind > 0 ) {
                $(linhas[i]).css('display', 'table-row')
            } else {
                $(linhas[i]).css('display', 'none')
            }
        }
    });

    function removeAcento (text) {
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        text = text.replace(new RegExp('[Ç]','gi'), 'c');
        return text;
    }

});