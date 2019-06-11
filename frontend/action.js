$(document).ready(function () {

    $('#inputCPF').mask('000.000.000-00');

    $('#btnConsultar').click(function () {

        var cpf = getInputText()
        searchCPF(cpf)
    })

    $('#btnLimpar').click(function () {

        clean()
    })

    $('#btnInserir').click(function () {

        var cpf = getInputText()
        blockCPF(cpf)
    })

    $('#btnRemover').click(function () {

        var cpf = getInputText()
        freeCPF(cpf)
    })

})

var getInputText = () => {

    var input = $('#inputCPF').unmask();
    var cpf = input.val()
    $('#inputCPF').mask('000.000.000-00');

    return cpf
}

var clean = () => {
 
    $('#alert').addClass('hidden')
    $('#inputCPF').val('');
}

var blockCPF = (cpf) => {

    $.ajax({
        url: 'http://localhost:3000/blacklist/block',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ cpf: cpf }),

        success: function (result, status, xhr) {

            $('#alert').attr( "class", "")
            
            if (result.error) {
                $('#alert').addClass('alert alert-danger');
                $("#alert").html(result.error);
            }
            else if (result.blocked) {
                $('#alert').addClass('alert alert-success');
                $("#alert").html('CPF bloqueado');
            }
            else {
                $('#alert').addClass('alert alert-danger')
                $("#alert").html('Este CPF não pode ser bloqueado');
            }
        },

        error: function (xhr, status, error) {

            console.log(error)
        },
    });
}

var freeCPF = (cpf) => {

    $.ajax({
        url: 'http://localhost:3000/blacklist/free/' + cpf,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        success: function (result, status, xhr) {

            $('#alert').attr( "class", "")
            
            if (result.error) {
                $('#alert').addClass('alert alert-danger');
                $("#alert").html(result.error);
            }
            else if (result.free) {
                $('#alert').addClass('alert alert-success');
                $("#alert").html('CPF desbloqueado');
            }
            else {
                $('#alert').addClass('alert alert-danger')
                $("#alert").html('Este CPF não pode ser desbloqueado');
            }
        },

        error: function (xhr, status, error) {
            console.log(error)
        },
    });
}


var searchCPF = (cpf) => {

    $.ajax({
        url: 'http://localhost:3000/blacklist/' + cpf,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        success: function (result, status, xhr) {
            
            $('#alert').attr( "class", "")
            
            if (result.error) {
                $('#alert').addClass('alert alert-danger')
                $("#alert").html(result.error);
            }
            else if (result.status === 'FREE') {
                $('#alert').addClass('alert alert-primary')
            }
            else {
                $('#alert').addClass('alert alert-danger')
            }

            $("#alert").html(result.status);
        },

        error: function (xhr, status, error) {
            console.log(error)
        },
    });
}

