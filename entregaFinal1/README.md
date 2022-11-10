# Primera entrega del Proyecto Final (Coderhouse: Programación Backend)

## Acerca del proyecto

Se trata de un proyecto que simula una aplicación eCommerce backend, que implementa un servidor basado en Node JS y en express. Dicho servidor contiene dos conjuntos de rutas que fueron agrupadas en routers:

1. Un conjunto tiene como base la URL '/products'
2. El otro conjunto tiene como base la URL '/cart'

Ambos routers están sostenidos a partir de un router principal, denominado con la URL '/api'.

## Acerca de los routers

Ambos funcionan a través de los controllers. Los cuales son dos:

1. Products controller: conformado por la clase ProductsAPI, compuesta de diversos métodos que serán utilizados en los endpoints para hacer peticiones respecto a los productos que se tienen. Utilizado fundamentalmente en 'api/products'
2. Cart controller: conformado por la clase CartAPI, compuesta de diversos métodos que serán utilizados en los endpoints para hacer peticiones respecto a los carritos y sus respectivos productos que se tengan. Utilizado fundamentalmente en 'api/cart'

### Router base 'api/products'

Este router contiene cinco funcionalidades o endpoints:

1. GET('/'): trae todos los productos a través del método getAll, el cual comprueba que exista el JSON que contiene los productos a través de otro método de validación. Si no hay archivo, se crea uno con productos por defecto. Si ya hay un JSON con productos, a través del método obtenerJSON se traen los productos gracias al uso de readFile a través de filesystem.
2. GET('/:id'): trae un producto en particular según su ID de identificación a través del método getById, el cual lee el JSON de los productos y a través del método de arrays find busca el producto cuyo ID coincida con el ingresado en la ruta. En caso de no existir, se notificará a través de un mensaje el error. 
3. POST('/'): permite agregar un producto al array de productos del JSON, mediante el método del controller llamado save. Este método, se encarga de validar que el producto ingresado tenga todos los campos necesarios para ser agregado al array, luego se lee el archivo JSON para traerse el array de productos, se crea un molde de objeto de producto que tomará los datos que se ingresen del producto, se lo agrega al array a través del método de arrays push y a través del método actualizarArchivo (que utiliza el writeFile de Filesystem) se agrega ese producto al archivo JSON.
4. PUT('/:id'): este endpoint trabaja con el método del controller findByIdAndUpdate, que se encarga de buscar un producto dado un ID particular ingresado. Primero que nada, a través del método exists, se valida que el producto exista, en caso de que no se arrojará un mensaje de error. Si existe, se procede a traer todos los productos con getAll, para realizar un método de array llamado findIndex, que devolverá el índice de un producto según el ID ingresado. Se creará un molde para modificar el producto cuyo índice sea el que se devolvió. Se podrán modificar todos los datos con sus respectivas validaciones, salvo el ID obviamente. Luego, mediante el método de arrays splice, se elimina el viejo producto y se lo reemplaza por el producto actualizado en el JSON gracias a actualizarArchivo.
5. DELETE('/:id): utiliza el método del controller findByIdAndDelete, el cual lee el archivo JSON y a través del método splice se elimina el producto cuyo ID fue ingresado como parámetro. Una vez eliminado, el JSON se actualiza mediante el método correspondiente. 

### Router base 'api/cart'

Este router contiene 5 funcionalidades o endpoints:

1. GET('/:id/productos'): funciona mediante el método del controller del cart llamado getCartById, el cual recibe un id como parámetro. Gracias al método GetAllCartProducts, se lee el archivo JSON que contiene a los carritos (si no existe el archivo se crea uno a partir de un método de validación), y una vez que se tiene el array de carritos, se utilizada el método de arrays find, que recibe como parámetro el ID ingresado. Si el  ID coincide con el ID de un carrito, se trae ese carrito con sus respectivos productos. En cambio, si no coincide con ninguno, se arroja un mensaje de error. 
2. POST('/'): funciona a través del método createNewCart, que trae al array de carritos con un método y se declara una variable id, de manera tal que al crearse el nuevo carrito, el id de este se aumente en una unidad respecto al id del carrito anterior. Se debe crear el array de productos para el carrito, y al realizar la petición se agrega el nuevo carrito al JSON.
3. POST('/:id/productos'): funciona con tres métodos. El primero es getCartById, el segundo es el getById del products controller y el tercero es el addNewProductToCart. Este último recibe dos IDs (uno del carrito y otro del producto ) y trae todos los carritos del JSON, a cuyo array se le aplica el método findIndex. Según el ID ingresado se trae ese carrito particular, al cual se le aplica el metodo push a su array propio de productos. El producto que entra a ese carrito depende del valor del ID que se ingrese en la petición. El endpoint busca el ID del producto en el JSON de productos y se agrega al array de productos del carrito.
4. DELETE('/:id'): trabaja con el método deleteCart, el cual recibe un ID como parámetro. Se traen todos los carritos del JSON, se le aplica un findIndex al array y según el índice o ID ingresado, se realiza un splice que elimina el carrito caracterizado por dicho índice. Luego se actualiza el JSON con el carrito eliminado.
5. DELETE('/:id/productos/:id_prod'): trabaja con los métodos getCartById (para traerse un carrito en particular) y deleteProductInCart. Este último recibe dos IDs (uno del carrito y otro del producto) y se trae todos los carritos del JSON. En primer lugar se aplica un findIndex al array de carritos, para traerse el índice del carrito al que se le va agregar un producto (si no está, se envía un error). A ese carrito, se le realiza otro findIndex a su array de productos, de manera tal de identificar el producto que se desea eliminar. Identificado el producto, se realiza el splice correspondiente para eliminarlo del carrito. Luego se actualiza el JSON para ver los cambios realizados con esta petición. 

## Administradores y usuarios

Se ha implementado una variable booleana que tendrá funciones de accesibilidad. Al estar en true, se tiene acceso a todos los endpoints de 'api/products', pues opera como si fuera la vista de un administrador. En cambio, cuando es false, opera desde la vista de usuario, teniendo solo acceso solo a los endpoint con método GET, restringiendole al usuario poder realizar modificaciones sobre los productos. 

## Rutas no implementadas

A través de un middleware, se arroja un objeto de error en caso de ingresar una ruta que no haya sido creada en los routers correspondientes. 

## Tecnologías y librerías utilizadas

1. Node JS
2. Express
3. Moment
4. Filesystem

