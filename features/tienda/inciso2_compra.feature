Feature: Inciso 2 - Consultar un producto y confirmar un pedido

  @tienda @inciso2 @compraTienda
  Scenario: Comprar con entrega dentro de nueve días naturales
    Given estoy en la página de ingreso de la tienda con datos restablecidos
    When ingreso "cnueva" y "Tienda123!" en la tienda
    Then debería ver el catálogo y el nombre "Carla Nueva"
    When consulto la ficha del producto "PR006"
    Then debería ver "PR006", "Audífonos Volta Lite" y el precio "Bs 250,00"
    When selecciono "1" unidades del producto
    And agrego "1" unidades al carrito
    And voy al carrito de compra
    Then debería ver "PR006" con "1" unidades y un total de "Bs 275,00"
    When continúo con el pedido
    And completo la entrega para "Carla Nueva", en "Villa Aurora", dirección "Calle Imaginaria 45, portón azul", franja "mañana" y notas "Llamar al llegar"
    And elijo una entrega dentro de 9 días "naturales"
    Then debería ver el total "Bs 275,00" y el pago "Pago contra entrega"
    When confirmo el pedido
    Then debería ver mi pedido con la fecha elegida, "1" unidades, total "Bs 275,00" y estado "Pendiente"
