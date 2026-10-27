Feature: Inciso 3 - Registrar un cliente y confirmar una compra

  @tienda @inciso3 @registroCompra
  Scenario: Crear una cuenta y comprar con entrega en cinco días de reparto
    Given estoy en la página de ingreso de la tienda con datos restablecidos
    When abro el registro de la tienda
    And registro "QA Automatizado", "qa.automatizado@correo.test", "qaAuto2026", "Prueba123!", "Prueba123!" y "Cliente" en la tienda
    And confirmo mi cuenta de la tienda
    And ingreso "qaAuto2026" y "Prueba123!" en la tienda
    Then debería ver el catálogo y el nombre "QA Automatizado"
    When consulto la ficha del producto "PR006"
    Then debería ver "PR006", "Audífonos Volta Lite" y el precio "Bs 250,00"
    When selecciono "1" unidades del producto
    And agrego "1" unidades al carrito
    And voy al carrito de compra
    Then debería ver "PR006" con "1" unidades y un total de "Bs 275,00"
    When continúo con el pedido
    And completo la entrega para "QA Automatizado", en "Barrio Cristal", dirección "Calle Ficticia 123, casa verde", franja "tarde" y notas "Entregar en recepción"
    # Reparto: lunes a sábado. Desde 08/10/2026, el tercer día es 14/10/2026 porque no atiende los domingos.
    And elijo una entrega dentro de 5 días "reparto"
    Then debería ver el total "Bs 275,00" y el pago "Pago contra entrega"
    When confirmo el pedido
    Then debería ver mi pedido con la fecha elegida, "1" unidades, total "Bs 275,00" y estado "Pendiente"
