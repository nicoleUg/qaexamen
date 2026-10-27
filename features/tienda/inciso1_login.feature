Feature: Inciso 1 - Ingresar a Tienda QA

  @tienda @inciso1 @loginTienda
  Scenario: Iniciar sesión con un cliente válido
    Given estoy en la página de ingreso de la tienda con datos restablecidos
    When ingreso "cnueva" y "Tienda123!" en la tienda
    Then debería ver el catálogo y el nombre "Carla Nueva"
