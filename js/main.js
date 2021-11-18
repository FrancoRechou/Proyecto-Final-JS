$(document).ready(function () {
    if("CARRITO" in localStorage){
        const arrayLiterales = JSON.parse(localStorage.getItem("CARRITO"));
        if(arrayLiterales.length > 0){
            for (const literal of arrayLiterales) {
                carrito.push(new Producto(literal.id, literal.nombre, literal.precio, literal.categoria, literal.cantidad));
            }
            carritoUI(carrito);
        }
    }
    $(".dropdown-menu").click(function (e) { 
        e.stopPropagation();
    });

    $.get('data/producto.json',function(datos, estado){
        if(estado == 'success'){
            for (const literal of datos) {
                productos.push(new Producto(literal.id, literal.nombre, literal.precio, literal.categoria, literal.cantidad, literal.imagen));
            }
        }
        productosUI(productos, '#productosContenedor');
    });
});

window.addEventListener('load',()=>{
    $('#indicadorCarga').remove();
    $('#productosContenedor').fadeIn("slow");
})

selectUI(categorias,"#filtroCategorias");
$('#filtroCategorias').change(function (e) { 
    const value = this.value;
    $('#productosContenedor').fadeOut(600,function(){
        if(value == 'TODOS'){
            productosUI(productos, '#productosContenedor');
        }else{
            const filtrados = productos.filter(producto => producto.categoria == value);
            productosUI(filtrados, '#productosContenedor');
        }
        $('#productosContenedor').fadeIn();
    });
});

$("#busquedaProducto").keyup(function (e) { 
    const criterio = this.value.toUpperCase();
    if(criterio != ""){
        const encontrados = productos.filter(p =>       p.nombre.includes(criterio.toUpperCase()) 
                                                    || p.categoria.includes(criterio.toUpperCase()));
        productosUI(encontrados, '#productosContenedor');
    }
});

$(".inputPrecio").change(function (e) { 
    const min = $("#minProducto").val();
    const max = $("#maxProducto").val();
    if((min > 0) && (max > 0)){
        const encontrados = productos.filter(p => p.precio >= min && p.precio <= max);
        productosUI(encontrados, '#productosContenedor');
    }
});
