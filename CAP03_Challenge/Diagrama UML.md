```mermaid

graph TD
    subgraph "Sistemas Externos"
        PASARELA_PAGO["Pasarela de Pago Externa"]
        PROVEEDOR_NOTIF["Proveedor de SMS/Email"]
        PMS_EXTERNO["Sistema de Gestión Hotelera (PMS)"]
    end

    subgraph "Sistema de Reservación de Habitaciones"
        WEB_MOVIL(Interfaz de Usuario Web/Móvil)

        subgraph "Backend de Microservicios"
            API_GATEWAY[API Gateway]
            SERVICIO_AUTENTICACION[Servicio de Autenticación de Usuarios]
            SERVICIO_INVENTARIO[Servicio de Inventario de Habitaciones]
            SERVICIO_BUSQUEDA[Servicio de Búsqueda y Disponibilidad]
            SERVICIO_RESERVAS[Servicio de Reservas]
            SERVICIO_PAGOS[Servicio de Pagos]
            SERVICIO_NOTIFICACIONES[Servicio de Notificaciones]
            SERVICIO_PRECIOS[Servicio de Precios y Ofertas]
        end

        subgraph "Bases de Datos"
            BD_USUARIOS(DB de Usuarios)
            BD_INVENTARIO(DB de Inventario)
            BD_RESERVAS(DB de Reservas)
        end
    end

    %% Conexiones desde el Frontend/API Gateway
    WEB_MOVIL --> API_GATEWAY

    %% Conexiones Internas del Backend (a través de API Gateway o directamente si es comunicación interna de servicio a servicio)
    API_GATEWAY --> SERVICIO_AUTENTICACION
    API_GATEWAY --> SERVICIO_BUSQUEDA
    API_GATEWAY --> SERVICIO_RESERVAS
    API_GATEWAY --> SERVICIO_PAGOS
    API_GATEWAY --> SERVICIO_NOTIFICACIONES

    SERVICIO_BUSQUEDA --> SERVICIO_INVENTARIO
    SERVICIO_BUSQUEDA --> SERVICIO_PRECIOS

    SERVICIO_RESERVAS --> SERVICIO_INVENTARIO: "Bloquea/Libera Habitación"
    SERVICIO_RESERVAS --> SERVICIO_PAGOS: "Solicita Pago"
    SERVICIO_RESERVAS --> SERVICIO_NOTIFICACIONES: "Solicita Envío de Notificación"

    SERVICIO_PAGOS --> SERVICIO_RESERVAS: "Confirmación de Pago"
    SERVICIO_NOTIFICACIONES --> SERVICIO_RESERVAS: "Estado de Notificación"

    %% Conexiones a Bases de Datos
    SERVICIO_AUTENTICACION --> BD_USUARIOS
    SERVICIO_INVENTARIO --> BD_INVENTARIO
    SERVICIO_RESERVAS --> BD_RESERVAS

    %% Conexiones a Sistemas Externos
    SERVICIO_PAGOS --> PASARELA_PAGO: "Procesar Transacción"
    PASARELA_PAGO --> SERVICIO_PAGOS: "Resultado Transacción"

    SERVICIO_NOTIFICACIONES --> PROVEEDOR_NOTIF: "Enviar SMS/Email"
    PROVEEDOR_NOTIF --> SERVICIO_NOTIFICACIONES: "Estado de Envío"

    SERVICIO_INVENTARIO -- Opcional --> PMS_EXTERNO: "Sincronización de Inventario"
    PMS_EXTERNO -- Opcional --> SERVICIO_INVENTARIO: "Actualizaciones de PMS"

```