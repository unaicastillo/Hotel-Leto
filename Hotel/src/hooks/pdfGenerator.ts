const handleDescargarFactura = (reserva: any) => {
  const ventanaPrint = window.open("", "_blank");
  if (!ventanaPrint) return;

  // Lógica para formatear la lista de extras desde la tabla puente
  const serviciosList = reserva.reservas_servicios && reserva.reservas_servicios.length > 0
    ? reserva.reservas_servicios.map((rs: any) => rs.servicios?.nombre).filter(Boolean).join(", ")
    : "Ninguno";

  ventanaPrint.document.write(`
    <html>
      <head>
        <title>Factura Hotel Leto - #${reserva.id}</title>
        <style>
          body { font-family: 'Arial', sans-serif; padding: 40px; color: #2A2624; line-height: 1.6; }
          .header { border-bottom: 2px solid #a33818; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
          .hotel-title { color: #a33818; font-family: serif; margin: 0; font-size: 28px; letter-spacing: 2px; }
          .invoice-details { margin-bottom: 30px; background: #faf9f8; padding: 20px; border-radius: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e7e5e4; }
          th { background-color: #2A2624; color: white; }
          .total { font-size: 22px; font-weight: bold; color: #a33818; text-align: right; margin-top: 30px; padding-top: 10px; border-top: 2px dashed #e7e5e4; }
        </style>
      </head>
      <body>
        <div class="header">
          <div><h1 class="hotel-title">HOTEL LETO</h1><p>Luxury Heritage Retreat</p></div>
          <div style="text-align: right;"><h3>FACTURA DE ESTANCIA</h3><p>Localizador: <strong>#LETO-${reserva.id}</strong></p></div>
        </div>
        <div class="invoice-details">
          <p><strong>Fecha de Emisión:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Régimen de Estancia:</strong> ${reserva.fecha_entrada} al ${reserva.fecha_salida}</p>
          <p><strong>Estado del Pago:</strong> ${reserva.estado.toUpperCase()}</p>
        </div>
        <table>
          <thead>
            <tr><th>Concepto</th><th>Detalles</th><th>Importe Total</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Habitación ${reserva.habitaciones?.tipo.toUpperCase()}</td>
              <td>Reserva gestionada vía Web</td>
              <td>€${reserva.precio_total}</td>
            </tr>
            <tr>
              <td>Servicios Adicionales</td>
              <td>${serviciosList}</td>
              <td>Incluido en el total</td>
            </tr>
          </tbody>
        </table>
        <div class="total">Total Facturado: €${reserva.precio_total}</div>
        <script>window.print(); setTimeout(() => { window.close(); }, 100);</script>
      </body>
    </html>
  `);
  ventanaPrint.document.close();
};

export default handleDescargarFactura;