```mermaid

graph TD
    subgraph "Usuarios y Clientes"
        U[Usuario/Huésped]
        A_Movil(App Móvil)
        A_Web(App Web)
    end

    subgraph "Sistema de Reservación de Habitaciones"
        direction LR

        FE[Frontend (Interfaz de Usuario)]
        APIGW[API Gateway]

        subgraph "Microservicios de Backend"
            S_AUTH[Servicio de Autenticación]
            S_BUSQ[Servicio de Búsqueda y Disponibilidad]
            S_INVEN[Servicio de Inventario de Habitaciones]
            S_RESER[Servicio de Gestión de Reservas]
            S_PAGO[Servicio de Procesamiento de Pagos]
            S_NOTIF[Servicio de Notificaciones]
            S_PRECIOS[Servicio de Precios y Ofertas]
        end

        subgraph "Almacenamiento de Datos"
            DB_USERS(DB Usuarios)
            DB_INVENT(DB Inventario)
            DB_RESER(DB Reservas)
        end
    end

    subgraph "Sistemas Externos"
        PAG_EXT[Pasarela de Pago Externa]
        NOTIF_EXT[Proveedor de SMS/Email]
        PMS_EXT[Sistema de Gestión Hotelera (PMS)]
    end

    %% Flujos de interacción principal
    U --> FE
    FE --> APIGW

    APIGW --> S_AUTH
    APIGW --> S_BUSQ
    APIGW --> S_RESER
    APIGW --> S_PAGO
    APIGW --> S_NOTIF

    S_BUSQ --> S_INVEN
    S_BUSQ --> S_PRECIOS

    S_RESER --> S_INVEN
    S_RESER --> S_PAGO
    S_RESER --> S_NOTIF

    S_PAGO --> PAG_EXT
    PAG_EXT --> S_PAGO

    S_NOTIF --> NOTIF_EXT
    NOTIF_EXT --> S_NOTIF

    S_INVEN -- Sincroniza --> PMS_EXT
    PMS_EXT -- Sinc

    ```

