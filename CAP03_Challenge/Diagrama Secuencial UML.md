```mermaid

sequenceDiagram
    actor Usuario
    participant "App Web/Móvil" as Frontend
    participant "API Gateway" as APIGateway
    participant "Servicio de Búsqueda" as S_Busqueda
    participant "Servicio de Inventario" as S_Inventario
    participant "Servicio de Reservas" as S_Reservas
    participant "Servicio de Pagos" as S_Pagos
    participant "Pasarela de Pago" as Ext_PasarelaPago
    participant "Servicio de Notificaciones" as S_Notificaciones
    database "DB Reservas" as DB_Reservas
    database "DB Inventario" as DB_Inventario

    Usuario->>Frontend: 1. Iniciar Búsqueda de Habitaciones (fechas, ubicación, etc.)
    Frontend->>APIGateway: 2. Solicitar Búsqueda de Disponibilidad
    APIGateway->>S_Busqueda: 3. Reenviar Solicitud de Búsqueda
    S_Busqueda->>S_Inventario: 4. Consultar Disponibilidad de Habitaciones (por criterios)
    S_Inventario-->>S_Busqueda: 5. Devolver Habitaciones Disponibles
    S_Busqueda-->>APIGateway: 6. Devolver Resultados de Búsqueda
    APIGateway-->>Frontend: 7. Enviar Lista de Habitaciones
    Frontend->>Usuario: 8. Mostrar Habitaciones Disponibles

    Usuario->>Frontend: 9. Seleccionar Habitación y Confirmar Detalles
    Frontend->>APIGateway: 10. Iniciar Proceso de Reserva (datos de usuario y habitación)
    APIGateway->>S_Reservas: 11. Crear Pre-Reserva
    S_Reservas->>S_Inventario: 12. Bloquear Habitación Temporalmente
    S_Inventario-->>S_Reservas: 13. Confirmación de Bloqueo
    S_Reservas->>DB_Reservas: 14. Guardar Estado "Pendiente de Pago"
    DB_Reservas-->>S_Reservas: 15. Reserva Pendiente Registrada
    S_Reservas-->>APIGateway: 16. Confirmación de Pre-Reserva
    APIGateway-->>Frontend: 17. Solicitar Detalles de Pago

    Usuario->>Frontend: 18. Ingresar Información de Pago
    Frontend->>APIGateway: 19. Enviar Detalles de Pago
    APIGateway->>S_Pagos: 20. Procesar Pago
    S_Pagos->>Ext_PasarelaPago: 21. Realizar Transacción (envía datos de tarjeta)
    Ext_PasarelaPago-->>S_Pagos: 22. Resultado de Transacción (aprobado/rechazado)
    alt Pago Aprobado
        S_Pagos-->>APIGateway: 23. Notificar Pago Exitoso
        APIGateway->>S_Reservas: 24. Actualizar Estado de Reserva a "Confirmada"
        S_Reservas->>DB_Reservas: 25. Actualizar Estado en DB
        DB_Reservas-->>S_Reservas: 26. Estado Actualizado
        S_Reservas->>S_Inventario: 27. Confirmar Bloqueo Permanente (o reducir inventario)
        S_Inventario-->>S_Reservas: 28. Inventario Actualizado
        S_Reservas->>S_Notificaciones: 29. Solicitar Envío de Confirmación de Reserva
        S_Notificaciones-->>APIGateway: 30. Notificación Solicitada
        APIGateway-->>Frontend: 31. Mostrar Confirmación de Reserva
        Frontend->>Usuario: 32. Mostrar Confirmación Exitosa
        S_Notificaciones->>Usuario: 33. Enviar Correo/SMS de Confirmación
    else Pago Rechazado
        S_Pagos-->>APIGateway: 23'. Notificar Pago Rechazado
        APIGateway->>S_Reservas: 24'. Revertir Pre-Reserva (si aplica)
        S_Reservas->>S_Inventario: 25'. Liberar Habitación Temporalmente
        S_Inventario-->>S_Reservas: 26'. Habitación Liberada
        S_Reservas->>DB_Reservas: 27'. Marcar Reserva como "Cancelada/Fallida"
        DB_Reservas-->>S_Reservas: 28'. Estado Actualizado
        APIGateway-->>Frontend: 29'. Informar Error de Pago
        Frontend->>Usuario: 30'. Mostrar Mensaje de Error de Pago
    end

```