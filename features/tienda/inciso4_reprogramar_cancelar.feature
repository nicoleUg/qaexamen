Feature: Inciso 4 - Reprogramar una entrega y cancelar un pedido

  @tienda @inciso4 @gestionPedidos
  Scenario: Reprogramar la entrega a siete días y cancelarla
    Given estoy en la página de ingreso de la tienda con datos restablecidos
    When ingreso "pfrecuente" y "Tienda123!" en la tienda
    Then debería ver el catálogo y el nombre "Pablo Frecuente"
    When voy a Mis pedidos
    And abro la reprogramación del pedido "PD0006"
    And elijo la nueva entrega dentro de 7 días "naturales"
    And guardo la reprogramación
    Then debería ver la fecha elegida, "1/1" reprogramaciones y estado "Pendiente" en el pedido seleccionado
    When solicito cancelar el pedido seleccionado
    And acepto cancelar el pedido
    Then el pedido seleccionado debería estar "Cancelado"
