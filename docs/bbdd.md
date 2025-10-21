+---------------------+
|      Usuario        |
+---------------------+
| id (PK)             |
| nombre              |
| email               |
| contraseña_hash     |
| fecha_registro      |
+---------------------+
       | 1
       |
       | N
+---------------------+
|       Gasto         |
+---------------------+
| id (PK)             |
| usuario_id (FK)     |
| categoria           |
| descripcion         |
| importe             |
| fecha               |
| tipo_pago           |
+---------------------+

+------------------------------------------------------+

+---------------------+
|      Usuario        |
+---------------------+
| id (PK)             |
| nombre              |
| email               |
| contraseña_hash     |
| fecha_registro      |
+---------------------+
       | 1
       |
       | N
+---------------------+
|     Inversion       |
+---------------------+
| id (PK)             |
| usuario_id (FK)     |
| tipo                |
| importe             |
| fecha               |
| rentabilidad_obj    |
| rentabilidad_real   |
| acumulado           |
+---------------------+

+------------------------------------------------------+

+---------------------+
|      Usuario        |
+---------------------+
| id (PK)             |
| nombre              |
| email               |
| contraseña_hash     |
| fecha_registro      |
+---------------------+
       | 1
       |
       | 1
+-----------------------------+
| ConfiguracionPorcentajes    |
+-----------------------------+
| usuario_id (FK)             |
| gasto%                      |
| ahorro%                     |
| inversion%                  |
| ocio%                       |
+-----------------------------+

+------------------------------------------------------+

+---------------------+
|      Usuario        |
+---------------------+
| id (PK)             |
| nombre              |
| email               |
| contraseña_hash     |
| fecha_registro      |
+---------------------+
       | 1
       |
       | 1
+---------------------+
|       Nomina        |
+---------------------+
| id (PK)             |
| usuario_id (FK)     |
| cantidad            |
| frecuencia          |
| fecha_inicio        |
+---------------------+

+------------------------------------------------------+

![Diagrama ER](Diagrama%20sin%20título.png)
